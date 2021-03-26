import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsBySlug } from "../../../actions";
import Card from "../../../components/UI/Card/Card";
import { generatePublicUrl } from "../../../urlConfig";

import "./style.scss";

const ProductStore = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const [priceRange, setPriceRange] = useState({
    under50$: "Under 50",
    under100$: "Under 100",
    under200$: "Under 200",
    under300$: "Under 300",
    under400$: "Under 400",
    under500$: "Under 500",
    above: "Above 500",
  });

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

                      <span style={{ display: "block" }}>4.3</span>
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
