import { Flex } from "@chakra-ui/layout";
import {
  Button,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CSVUpload from "../components/CSVUpload";
import supabase from "../supabase";
import { fetchLastNav } from "../utils";

function Home() {
  const [summary, setSummary] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [totalInvested, setTotalInvested] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [totalPreValue, setTotalPreValue] = useState(0);
  const [totalDayChange, setTotalDayChange] = useState(0);

  useEffect(async () => {
    if (summary.length === 0) {
      const user = supabase.auth.user();
      const { data } = await supabase.rpc("mf_summary").eq("user_id", user.id);
      const response = await Promise.all(
        data.map(async (d) => {
          const [res, preValue] = await fetchLastNav(d.scheme_code);
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
      const tmpTI = response.reduce((sum, item) => sum + item.total_amount, 0);
      const tmpCV = response.reduce((sum, item) => sum + item.todayValue, 0);
      const tmpPV = response.reduce((sum, item) => sum + item.preValue, 0);
      setSummary(response);
      setTotalInvested(tmpTI);
      setCurrentValue(tmpCV);
      setTotalDayChange(tmpCV - tmpPV);
      setTotalPreValue(tmpPV);
    }
  }, [summary]);
  return (
    <Flex direction="column" width="100%" height="100vh">
      <Button onClick={() => setModelOpen(true)}>Upload Transactions</Button>
      <CSVUpload isOpen={modelOpen} onClose={() => setModelOpen(false)} />

      <Flex minHeight={150} alignItems="center" justifyContent="space-evenly">
        <Flex>
          <Stat>
            <StatLabel> Total Invested</StatLabel>
            <StatNumber>{totalInvested.toFixed(2)}</StatNumber>
          </Stat>
        </Flex>
        <Flex>
          <Stat>
            <StatLabel> Current Value</StatLabel>
            <StatNumber>
              <StatArrow
                type={
                  currentValue - totalInvested > 0 ? "increase" : "decrease"
                }
              />
              {currentValue.toFixed(2)}
            </StatNumber>
          </Stat>
        </Flex>
        <Flex>
          <Stat>
            <StatLabel>Difference %</StatLabel>
            <StatNumber>
              <StatArrow
                fontSize={23}
                type={
                  currentValue - totalInvested > 0 ? "increase" : "decrease"
                }
              />
              {(((currentValue - totalInvested) / totalInvested) * 100).toFixed(
                2
              )}
              %
            </StatNumber>
          </Stat>
        </Flex>
        <Flex>
          <Stat>
            <StatLabel>Day Change</StatLabel>
            <StatNumber>
              <StatArrow type={totalDayChange > 0 ? "increase" : "decrease"} />
              {totalDayChange.toFixed(2)}
            </StatNumber>
          </Stat>
        </Flex>
        <Flex>
          <Stat>
            <StatLabel>Day Change %</StatLabel>
            <StatNumber>
              <StatArrow type={totalDayChange > 0 ? "increase" : "decrease"} />
              {(((currentValue - totalPreValue) / totalPreValue) * 100).toFixed(
                2
              )}{" "}
              %
            </StatNumber>
          </Stat>
        </Flex>
      </Flex>
      <Table variant="striped" colorScheme="twitter">
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th isNumeric>Units</Th>
            <Th isNumeric>Total Amount</Th>
            <Th>Last Nav Date</Th>
            <Th>Last Nav Value</Th>
            <Th>Last Total Value</Th>
            <Th>Revenue Value</Th>
            <Th>Revenue Percentage</Th>
            <Th>Day Change</Th>
          </Tr>
        </Thead>
        <Tbody>
          {summary.map((s) => {
            return (
              <Tr>
                <Td>{s.scheme_code}</Td>
                <Td>{s.scheme_name}</Td>
                <Td isNumeric>{s.total_units}</Td>
                <Td isNumeric>{s.total_amount}</Td>
                <Td>{s.lastDate}</Td>
                <Td>{parseFloat(s.nav).toFixed(2)}</Td>
                <Td isNumeric>{s.todayValue.toFixed(2)}</Td>
                <Td isNumeric>{s.difference.toFixed(2)}</Td>
                <Td>
                  <StatArrow
                    type={s.difference > 0 ? "increase" : "decrease"}
                  />
                  {((s.difference / s.total_amount) * 100).toFixed(2)}
                </Td>
                <Td>{(s.todayValue - s.preValue).toFixed(2)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}

export default Home;
