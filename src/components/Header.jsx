import { Flex, HStack, Icon, Link, StackDivider } from "@chakra-ui/react";
import React, { useState } from "react";

import CSVUpload from "./CSVUpload";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";
import supabase from "../supabase";
import { Link as ReachLink } from "react-router-dom";

export default function Header() {
  const [modelOpen, setModelOpen] = useState(false);
  const signOut = () => {
    supabase.auth.signOut();
  };

  const ActionIcons = [
    {
      icon: FiUploadCloud,
      action: () => setModelOpen(true),
      toolTip: "Upload Transactions",
    },
    {
      icon: AiOutlinePoweroff,
      action: signOut,
      toolTip: "Logout",
    },
  ];

  return (
    <div>
      <CSVUpload isOpen={modelOpen} onClose={() => setModelOpen(false)} />
      <Flex
        bgColor="telegram.400"
        height="50px"
        alignItems="center"
        color="#FFF"
        fontSize="1em"
        fontWeight="bold"
        padding="5px"
        justifyItems="flex-start"
        justifyContent="space-between"
      >
        <Flex>
          <div>
            <Link as={ReachLink} to="/home">
              Home
            </Link>
          </div>
          <div style={{ marginLeft: "25px" }}>
            <Link as={ReachLink} to="/dashboard">
              Dashboard
            </Link>
          </div>
        </Flex>
        <HStack fontSize="1.75em" divider={<StackDivider />} spacing="24px">
          {ActionIcons.map((i, k) => (
            <Icon as={i.icon} onClick={i.action} />
          ))}
        </HStack>
      </Flex>
    </div>
  );
}
