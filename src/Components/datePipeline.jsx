import React from "react";
import { format } from "date-fns";

const DateComponent = ({ date }) => {
    if (!date) return null;
  const dateObject = new Date(date);
  const formattedDate = format(dateObject, "dd-MM-yyyy");
  return <span>{formattedDate}</span>;

};

export default DateComponent;
