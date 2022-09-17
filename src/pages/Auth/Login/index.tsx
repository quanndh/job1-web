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
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes";
import { login } from "../../../service/Auth/auth.service";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (res) => {
      localStorage.setItem("token", res?.data.token ?? "");
      localStorage.setItem("user", JSON.stringify(res?.data.data));
      navigate(AppRoutes.root);
    },
  });

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
              <Input
                value={email}
                type="email"
                borderColor="gray.500"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                type="password"
                borderColor="gray.500"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                isLoading={isLoading}
                colorScheme={"teal"}
                variant={"solid"}
                onClick={() => {
                  mutate({ email, password });
                }}
              >
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
