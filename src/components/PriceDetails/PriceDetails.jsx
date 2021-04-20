import React from "react";
import Card from "../UI/Card/Card";

const PriceDetails = (props) => {
  return (
    <div>
      <div style={{ pboxSizing: "border-box" }}>
        <div className="flex-row sb" style={{ margin: "10px 0" }}>
          <div>Price ({props.totalItem} items)</div>
          <div>{props.totalPrice}</div>
        </div>
      </div>

      <div className="flex-row sb" style={{ margin: "10px 0" }}>
        <div>Delivery Charges</div>
        <div>Free</div>
      </div>

      <div className="flex-row sb" style={{ margin: "10px 0" }}>
        <div>Total Amount</div>
        <div>{props.totalPrice}</div>
      </div>
    </div>
  );
};

export default PriceDetails;
