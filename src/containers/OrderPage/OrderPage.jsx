import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout/Layout";
import { BreadCrumb } from "../../components/MaterialUI";
import Card from "../../components/UI/Card/Card";
import { generatePublicUrl } from "../../urlConfig";

import "./style.scss";

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <BreadCrumb
          BreadCrumb={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
        />

        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card
              style={{
                maxWidth: "1200px",
                margin: "5px auto",
                backgroundColor: "white",
              }}
            >
              <div className="orderItemContainer">
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                    alt=""
                  />
                </div>

                <div className="orderRow">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">{item.payablePrice}$</div>
                  <div>{order.paymentStatus}</div>
                </div>
              </div>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
