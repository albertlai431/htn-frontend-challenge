import React, { useState } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import Event from "../components/Event";

const EVENTS = gql`
  query GetEvents {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers {
        name
        profile_pic
      }
      public_url
      private_url
      related_events
    }
  }
`;

const EventsListing = (props) => {
  const { loggedIn } = props;
  const [events, setEvents] = useState([]);

  useQuery(EVENTS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const { sampleEvents } = data;
      const sortedEvents = sampleEvents.slice();
      sortedEvents.sort(function (a, b) {
        return a.start_time - b.start_time;
      });
      if (loggedIn) {
        setEvents(sortedEvents);
      } else {
        setEvents(
          sortedEvents.filter((event) => event.permission === "public")
        );
      }
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return (
    <VStack>
      <Text fontSize="3xl">Events</Text>
      {events.map((event, index) => (
        <Event key={index} event={event} loggedIn={loggedIn} />
      ))}
    </VStack>
  );
};

export default EventsListing;
