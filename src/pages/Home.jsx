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
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import { getSummaryData } from "../utils";

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
    const { summaryData, summary } = await getSummaryData();
    setSummaryData(summaryData);
    setSummary(summary);
  }, []);
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
