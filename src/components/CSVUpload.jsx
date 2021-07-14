import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import CSVReader from "react-csv-reader";
import supabase from "../supabase";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
};

export default function CSVUpload({ isOpen, onClose }) {
  const [data, setData] = useState([]);
  const [headers, setHeader] = useState([]);
  const handleForce = (data, fileInfo) => {
    setData(data);
    setHeader(Object.keys(data[0]));
  };

  const onSave = async () => {
    const user = supabase.auth.user();
    const payload = data.map((d) => ({
      ...d,
      userId: user.id,
      date: moment(new Date(d.date)).unix(),
    }));
    const { data: response, error } = await supabase
      .from("transactions")
      .insert(payload);
    handleClose();
  };

  const handleClose = () => {
    setData([]);
    setHeader([]);
    onClose();
  };
  const content = () => {
    if (!data.length) {
      return (
        <CSVReader
          cssClass="react-csv-input"
          label="Upload CSV"
          onFileLoaded={(data, info) => handleForce(data, info)}
          parserOptions={papaparseOptions}
        />
      );
    } else {
      return (
        <div style={{ maxHeight: "90vh", overflow: "scroll" }}>
          <Table size="sm">
            <Thead>
              <Tr>
                {headers.map((header, index) => (
                  <Th key={index}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((d, index) => (
                <Tr key={index}>
                  {headers.map((h, index) => (
                    <Td key={index}>{d[h]}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      );
    }
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleClose}
      size="7xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{content()}</ModalBody>

        <ModalFooter>
          <Button onClick={onSave} colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
