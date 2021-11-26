import axios from "axios";
import moment from "moment";
import supabase from "./supabase";

const DATE_FORMAT = "DD-MM-YYYY";

function returnFormattedValue(navValues) {
  return navValues.map((n) => ({
    ...n,
    date: moment.unix(n.date).format(DATE_FORMAT),
  }));
}

const fetchDataFromDB = async (schemeCode) => {
  const { data: navValues, error } = await supabase
    .from("navHistory")
    .select(`*`)
    .eq("schemeCode", schemeCode)
    .order("date", { ascending: false })
    .limit(2);
  return navValues;
};

export const fetchLastNavValues = async (schemeCodes) => {
  let isAPIData = true;
  const navValues = {};
  await Promise.all(
    schemeCodes.map(async (code) => {
      const values = await fetchDataFromDB(code);
      if (values.length > 0) {
        navValues[code] = returnFormattedValue(values);
      }
    })
  );

  const currentDate = moment().subtract(1, "days");
  if ([6, 7].includes(currentDate.isoWeekday()))
    return { navValues, isAPIData };
  if (currentDate.format(DATE_FORMAT) === navValues[schemeCodes[0]][0].date)
    return { navValues, isAPIData };

  isAPIData = true;
  const options = {
    method: "GET",
    url: "https://latest-mutual-fund-nav.p.rapidapi.com/fetchHistoricalNAV",
    params: {
      Date: currentDate.format("DD-MMM-YYYY"),
      SchemeCode: schemeCodes.join(","),
    },
    headers: {
      "x-rapidapi-host": "latest-mutual-fund-nav.p.rapidapi.com",
      "x-rapidapi-key": "7a8ebddfc2msh30345f773107b49p1768f1jsn25911e4f7501",
    },
  };
  const response = await axios.request(options);
  const navData = response.data.map((item) => {
    const date = currentDate.format(DATE_FORMAT);
    return {
      nav: item["Net Asset Value"],
      date,
      schemeCode: item["Scheme Code"],
      id: `${item["Scheme Code"]}_${date}`,
    };
  });
  navData.forEach((item) => {
    if (!navValues[item.schemeCode]) {
      navValues[item.schemeCode] = [item];
    } else {
      navValues[item.schemeCode].unshift(item);
    }
  });
  if (navData.length)
    await supabase.from("navHistory").upsert(
      navData.map((i) => {
        const date = moment(i.date, DATE_FORMAT).unix();
        return {
          ...i,
          id: `${i.schemeCode}_${date}`,
          date: moment(i.date, DATE_FORMAT).unix(),
        };
      })
    );
  return { navValues, isAPIData };
};

export const saveTransaction = async (data = []) => {
  const user = supabase.auth.user();
  const payload = data.map((d) => ({
    ...d,
    userId: user.id,
    date: moment(d.date, DATE_FORMAT).unix(),
  }));
  const { data: response, error } = await supabase
    .from("transactions")
    .insert(payload);
  return response;
};

const saveDayReport = async (user, summaryData = {}) => {
  const resData = await Promise.all(
    summaryData.map(async (item) => {
      const date = moment(item.lastDate, DATE_FORMAT).unix();
      const { data: preDatas } = await supabase
        .from("dayReport")
        .select(`*`)
        .eq("scheme_code", item.scheme_code)
        .eq("user_id", user.id)
        .lt("date", date)
        .limit(1)
        .order("date", { ascending: false });
      const preData = preDatas[0] || {};
      return {
        id: `${item.scheme_code}_${date}`,
        date: date,
        bank_name: item.bank_name,
        scheme_code: item.scheme_code,
        scheme_name: item.scheme_name,
        total_amount: item.total_amount,
        total_units: item.total_units,
        nav: item.nav,
        current_value: item.todayValue,
        unrealised_amount: item.difference,
        difference_percentage: (
          (item.difference / item.total_amount) *
          100
        ).toFixed(2),
        day_change: item.difference - preData.unrealised_amount,
        day_change_percentage: (
          ((item.difference - preData.unrealised_amount) /
            preData.unrealised_amount) *
          100
        ).toFixed(2),
        realised_amount: item.realised_amount,
        user_id: user.id,
      };
    })
  );

  const { data: response, error } = await supabase
    .from("dayReport")
    .upsert(resData);
};

export const getSummaryData = async () => {
  const user = supabase.auth.user();
  const { data } = await supabase.rpc("mf_summary").eq("user_id", user.id);
  const { navValues, isAPIData } = await fetchLastNavValues(
    data.map((d) => d.scheme_code)
  );
  console.log({ isAPIData });
  const response = await Promise.all(
    data.map(async (d) => {
      let [res, preValue] = navValues[d.scheme_code];
      const todayValue = res.nav * d.total_units;
      const difference = todayValue - d.total_amount;
      if (!preValue) preValue = res;
      return {
        ...d,
        nav: res.nav,
        lastDate: res.date,
        preNav: preValue.nav,
        preValue: preValue.nav * d.total_units,
        todayValue,
        difference,
      };
    })
  );
  const totalInvested = response.reduce(
    (sum, item) => sum + item.total_amount,
    0
  );
  const currentValue = response.reduce((sum, item) => sum + item.todayValue, 0);
  const totalPreValue = response.reduce((sum, item) => sum + item.preValue, 0);
  const totalRealized = response.reduce(
    (sum, item) => sum + item.realised_amount,
    0
  );
  const totalUnRealized = currentValue - totalInvested - totalRealized;

  if (isAPIData) await saveDayReport(user, response);

  return {
    summaryData: response,
    summary: {
      totalInvested: totalInvested.toFixed(2),
      currentValue: currentValue.toFixed(2),
      totalDayChange: (currentValue - totalPreValue).toFixed(2),
      totalRealized: totalRealized.toFixed(2),
      totalUnRealized: totalUnRealized.toFixed(2),
      isProfit: currentValue - totalInvested - totalRealized > 0,
      profitPercentage: `${((totalUnRealized / totalInvested) * 100).toFixed(
        2
      )}%`,
      dayChangePercentage: `${(
        ((currentValue - totalPreValue) / totalPreValue) *
        100
      ).toFixed(2)}%`,
    },
  };
};
