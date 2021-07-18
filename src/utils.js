import axios from "axios";
import moment from "moment";
import supabase from "./supabase";

export const fetchLastNav = async (schemeCode) => {
  const { data: navValues, error } = await supabase
    .from("navHistory")
    .select(`*`)
    .eq("schemeCode", schemeCode)
    .order("id", { ascending: false })
    .limit(2);

  if (navValues.length) {
    const now = moment();
    if (now.isoWeekday() > 5) return navValues;
    if (now.diff(moment.unix(navValues[0].date), "days") <= 1) return navValues;
  }
  const response = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);

  await supabase.from("navHistory").upsert(
    response?.data?.data.splice(0, 5).map((d) => {
      const date = moment(d.date, "DD-MM-YYYY").unix();
      return {
        ...d,
        date,
        schemeCode,
        id: `${schemeCode}_${date}`,
      };
    })
  );
  return response?.data?.data.splice(0, 2);
};
