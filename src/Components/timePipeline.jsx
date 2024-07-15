import React from "react";
import { format } from "date-fns";

const TimeComponent = ({ date }) => {
  if (!date) return null;

  const dateObject = new Date(date);
  const formattedTime = format(dateObject, "hh:mm aa");

  return <span>{formattedTime}</span>;
};

export default TimeComponent;
