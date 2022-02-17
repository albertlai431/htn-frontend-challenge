import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Image,
  HStack,
  Link,
  Text,
  VStack,
  Grid,
  Icon,
  Flex,
  Divider,
} from "@chakra-ui/react";
import {
  AiFillYoutube,
  AiOutlineLink,
  AiOutlineClockCircle,
  AiOutlineUser,
} from "react-icons/ai";
import RelatedEvent from "./RelatedEvent";
import { createEventTypeTag } from "../utils/EventUtils";
import {
  formatDateString,
  formatDateStringDate,
  formatDateStringTime,
} from "../utils/DateUtils";

const EVENT = gql`
  query GetEvent($id: Float!) {
    sampleEvent(id: $id) {
      id
      name
      event_type
      permission
    }
  }
`;

const Event = (props) => {
  const client = useApolloClient();
  const { event, loggedIn } = props;
  const [relatedEvents, setRelatedEvents] = useState(null);

  useEffect(() => {
    const fetchRelatedEvents = async () => {
      const relatedEventsTemp = [];
      if (event.related_events) {
        for (let eventId of event.related_events) {
          const relatedEvent = await client.query({
            query: EVENT,
            variables: { id: parseInt(eventId) },
          });
          if (
            loggedIn ||
            relatedEvent.data.sampleEvent.permission === "public"
          ) {
            relatedEventsTemp.push(relatedEvent.data.sampleEvent);
          }
        }
      }

      setRelatedEvents(relatedEventsTemp);
    };

    fetchRelatedEvents();
  }, [client, loggedIn, event]);

  return (
    <Container border="1px" borderColor="gray.300" borderRadius={6} p={4}>
      <VStack alignItems="flex-start">
        {createEventTypeTag(event.event_type)}
        <HStack>
          <Link as={RouterLink} to={`/event/${event.id}`} fontSize="xl" pr={2}>
            {event.name}
          </Link>
          {event.public_url ? (
            <Link href={event.public_url} isExternal>
              <Flex alignItems="center">
                <Icon as={AiFillYoutube} w={6} h={6} />
              </Flex>
            </Link>
          ) : null}
          {event.private_url && loggedIn ? (
            <Link href={event.private_url} isExternal>
              <Flex alignItems="center">
                <Icon as={AiOutlineLink} w={6} h={6} />
              </Flex>
            </Link>
          ) : null}
        </HStack>
        <HStack>
          <Icon as={AiOutlineClockCircle} />
          {formatDateStringDate(event.start_time) ===
          formatDateStringDate(event.end_time) ? (
            <Text>
              {formatDateString(event.start_time)} -{" "}
              {formatDateStringTime(event.end_time)}
            </Text>
          ) : (
            <Text>
              {formatDateString(event.start_time)} -{" "}
              {formatDateString(event.end_time)}
            </Text>
          )}
        </HStack>

        {event.description ? (
          <Text fontSize="sm">{event.description}</Text>
        ) : null}

        {event.speakers && event.speakers.length > 0 ? (
          <Box>
            <Text>Speaker(s):</Text>
            <HStack pt={2}>
              {event.speakers.map((speaker, index) => (
                <VStack key={index}>
                  {speaker.profile_pic ? (
                    <Image
                      boxSize="100px"
                      borderRadius="full"
                      src={speaker.profile_pic}
                      alt={speaker.name}
                    />
                  ) : (
                    <Icon as={AiOutlineUser} w="100px" h="100px" />
                  )}
                  <Text fontSize="sm">{speaker.name}</Text>
                </VStack>
              ))}
            </HStack>
          </Box>
        ) : null}

        {relatedEvents && relatedEvents.length > 0 ? (
          <Box>
            <Divider pt={2} />
            <VStack alignItems="start">
              <Text pt={4}>Related Events:</Text>
              <Grid templateColumns="repeat(3, 1fr)" gap={2} overflow="hidden">
                {relatedEvents.map((event, index) => (
                  <RelatedEvent key={index} event={event} />
                ))}
              </Grid>
            </VStack>
          </Box>
        ) : null}
      </VStack>
    </Container>
  );
};

export default Event;
