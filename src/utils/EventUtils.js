import { Tag } from "@chakra-ui/react";

// Create Tag for Event Component
export const createEventTypeTag = (eventType) => {
  switch (eventType) {
    case "workshop":
      return <Tag colorScheme="green">Workshop</Tag>;
    case "activity":
      return <Tag colorScheme="blue">Activity</Tag>;
    case "tech_talk":
      return <Tag colorScheme="purple">Tech Talk</Tag>;
    default:
      return null;
  }
};
