import React from "react";
import { IoIosStar } from "react-icons/io";

const Ratings = (props) => {
  return (
    <span
      style={{
        display: "inline-block",
        background: "coral",
        color: "blanchedalmond",
        fontWeight: "400",
        fontSize: "12px",
        borderRadius: "3px",
        padding: "2px 5px",
        margin: "0px 10px",
      }}
    >
      {props.value} <IoIosStar />
    </span>
  );
};

export default Ratings;
