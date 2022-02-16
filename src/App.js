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
    <Box px={16} py={8} w="full">
      <VStack w="full">
        {location.pathname === "/login" ? (
          <Flex justifyContent="flex-start" w="full">
            <Link as={RouterLink} to="/" fontSize="xl">
              Home
            </Link>
          </Flex>
        ) : (
          <HStack justifyContent="space-between" w="full">
            <Link as={RouterLink} to="/" fontSize="xl">
              Home
            </Link>
            {auth ? (
              <Button onClick={logOut}>Log out</Button>
            ) : (
              <Button
                as={RouterLink}
                to={"/login"}
                state={{ previousPath: location.pathname }}
              >
                Log in
              </Button>
            )}
          </HStack>
        )}

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
      </VStack>
    </Box>
  );
}

export default App;
