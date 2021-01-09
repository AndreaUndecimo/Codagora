import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  FormLabel,
  FormControl,
  Input,
  InputRightElement,
  Button,
  ThemeProvider,
  Flex,
  InputGroup,
} from "@chakra-ui/react";
import customTheme from "../../customTheme";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getToken } from "../../services/ApiClientService";
import { Redirect } from "@reach/router";

function setToken(userToken) {
  localStorage.setItem("token", userToken);
  console.log(localStorage.getItem("token"));
}

export default function Login() {
  const { errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [show, setShow] = useState(false);

  async function loginUser(credentials) {
    await getToken(credentials)
      .then((res) => res.data)
      .then((token) => setToken(token))
      .catch((error) => setError(error.response.data));
  }

  function submitHandle(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      loginUser(userDetails);
      setIsLoading(false);
      setLoggedIn(true);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
      {loggedIn ? (
        <Redirect from="/api/user/login" to="/home" noThrow />
      ) : (
        <Flex width="full" align="center" justifyContent="center" mt={10}>
          <Box p={2}>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={submitHandle}>
              <FormControl isInvalid={errors.message} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  textOverflow="ellipsis"
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isInvalid={errors.message} isRequired my={3}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    textOverflow="ellipsis"
                    type={show ? "text" : "password"}
                    placeholder="*******"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                width="full"
                mt={4}
                type="submit"
                colorScheme="teal"
                variant="outline"
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                _active={{ boxShadow: "lg" }}
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Box>
        </Flex>
      )}
    </ThemeProvider>
  );
}
