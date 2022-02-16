import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  FormHelperText,
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "username" && password === "password") {
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
      <Text fontSize="3xl" pb={4}>
        Log in
      </Text>
      <FormControl>
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
          isRequired
        />
        <FormLabel htmlFor="password" pt={4}>
          Password
        </FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          isRequired
        />
        <Button onClick={handleSubmit} mt={6}>
          Log in
        </Button>
      </FormControl>
    </Container>
  );
};

export default AuthPage;
