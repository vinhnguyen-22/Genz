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

  pageRequest: false,
  page: {},
  error: null,
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

    case productConstants.GET_PRODUCT_PAGE_REQUEST:
      state = {
        ...state,
        pageRequest: true,
      };
      break;

    case productConstants.GET_PRODUCT_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };
      break;

    case productConstants.GET_PRODUCT_PAGE_FAILURE:
      state = {
        ...state,
        pageRequest: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
