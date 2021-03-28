import { cartConstants } from "./constants";
import store from "../store/index";
import axiosIntance from "../helper/axios";

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axiosIntance.post("/user/getcartitems");
      if (res.status === 200) {
        const { cartItems } = res.data;

        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (product, newQuantity = 1) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();

    const quantity = cartItems[product._id]
      ? parseInt(cartItems[product._id].quantity + newQuantity)
      : 1;
    cartItems[product._id] = {
      ...product,
      quantity,
    };

    if (auth.authenticate) {
      localStorage.removeItem("cart");
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });

      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: quantity,
          },
        ],
      };

      const res = await axiosIntance.post("/user/cart/addtocart", payload);

      console.log(res);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    if (cartItems) {
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
    }
  };
};
export { getCartItems };
