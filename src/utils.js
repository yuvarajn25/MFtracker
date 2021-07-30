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

export const fetchLastNav = async (schemeCode) => {
  const { data: navValues, error } = await supabase
    .from("navHistory")
    .select(`*`)
    .eq("schemeCode", schemeCode)
    .order("id", { ascending: false })
    .limit(2);
  if (navValues.length) {
    const now = moment();
    if ([1, 7].includes(now.isoWeekday()))
      return returnFormattedValue(navValues);

    if (now.diff(moment.unix(navValues[0].date), "days") <= 1)
      return returnFormattedValue(navValues);
  }
  const response = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);
  const data = navValues.length
    ? response?.data?.data.splice(0, 5)
    : response?.data?.data;
  await supabase.from("navHistory").upsert(
    data.map((d) => {
      const date = moment(d.date, DATE_FORMAT).unix();
      return {
        ...d,
        date,
        schemeCode,
        id: `${schemeCode}_${date}`,
      };
    })
  );
  return data.splice(0, 2);
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
