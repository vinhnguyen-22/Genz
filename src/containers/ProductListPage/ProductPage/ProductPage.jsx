import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getParams from "../../../utils/getParams";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../../../components/UI/Card/Card";

import "./style.scss";

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const { page } = product;

  useEffect(() => {
    const params = getParams(props.location.search);
    const payload = {
      params,
    };

    dispatch(getProductPage(payload));
  }, []);

  return (
    <div style={{ margin: "0px 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{
                display: "block",
              }}
              href={banner.navigateTo}
            >
              <img src={`http://localhost:5000${banner.img}`} />
            </a>
          ))}
      </Carousel>

      <div className="product-thumb">
        {page.products &&
          page.products.map((product, index) => (
            <Card
              key={index}
              style={{ height: "400px", width: "400px", margin: "0 5px" }}
            >
              <img
                className="product-thumb_img"
                src={`http://localhost:5000${product.img}`}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
