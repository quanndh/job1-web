import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  Grid,
  GridItem,
  Select,
  Stack,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegSave, FaWalking } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiSnail } from "react-icons/gi";
import MainBox from "../../components/MainBox";
import InputNumber from "../../components/InputNumber";
import RPCBox from "../../components/RPCBox";

const listSaleStart = [
  {
    id: 1,
    label: "T - 6",
  },
  {
    id: 2,
    label: "T - 5",
  },
  {
    id: 3,
    label: "T - 4",
  },
  {
    id: 4,
    label: "T - 3",
  },
  {
    id: 5,
    label: "T - 2",
  },
  {
    id: 6,
    label: "T - 1",
  },
];

interface SaleProps {}

export const Sale: React.FC<SaleProps> = (props) => {
  const {} = props;
  const [list_private_key, setListPrivateKey] = useState("");
  const [select_day_start_sale, setSelectDayStartSale] = useState(4);

  const handleChangeListPrivateKey = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setListPrivateKey(event.target.value);
  };

  const handleChangeSaleStart = (id: number) => {
    setSelectDayStartSale(id);
  };

  const renderContent = () => {
    return (
      <Flex flexDirection="column">
        <Flex
          mb={4}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          flexWrap="wrap"
        >
          <Select
            placeholder="Select option"
            width={{ base: "100%", md: "30%" }}
            marginBottom={{ base: 4, md: 0 }}
            border="none"
            bg={useColorModeValue("gray.100", "gray.700")}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>

          <Stack spacing={4} direction="row" align="center">
            <Button colorScheme="red" size="sm">
              <BsFillLightningChargeFill className="mr-2" />
              <Text marginRight={4} display={{ base: "none", sm: "block" }}>
                Fast
              </Text>
              <Text>0.0</Text>
            </Button>
            <Button colorScheme="purple" size="sm">
              <FaWalking className="mr-2" />
              <Text marginRight={4} display={{ base: "none", sm: "block" }}>
                Normal
              </Text>
              <Text>0.0</Text>
            </Button>
            <Button colorScheme="green" size="sm">
              <GiSnail className="mr-2" />
              <Text marginRight={4} display={{ base: "none", sm: "block" }}>
                Slow
              </Text>
              <Text>0.0</Text>
            </Button>
          </Stack>
        </Flex>
        <Flex justifyContent={{ base: "flex-start", md: "flex-end" }}>
          <Stack spacing={4} direction="row" align="center">
            <Button colorScheme="teal" variant="outline" size="sm">
              <FaRegSave className="mr-2" />
              SAVE LIST
            </Button>
            <Button colorScheme="teal" variant="outline" size="sm">
              <AiOutlineCloudUpload className="mr-2" />
              UPLOAD FILE
            </Button>
          </Stack>
        </Flex>
        <Flex marginTop={4} flexDirection={{ base: "column", md: "row" }}>
          <Flex
            flexDirection="column"
            gap={2}
            marginRight={4}
            width={{ base: "100%", md: "60%" }}
          >
            <Text>List Private Key</Text>
            <Textarea
              style={{ minHeight: "280px" }}
              value={list_private_key}
              onChange={handleChangeListPrivateKey}
              bg={useColorModeValue("gray.100", "gray.700")}
              border="none"
              placeholder="Here is a sample placeholder"
              size="sm"
            />
          </Flex>

          <Flex flexDirection="column" width={{ base: "100%", md: "40%" }}>
            <Flex flexDirection="column" gap={2} paddingBottom={2}>
              <Text>Presale Contract</Text>
              <Input
                placeholder="Input Presale Contract"
                border="none"
                bg={useColorModeValue("gray.100", "gray.700")}
              />
            </Flex>
            <Flex flexDirection="column" gap={2} paddingBottom={2}>
              <Text>Gas Price</Text>
              <InputNumber value={0} onChange={() => {}} />
            </Flex>
            <Flex flexDirection="column" gap={2} paddingBottom={2}>
              <Text>Gas Limit</Text>
              <InputNumber value={0} onChange={() => {}} />
            </Flex>
            <Flex flexDirection="column" gap={2} paddingBottom={2}>
              <Text>Gas BNB Amount</Text>
              <InputNumber value={0} onChange={() => {}} />
            </Flex>
          </Flex>
        </Flex>
        <Flex marginTop={4} flexDirection="column">
          <Text marginBottom={4}>Buy When Sale Start</Text>
          <Flex
            justifyContent="center"
            marginBottom={4}
            width={{ base: "100%", md: "auto" }}
          >
            <Stack
              spacing={4}
              direction="row"
              justifyContent="center"
              align="center"
              width={{ base: "100%", md: "auto" }}
            >
              {listSaleStart.map((saleStart) => (
                <Button
                  colorScheme="teal"
                  size="sm"
                  variant={
                    select_day_start_sale === saleStart.id
                      ? undefined
                      : "outline"
                  }
                  onClick={() => {
                    handleChangeSaleStart(saleStart.id);
                  }}
                >
                  {saleStart.label}
                </Button>
              ))}
            </Stack>
          </Flex>
          <Flex justifyContent="center">
            <Stack spacing={4} direction="row" align="center">
              <Button colorScheme="teal" size="sm">
                Start
              </Button>
              <Button colorScheme="teal" size="sm">
                Approve
              </Button>
              <Button colorScheme="teal" size="sm">
                Sell
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      <RPCBox rpc={"Thread 1: RPC Node:https://bsc-dataseed.binance.org"} />
      <MainBox content={renderContent()} />
    </>
  );
};

export default Sale;
