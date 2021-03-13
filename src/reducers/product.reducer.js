import React from "react";
import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  productsByPrice: {
    under50$: [],
    under100$: [],
    under200$: [],
    under300$: [],
    under400$: [],
    under500$: [],
    above: [],
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
      break;
  }
  return state;
};
