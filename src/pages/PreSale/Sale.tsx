import React, { createRef, useEffect, useState } from "react";
import {
  Input,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaRegSave, FaWalking } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiSnail } from "react-icons/gi";
import MainBox from "../../components/MainBox";
import InputNumber from "../../components/InputNumber";
import RPCBox from "../../components/RPCBox";
import TableSale from "../../components/Table/TableSale";
import Log from "../../components/Log";
import moment from "moment";
import Blockchain from "../../uilts/Blockchain";
import LogUtils, { Log as ILog } from "../../uilts/Log";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";

const listSaleStart = [
  {
    id: 6,
    label: "T - 6",
  },
  {
    id: 5,
    label: "T - 5",
  },
  {
    id: 4,
    label: "T - 4",
  },
  {
    id: 3,
    label: "T - 3",
  },
  {
    id: 2,
    label: "T - 2",
  },
  {
    id: 1,
    label: "T - 1",
  },
];

export interface Job {
  id: number;
  privateKey: string;
  address: string;
  contract: string;
  value: number;
  gasLimit: number;
  gasPrice: number;
  startAt: number;
  status: string;
}

interface SaleProps {}

let loop: any;

export const Sale: React.FC<SaleProps> = (props) => {
  const params = useParams();

  const type = params.type as "apesale" | "pinksale";

  const toast = useToast();
  const refInputUploadFile = createRef<HTMLInputElement>();

  const [rpc, setRpc] = useState("https://bsc-dataseed.binance.org");

  const [list_private_key, setListPrivateKey] = useState("");
  const [contract, setContract] = useState("");
  const [value, setValue] = useState(0);
  const [gasLimit, setGasLimit] = useState(200000);
  const [gasPrice, setGasPrice] = useState(0);

  const [startBefore, setSelectDayStartSale] = useState(4);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [logs, setLogs] = useState<ILog[]>([]);

  const reset = async () => {
    setJobs([]);
    setContract("");
    setValue(0);
    setGasLimit(200000);
    setGasPrice(0);
    setListPrivateKey("");
    LogUtils.clear(setLogs);
  };

  useEffect(() => {
    reset();
  }, [type]);

  useEffect(() => {
    loop = setInterval(async () => {
      const jobToProcess = jobs.filter(
        (job) => job.startAt === moment().unix() && job.status === "Waiting"
      );

      if (jobToProcess.length) {
        const res = await Blockchain.processJobs(jobToProcess, type);

        const updateJobs = [...jobs];

        res.forEach((x: any) => {
          const index = updateJobs.findIndex((job) => job.id === x.id);
          if (index !== -1) {
            updateJobs[index]["status"] = x.status;
          }
        });

        setJobs(updateJobs);
      }
    }, 1000);

    return () => {
      clearInterval(loop);
    };
  }, [jobs, setJobs]);

  const handleChangeListPrivateKey = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setListPrivateKey(event.target.value);
  };

  const handleChangeSaleStart = (id: number) => {
    setSelectDayStartSale(id);
  };

  const handleAddJob = async () => {
    if (gasPrice === 0) {
      toast({
        title: "Error",
        description: "Gas price must larger than 0",
        status: "error",
      });

      return;
    }

    const privateKeys = list_private_key.split("\n");

    if (!privateKeys.length) return;

    const keyAddressMap = new Map<string, string>();

    const newJobs: Job[] = [...jobs];

    for (const key of privateKeys) {
      const exist = newJobs.find(
        (x) => x.privateKey === key && x.contract === contract
      );
      if (!exist) {
        let address = keyAddressMap.get(key);
        if (!address) {
          try {
            const wallet = new ethers.Wallet(key);
            address = wallet.address;
            keyAddressMap.set(key, address);
          } catch (error: any) {
            LogUtils.add(
              {
                content: error.message,
                type: "Error",
                timestamp: moment().valueOf(),
              },
              setLogs
            );
            continue;
          }
        }

        if (value === 0) {
          LogUtils.add(
            {
              content: `Amount is Zero`,
              type: "Warning",
              timestamp: moment().valueOf(),
            },
            setLogs
          );
        }

        try {
          const startTime = await Blockchain.getPresaleStartTime(
            type,
            contract,
            rpc
          );
          if (!startTime) continue;

          if (startTime < moment().unix()) {
            LogUtils.add(
              {
                content: `Presale has end ${moment(startTime * 1e3).fromNow()}`,
                type: "Error",
                timestamp: moment().valueOf(),
              },
              setLogs
            );
            continue;
          }

          newJobs.push({
            id: newJobs.length,
            privateKey: key,
            address,
            contract,
            value,
            gasLimit,
            gasPrice,
            startAt: startTime,
            status: "Waiting",
          });
        } catch (error: any) {
          LogUtils.add(
            {
              content: error.message,
              type: "Error",
              timestamp: moment().valueOf(),
            },
            setLogs
          );
          continue;
        }
      } else {
        toast({
          title: contract,
          description: `${key} has existed`,
          status: "error",
          isClosable: true,
        });
      }
    }
    setJobs(newJobs);
  };

  const handleDeleteJob = (id: number) => {
    const remain = jobs.filter((x) => x.id !== id);
    setJobs(remain);
  };

  const handleClearLog = () => {
    LogUtils.clear(setLogs);
  };

  return (
    <>
      <RPCBox rpc={`Thread 1: RPC Node:${rpc}`} />
      <MainBox>
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
              <Button
                colorScheme="teal"
                variant="outline"
                size="sm"
                onClick={() => {
                  refInputUploadFile.current?.click();
                }}
              >
                <AiOutlineCloudUpload className="mr-2" />
                <Input type="file" ref={refInputUploadFile} display="none" />
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
                placeholder="Input your secret keys. Each key on a different line. Key must not start with 0x"
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
                  value={contract}
                  onChange={(e) => setContract(e.target.value.trim())}
                />
              </Flex>
              <Flex flexDirection="column" gap={2} paddingBottom={2}>
                <Text>Gas Price</Text>
                <InputNumber
                  value={gasPrice}
                  onChange={(e) => {
                    setGasPrice(e);
                  }}
                />
              </Flex>
              <Flex flexDirection="column" gap={2} paddingBottom={2}>
                <Text>Gas Limit</Text>
                <InputNumber
                  value={gasLimit}
                  onChange={(e) => {
                    setGasLimit(e);
                  }}
                />
              </Flex>
              <Flex flexDirection="column" gap={2} paddingBottom={2}>
                <Text>Gas BNB Amount</Text>
                <InputNumber
                  value={value}
                  onChange={(e) => {
                    setValue(e);
                  }}
                />
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
                    key={saleStart.id}
                    colorScheme="teal"
                    size="sm"
                    variant={
                      startBefore === saleStart.id ? undefined : "outline"
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
                <Button colorScheme="teal" size="sm" onClick={handleAddJob}>
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
      </MainBox>

      <MainBox marginTop={4}>
        <TableSale data={jobs} handleDelete={handleDeleteJob} />
        <Flex justifyContent="space-between" marginTop={8}>
          <Text>Logs</Text>
          <Button
            colorScheme="teal"
            variant="outline"
            size="sm"
            onClick={handleClearLog}
          >
            CLEAR LOGS
          </Button>
        </Flex>
        <Log logs={logs} />
      </MainBox>
    </>
  );
};

export default Sale;
