import React from "react";

import "./style.scss";

const Card = (props) => {
  return (
    <div className="card" {...props}>
      <div className="card-header">
        {props.headerLeft && <div>{props.headerLeft}</div>}
        {props.headerRight && props.headerRight}
      </div>
      {props.children}
    </div>
  );
};

export default Card;
