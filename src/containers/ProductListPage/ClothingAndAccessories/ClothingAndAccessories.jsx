import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsBySlug } from "../../../actions";
import Card from "../../../components/UI/Card/Card";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.scss";

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
    console.log({ match });
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
        }}
      >
        {product.products.map((product) => (
          <div className="caContainer">
            <div className="caImgContainer">
              <Link to={`/${product.slug}/${product._id}/p`}>
                <img
                  src={generatePublicUrl(product.productPictures[0].img)}
                  alt=""
                />
              </Link>
            </div>
            <div className="info-product">
              <div className="caProductName">{product.name}</div>
              <div className="caProductPrice">{product.price}$</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ClothingAndAccessories;
