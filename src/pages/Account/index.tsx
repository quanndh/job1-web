import { Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import MainBox from "../../components/MainBox";
import TableAccount from "../../components/Table/TableAccount";

interface AccountProps {}

export const Account: React.FC<AccountProps> = (props) => {
  const {} = props;

  return (
    <>
      <MainBox
        bg={useColorModeValue("white", "gray.700")}
        marginLeft={{ base: "0px", lg: "200px" }}
        marginRight={{ base: "0px", lg: "200px" }}
        marginTop={{ base: "0px", lg: "50px" }}
      >
        <Flex flexDirection={{ base: "column", lg: "row" }}>
          <Flex flexDirection="column" w={{ base: "100%", lg: "50%" }}>
            <Flex>
              <Text fontWeight="bold" marginRight={2} fontSize="md">
                Username:{" "}
              </Text>
              <Text fontSize="md">nick</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" marginRight={2} fontSize="md">
                Email:{" "}
              </Text>
              <Text fontSize="md">nick@gmail.com</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" marginRight={2} fontSize="md">
                Expired Date:{" "}
              </Text>
              <Text fontSize="md">September 16, 2022 11:58am</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column" w={{ base: "100%", lg: "50%" }} gap={3}>
            <Text fontSize="lg" color="#e0a600" fontWeight="semibold">
              Your account is expired at September 16, 2022 2:17pm
            </Text>
            <Text fontSize="md" fontWeight="semibold">
              Please pay to use this service, the price to use is only 139 BUSD
              a month, you need connect wallet to approve BUSD and them click
              Buy Now to make the payment, the account will be automatically
              activated, after payment you do not forget to revoke BUSD before
              leaving this page, thanks.
            </Text>
            <Text fontSize="md" fontWeight="semibold">
              B???n vui l??ng th??nh to??n ????? s??? d???ng d???ch v??? n??y, ch??? 139 BUSD 1
              th??ng, b???n c???n k???t n???i v?? ????? approve BUSD v?? sau ???? b???m v??o Buy
              Now ????? th???c hi???n vi???c thanh to??n, t??i kho???n s??? t??? ?????ng ???????c k??ch
              ho???t, sau khi thanh to??n xong vui l??ng revoke BUSD tr?????c khi r???i
              kh???i trang n??y, c???m ??n.
            </Text>
            <Stack spacing={4} direction="row" align="center">
              <Button colorScheme="teal" size="sm">
                APPROVE
              </Button>
              <Button
                colorScheme="teal"
                size="sm"
                variant="outline"
                disabled={true}
              >
                BUY NOW
              </Button>
              <Button
                colorScheme="teal"
                size="sm"
                variant="outline"
                disabled={true}
              >
                REVOKE
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </MainBox>
      <MainBox mt={4}>
        <TableAccount data={[1]} />
      </MainBox>
    </>
  );
};

export default Account;
