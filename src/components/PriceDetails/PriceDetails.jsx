import React from "react";
import Card from "../UI/Card/Card";

import "./style.scss";
const PriceDetails = (props) => {
  return (
    <div style={{ padding: "10px" }}>
      <div style={{ pboxSizing: "border-box" }}>
        <div className="flex-row sb">
          <div style={{ fontWeight: "bold" }}>
            Price ({props.totalItem} items)
          </div>
          <div>{props.totalPrice}</div>
        </div>
      </div>

      <div className="flex-row sb">
        <div style={{ fontWeight: "bold" }}>Delivery Charges</div>
        <div>Free</div>
      </div>

      <div className="flex-row sb">
        <div style={{ fontWeight: "bold" }}>Total Amount</div>
        <div>{props.totalPrice} $ </div>
      </div>
    </div>
  );
};

export default PriceDetails;
