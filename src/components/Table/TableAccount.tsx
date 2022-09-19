import {
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface TableAccountProps {
  data: any[];
}

export const TableAccount: React.FC<TableAccountProps> = (props) => {
  const { data } = props;

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption className="space-x-4"></TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>WALLET</Th>
            <Th>TX</Th>
            <Th>PACKAGE</Th>
            <Th>FROM DATE</Th>
            <Th>TO DATE</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item: any, index: number) => (
            <Tr key={index}>
              <Td>
                <Link>
                  <Text color={useColorModeValue("teal", "teal.200")}>Id</Text>
                </Link>
              </Td>
              <Td>WALLET</Td>
              <Td>
                <Link>
                  <Text color={useColorModeValue("teal", "teal.200")}>Tx</Text>
                </Link>
              </Td>
              <Td>PACKAGE</Td>
              <Td>FROM DATE</Td>
              <Td>TO DATE</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableAccount;
