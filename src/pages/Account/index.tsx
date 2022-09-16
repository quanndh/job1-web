import { Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import MainBox from "../../components/MainBox";

interface AccountProps {}

export const Account: React.FC<AccountProps> = (props) => {
  const {} = props;

  const renderContent = () => {
    return (
      <Flex flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection="column" w={{ base: "100%", lg: "50%" }}>
          <Flex>
            <Text fontWeight="bold" marginRight={2} fontSize="14px">
              Username:{" "}
            </Text>
            <Text fontSize="14px">nick</Text>
          </Flex>
          <Flex>
            <Text fontWeight="bold" marginRight={2} fontSize="14px">
              Email:{" "}
            </Text>
            <Text fontSize="14px">nick@gmail.com</Text>
          </Flex>
          <Flex>
            <Text fontWeight="bold" marginRight={2} fontSize="14px">
              Expired Date:{" "}
            </Text>
            <Text fontSize="14px">September 16, 2022 11:58am</Text>
          </Flex>
        </Flex>
        <Flex flexDirection="column" w={{ base: "100%", lg: "50%" }} gap={3}>
          <Text fontSize="12px" color="#e0a600">
            Your account is expired at September 16, 2022 2:17pm
          </Text>
          <Text fontSize="12px" color="#004d9f">
            Please pay to use this service, the price to use is only 139 BUSD a
            month, you need connect wallet to approve BUSD and them click Buy
            Now to make the payment, the account will be automatically
            activated, after payment you do not forget to revoke BUSD before
            leaving this page, thanks.
          </Text>
          <Text fontSize="12px" color="#004d9f">
            Bạn vui lòng thành toán để sử dụng dịch vụ này, chỉ 139 BUSD 1
            tháng, bạn cần kết nối ví để approve BUSD và sau đó bấm vào Buy Now
            để thực hiện việc thanh toán, tài khoản sẽ tự động được kích hoạt,
            sau khi thanh toán xong vui lòng revoke BUSD trước khi rời khỏi
            trang này, cảm ơn.
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
    );
  };
  return (
    <MainBox
      content={renderContent()}
      bg={useColorModeValue("white", "gray.700")}
      marginLeft={{ base: "0px", md: "200px" }}
      marginRight={{ base: "0px", md: "200px" }}
      marginTop={{ base: "0px", md: "50px" }}
    />
  );
};

export default Account;
