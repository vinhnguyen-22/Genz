import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generatePublicUrl } from "../../../urlConfig";

import "./style.scss";

const CartItem = ({
  cartItem,
  onQuantityInc,
  onQuantityDec,
  onRemoveCartItem,
}) => {
  const { _id, name, price, img, quantity } = cartItem;

  const [qty, setQty] = useState(quantity);

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    onQuantityDec(_id, qty - 1);
  };
  return (
    <div className="cart-item-container" style={{ padding: "10px" }}>
      <div className="flex-row">
        <div className="cart-details__img">
          <img src={generatePublicUrl(img)} alt="photo" />
        </div>

        <div className="cart-details__info">
          <div className="" style={{ width: "100%" }}>
            <p>{name}</p>
            <p>${price}</p>
          </div>
          <div style={{ fontSize: "14px", color: "chocolate" }}>
            Delivery in 3 - 5 days
          </div>
        </div>

        <div
          style={{
            display: "flex",
            margin: "5px 0",
          }}
        >
          <div className="quantity-control">
            <button onClick={onQuantityDecrement}>-</button>
            <input type="number" value={qty} name="quantity" />
            <button onClick={onQuantityIncrement}>+</button>
          </div>

          <button className="cart-action-btn">Save later</button>
          <button
            className="cart-action-btn"
            style={{ background: "tomato" }}
            onClick={() => onRemoveCartItem(_id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
