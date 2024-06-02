import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Container,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const {
    login,
    authDetails: { isAuthenticated },
  } = useContext(AuthContext);

  async function handleClick() {
    try {
      let response = await axios({
        method: "post",
        url: "https://reqres.in/api/login",
        data: {
          email,
          password,
        },
      });
      login(response?.data?.token);

      toast({
        title: "Login successful.",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login failed.",
        description: "Invalid email or password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxW={"600px"}>
      <Flex
        minH={"70vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"}>Log in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter Email "
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  my={4}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleClick}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
}
