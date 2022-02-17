// Formats date string with date and time included
export const formatDateString = (dateStringInput) => {
  const date = new Date(dateStringInput);
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  });
};

// Formats date string with only date included
export const formatDateStringDate = (dateStringInput) => {
  const date = new Date(dateStringInput);
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

// Formats date string with only time included
export const formatDateStringTime = (dateStringInput) => {
  const date = new Date(dateStringInput);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  });
};
