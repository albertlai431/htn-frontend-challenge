import React from "react";
import { Container, VStack, GridItem, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { createEventTypeTag } from "../utils/EventUtils";

const RelatedEvent = (props) => {
  const { event } = props;
  return (
    <GridItem w="100%" h="100%">
      <Container bg="gray.100" borderRadius={6} p={2} h="100%">
        <VStack alignItems="flex-start">
          {createEventTypeTag(event.event_type)}
          <Link
            as={RouterLink}
            to={`/event/${event.id}`}
            fontSize="sm"
            fontWeight="semibold"
          >
            {event.name}
          </Link>
        </VStack>
      </Container>
    </GridItem>
  );
};

export default RelatedEvent;
