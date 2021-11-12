import { Flex } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Grid,
  GridItem,
  SimpleGrid,
  Stat,
  StatArrow,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

import supabase from "../supabase";
import { fetchLastNavValues } from "../utils";

const columns = [
  {
    Header: "Code",
    accessor: "scheme_code",
  },
  {
    Header: "Name",
    accessor: "scheme_name",
  },
  {
    Header: "Source",
    accessor: "bank_name",
  },
  {
    Header: "Units",
    accessor: "total_units",
    isNumeric: true,
    Cell: ({ value }) => parseFloat(value).toFixed(2),
  },
  {
    Header: "Invested",
    accessor: "total_amount",
    isNumeric: true,
    sortable: true,
    sortMethod: (a, b, desc) => {
      console.log(a, b);
      return;
    },
  },
  {
    Header: "Nav Date",
    accessor: "lastDate",
    isNumeric: true,
  },
  {
    Header: "Last Nav Value",
    accessor: "nav",
    isNumeric: true,
    Cell: ({ value }) => parseFloat(value).toFixed(2),
  },
  {
    Header: "Current Value",
    accessor: "todayValue",
    isNumeric: true,
    Cell: ({ value }) => parseFloat(value).toFixed(2),
  },
  {
    Header: "Revenue",
    accessor: "difference",
    isNumeric: true,
    Cell: ({ value }) => parseFloat(value).toFixed(2),
  },
  {
    Header: "Revenue %",
    accessor: "revenue%",
    sortable: true,
    sortType: ({ values: row1 }, { values: row2 }, columnId, desc) => {
      const p1 = (row1.difference / row1.total_amount) * 100;
      const p2 = (row2.difference / row2.total_amount) * 100;
      return p1 > p2 ? 1 : -1;
    },
    Cell: ({
      row: {
        values: { difference, total_amount },
      },
    }) => {
      const percentage = (difference / total_amount) * 100;
      return (
        <>
          <StatArrow type={difference > 0 ? "increase" : "decrease"} />
          {percentage.toFixed(2)}
        </>
      );
    },
  },
  {
    Header: "Day Change",
    accessor: "preValue",
    sortType: ({ values: row1 }, { values: row2 }, columnId, desc) => {
      const r1 = row1.todayValue - row1.preValue;
      const r2 = row2.todayValue - row2.preValue;
      return r1 > r2 ? 1 : -1;
    },
    Cell: ({
      row: {
        values: { todayValue, preValue },
      },
    }) => {
      const dayDiff = todayValue - preValue;
      return (
        <>
          <StatArrow type={dayDiff > 0 ? "increase" : "decrease"} />
          {dayDiff.toFixed(2)}
        </>
      );
    },
  },
];

const SUMMARY_KEYS_HEADER = {
  totalInvested: "Total Invested",
  currentValue: "Current Value",
  totalRealized: "Realized",
  totalUnRealized: "Un Realized",
  profitPercentage: "Difference %",
  totalDayChange: "Day Change",
  dayChangePercentage: "Day Change %",
};

function Home() {
  const [summaryData, setSummaryData] = useState([]);

  const [summary, setSummary] = useState({
    totalInvested: 0,
    currentValue: 0,
    totalDayChange: 0,
    totalRealized: 0,
    totalUnRealized: 0,
    profitPercentage: 0,
    dayChangePercentage: 0,
  });

  useEffect(async () => {
    if (summaryData.length === 0) {
      const user = supabase.auth.user();
      const { data } = await supabase.rpc("mf_summary").eq("user_id", user.id);
      const navValues = await fetchLastNavValues(
        data.map((d) => d.scheme_code)
      );
      const response = await Promise.all(
        data.map(async (d) => {
          const [res, preValue] = navValues[d.scheme_code];
          const todayValue = res.nav * d.total_units;
          const difference = todayValue - d.total_amount;
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
      const currentValue = response.reduce(
        (sum, item) => sum + item.todayValue,
        0
      );
      const totalPreValue = response.reduce(
        (sum, item) => sum + item.preValue,
        0
      );
      const totalRealized = response.reduce(
        (sum, item) => sum + item.realised_amount,
        0
      );
      const totalUnRealized = currentValue - totalInvested - totalRealized;
      setSummaryData(response);
      setSummary({
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
      });
    }
  }, [summaryData]);
  return (
    <Flex direction="column" width="100%" height="100vh">
      <SimpleGrid minChildWidth="120px" spacing="40px" padding="40px">
        {Object.keys(SUMMARY_KEYS_HEADER).map((key) => (
          <Box>
            <Stat>
              <StatLabel>{SUMMARY_KEYS_HEADER[key]}</StatLabel>
              <StatNumber>
                {/* <StatArrow type={summary[key] > 0 ? "increase" : "decrease"} /> */}
                {summary[key]}
              </StatNumber>
            </Stat>
          </Box>
        ))}
      </SimpleGrid>
      <DataTable columns={columns} data={summaryData} />
    </Flex>
  );
}

export default Home;
