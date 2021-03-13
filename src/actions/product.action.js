import axiosIntance from "../helper/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosIntance.get(`/products/${slug}`);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
      dispatch({});
    }
  };
};
