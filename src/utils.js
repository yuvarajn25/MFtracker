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
  const res = {};
  await Promise.all(
    schemeCodes.map(async (code) => {
      const values = await fetchDataFromDB(code);
      if (values.length > 0) {
        res[code] = returnFormattedValue(values);
      }
    })
  );

  const currentDate = moment().subtract(1, "days");
  if ([6, 7].includes(currentDate.isoWeekday())) return res;
  if (currentDate.format(DATE_FORMAT) === res[schemeCodes[0]][0].date)
    return res;

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
  navData.forEach((item) => res[item.schemeCode].unshift(item));
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
  console.log(`res`, res);
  return res;
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
