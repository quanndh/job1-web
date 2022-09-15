import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes";

export default function LoginScreen() {
  const navigate = useNavigate();
  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Flex flex={1} justify="center" align="center" mt={20}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w="full"
          maxW={"md"}
        >
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" borderColor="gray.500" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" borderColor="gray.500" />
            </FormControl>
            <Stack spacing={6}>
              <Button colorScheme={"teal"} variant={"solid"}>
                Sign in
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              You are not a user?{" "}
              <Link onClick={() => navigate(AppRoutes.signup)} color="teal">
                Sign up
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
}
