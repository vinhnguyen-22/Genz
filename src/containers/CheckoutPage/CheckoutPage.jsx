import React, { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../actions";
import Layout from "../../components/Layout/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import AddressForm from "./AddressForm/AddressForm";

import "./style.scss";

const CheckoutStep = (props) => {
  return (
    <div className="checkout-step">
      <div className={`checkout-header ${props.active && "active"}`}>
        <div className="">
          <span className="step-number">{props.stepNumber}</span>
          <span className="step-title">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onAddressSubmit = () => {};

  useEffect(() => {
    dispatch(getAddress());
  }, []);

  return (
    <Layout>
      <div className="cart-container" style={{ alignItems: "flex-start" }}>
        <div className="checkout-container">
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              <div className="logged-in-id">
                <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
              </div>
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={true}
            body={
              <>
                {user.address.map((adr) => (
                  <div className="flex-row address-container">
                    <div className="">
                      <input type="radio" name="address" />
                    </div>

                    <div className="flex-row sb address-info">
                      <div className="">
                        <div className="">
                          <span>{adr.name}</span>
                          <span>{adr.addressType}</span>
                          <span>{adr.mobileNumber}</span>
                        </div>
                        <div>{adr.address}</div>

                        <MaterialButton
                          title="DELIVERY HERE"
                          style={{
                            width: "250px",
                          }}
                        />
                      </div>

                      <button className="edit-address-btn">
                        <AiFillEdit />
                        edit
                      </button>
                    </div>
                  </div>
                ))}
              </>
            }
          />

          <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />

          <CheckoutStep stepNumber={"3"} title={"ORDER SUMARY"} />
          <CheckoutStep stepNumber={"4"} title={"PAYMENT OPTIONS"} />
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
