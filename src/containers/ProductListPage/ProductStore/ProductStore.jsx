import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsBySlug } from "../../../actions";
import Card from "../../../components/UI/Card/Card";
import Ratings from "../../../components/UI/Ratings/Ratings";
import { generatePublicUrl } from "../../../urlConfig";

import "./style.scss";

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const priceRange = product.priceRange;
  console.log({ product });
  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="product-store">
            <Card
              headerLeft={`
                ${props.match.params.slug} mobile ${priceRange[key]}$
          `}
              headerRight={<button>view all</button>}
              style={{ width: "calc(100% -20px)", margin: "20px" }}
            >
              <div style={{ display: "flex" }}>
                {product.productsByPrice[key].map((product) => (
                  <Link
                    to={`/${product.slug}/${product._id}/p`}
                    style={{ display: "inline-block" }}
                    className="product-container"
                  >
                    <div className="product-container-image">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt=""
                      />
                    </div>

                    <div className="product-info">
                      <div className="product-info_name">{product.name}</div>

                      <Ratings value={"5"} />
                      <span>3353</span>

                      <span className="product-info__price">
                        {product.price}$
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default ProductStore;
