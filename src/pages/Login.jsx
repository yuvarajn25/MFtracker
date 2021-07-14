import React from "react";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";

import { Link as RouteLink, useHistory } from "react-router-dom";
import supabase from "../supabase";
import { Link } from "@chakra-ui/layout";

function Login({ isLogin }) {
  const toast = useToast();
  let history = useHistory();

  if (supabase.auth.session()) history.push("/home");

  const submit = async (event) => {
    event.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = event.target;

    const params = {
      email,
      password,
    };

    if (isLogin) {
      const { error } = await supabase.auth.signIn(params);
      if (error) {
        toast({
          title: error.message,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
      history.push("/home");
    } else {
      const { error } = await supabase.auth.signUp(params);
      if (error) {
        toast({
          title: error.message,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" backgroundColor="gray.100" p={12} rounded={6}>
        <Text mb={6} textAlign="center" fontWeight="bold">
          {isLogin ? "Login" : "Signup"}
        </Text>
        <form onSubmit={submit}>
          <FormControl id="email" isRequired>
            <FormLabel fontSize="85%">Email</FormLabel>
            <Input
              borderColor="blackAlpha.300"
              mb={6}
              variant="filled"
              placeholder="Email"
              type="email"
              name="email"
            />
          </FormControl>
          <FormControl id="Password" isRequired>
            <FormLabel fontSize="85%">Password</FormLabel>
            <Input
              borderColor="blackAlpha.300"
              type="password"
              mb={6}
              variant="filled"
              placeholder="*********"
              name="password"
            />
          </FormControl>
          <Input
            type="submit"
            bgColor="#1293d2"
            color="#fff"
            value={isLogin ? "Login" : "Signup"}
          />{" "}
        </form>
        <Text mt={3}>
          <Link as={RouteLink} to={isLogin ? "/signup" : "/login"}>
            {isLogin
              ? "do not have account? Signup here"
              : "Already have account? Login here"}
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}

export default Login;
