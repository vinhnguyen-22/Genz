import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCartItems,
  removeCartItem,
} from "../../actions/cart.action";
import Layout from "../../components/Layout/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails/PriceDetails";
import Card from "../../components/UI/Card/Card";
import { generatePublicUrl } from "../../urlConfig";
import CartItem from "./CartItem/CartItem.jsx";

import "./style.scss";

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const [cartItems, setCartItems] = useState(cart.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, quantity) => {
    const { name, price, img } = cartItems[_id];

    dispatch(addToCart({ _id, name, price, img }, 1));
  };
  const onQuantityDecrement = (_id, quantity) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return Object.keys(cartItems).map((key, index) => (
      <CartItem
        key={index}
        cartItem={cartItems[key]}
        onQuantityInc={onQuantityIncrement}
        onQuantityDec={onQuantityDecrement}
      />
    ));
  }
  return (
    <Layout>
      <div className="cart-container">
        <Card
          headerLeft={`My Cart`}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
            />
          ))}

          <div className="checkout-container-btn">
            <div
              style={{ width: "250px", padding: "10px" }}
              className="checkcout-btn"
            >
              <MaterialButton
                title={
                  cartItems && // 👈 null and undefined check
                  Object.keys(cartItems).length === 0 &&
                  cartItems.constructor === Object
                    ? "shopping"
                    : "place order"
                }
                onClick={() => {
                  return cartItems && // 👈 null and undefined check
                    Object.keys(cartItems).length === 0 &&
                    cartItems.constructor === Object
                    ? props.history.push("/")
                    : props.history.push("/checkout");
                }}
              />
            </div>
          </div>
        </Card>

        <Card style={{ width: "500px", marginLeft: "10px" }} headerLeft="Price">
          <PriceDetails
            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
              return qty + cart.cartItems[key].quantity;
            }, 0)}
            totalPrice={Object.keys(cart.cartItems).reduce(
              (totalPrice, key) => {
                const { price, quantity } = cart.cartItems[key];
                return totalPrice + price * quantity;
              },
              0
            )}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default CartPage;
