import React from "react";
import Layout from "../../components/Layout/Layout";
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories/ClothingAndAccessories";
import ProductPage from "./ProductPage/ProductPage";
import ProductStore from "./ProductStore/ProductStore";

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;

    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;

      case "page":
        content = <ProductPage {...props} />;
        break;

      default:
        content = <ClothingAndAccessories {...props} />;
    }
    return content;
  };
  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
