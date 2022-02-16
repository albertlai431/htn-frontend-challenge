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

export const formatDateStringDate = (dateStringInput) => {
  const date = new Date(dateStringInput);
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

export const formatDateStringTime = (dateStringInput) => {
  const date = new Date(dateStringInput);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  });
};
