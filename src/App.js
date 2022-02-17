import React, { useState } from "react";
import "./App.css";
import { Flex, VStack, Button, Box, HStack, Link } from "@chakra-ui/react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import EventsListing from "./pages/EventsListingPage";
import EventPage from "./pages/EventPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const [auth, setAuth] = useState(false);
  const location = useLocation();

  const logOut = () => {
    setAuth(false);
  };

  return (
    <Box w="full">
      <VStack w="full">
        <Box
          w="full"
          px={4}
          py={2}
          bg="gray.100"
          borderBottom="1px"
          borderColor="gray.300"
        >
          {location.pathname === "/login" ? (
            <Flex justifyContent="flex-start" w="full">
              <Link as={RouterLink} to="/">
                Home
              </Link>
            </Flex>
          ) : (
            <HStack justifyContent="space-between" w="full">
              <Link as={RouterLink} to="/">
                Home
              </Link>
              {auth ? (
                <Button onClick={logOut} colorScheme="blue">
                  Log out
                </Button>
              ) : (
                <Button
                  as={RouterLink}
                  to={"/login"}
                  state={{ previousPath: location.pathname }}
                  colorScheme="blue"
                >
                  Log in
                </Button>
              )}
            </HStack>
          )}
        </Box>

        <Box px={16} py={8}>
          <Routes>
            <Route
              path="/"
              element={
                <EventsListing key={auth} loggedIn={auth} setAuth={setAuth} />
              }
            />
            <Route
              path="/event/:id"
              element={<EventPage key={auth} loggedIn={auth} />}
            />
            <Route path="login" element={<AuthPage setAuth={setAuth} />} />
          </Routes>
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
