import React, { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthPage = (props) => {
  const location = useLocation();
  const { setAuth } = props;
  const pathname =
    location.state && location.state.previousPath
      ? location.state.previousPath
      : "/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError(true);
    } else if (username === "username" && password === "password") {
      setAuth(true);
      navigate(pathname);
    } else {
      setIncorrect(true);
    }
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <Container>
      <Text fontSize="3xl" pb={4} fontWeight="bold">
        Log in
      </Text>
      <FormControl isRequired isInvalid={error}>
        {incorrect ? (
          <Alert status="error" borderRadius={6} mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Incorrect username or password.</AlertTitle>
          </Alert>
        ) : null}
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          type="username"
          value={username}
          onChange={handleUsernameChange}
          isInvalid={error && username === ""}
        />
        {username === "" ? (
          <FormErrorMessage>Username is required.</FormErrorMessage>
        ) : null}
        <FormLabel htmlFor="password" pt={4}>
          Password
        </FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          isInvalid={error && password === ""}
        />
        {password === "" ? (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        ) : null}
        <Button onClick={handleSubmit} mt={6} colorScheme="blue">
          Log in
        </Button>
      </FormControl>
    </Container>
  );
};

export default AuthPage;
