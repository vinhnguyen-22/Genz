import React, { useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoIosStar, IoMdCart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import { addToCart } from "../../actions/cart.action";
import Layout from "../../components/Layout/Layout";
import { BreadCrumb, MaterialButton } from "../../components/MaterialUI";
import { generatePublicUrl } from "../../urlConfig";
import "./style.scss";

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);

  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const { productId } = props.match.params;

    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);
  console.log(category);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }
  console.log({ product });
  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="product-description-container">
        <div className="flex-row">
          <div className="vertical-image-stack">
            {product.productDetails.productPictures.map((thumb, index) => (
              <div
                key={index}
                className={`thumbnail ${index === imgIndex ? "active" : ""}`}
                onClick={() => setImgIndex(index)}
              >
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              </div>
            ))}
          </div>
          <div className="product-desc-container">
            <div className="product-desc-container__img">
              <img
                src={generatePublicUrl(
                  product.productDetails.productPictures[imgIndex].img
                )}
                alt={`${product.productDetails.productPictures[0].img}`}
              />
              <a
                className="next"
                onClick={() => {
                  if (
                    imgIndex <
                    product.productDetails.productPictures.length - 1
                  ) {
                    setImgIndex(imgIndex + 1);
                  } else {
                    setImgIndex(0);
                  }
                }}
              >
                &#10095;
              </a>
              <a
                className="prev"
                onClick={() => {
                  if (imgIndex > 0) {
                    setImgIndex(imgIndex - 1);
                  } else {
                    setImgIndex(
                      product.productDetails.productPictures.length - 1
                    );
                  }
                }}
              >
                &#10094;
              </a>
            </div>

            {/* action buttons */}
            <div className="flex-row">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }, 1));
                  props.history.push("/cart");
                }}
              />

              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "25px",
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "20px" }}>
          {/* home > category > subCategory > productName */}
          <BreadCrumb
            BreadCrumb={[
              { name: "Home", href: "/" },
              {
                name: `${product.productDetails.name}`,
                href: "/account/orders",
              },
            ]}
          />

          {/* product description */}
          <div className="product-details">
            <p className="product-title">{product.productDetails.name}</p>
            <div>
              <span className="rating-count">
                4.3 <IoIosStar />
              </span>
              <span className="rating-numbers-reviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extra-offer">Extra $4500 off </div>
            <div className="flex-row price-container">
              <span className="price">${product.productDetails.price}</span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
              {/* <span>i</span> */}
            </div>
            <div className="product-info__desc">
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "14px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description:
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#212121",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
