import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import Event from "../components/Event";

const EVENT = gql`
  query GetEvent($id: Float!) {
    sampleEvent(id: $id) {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
    }
  }
`;

const EventPage = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedIn } = props;
  const [event, setEvent] = useState(null);

  useQuery(EVENT, {
    variables: { id: parseInt(id) },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      if (loggedIn || data.sampleEvent.permission === "public") {
        console.log(data.sampleEvent);
        setEvent(data.sampleEvent);
      } else {
        setEvent("Not Found");
      }
    },
    onError: (error) => {
      console.error(error.message);
      navigate("/");
    },
  });

  return (
    <Box>
      {event ? (
        event === "Not Found" ? (
          <Text fontSize="4xl">Event Not Found</Text>
        ) : (
          <Event event={event} loggedIn={loggedIn} />
        )
      ) : null}
    </Box>
  );
};

export default EventPage;
