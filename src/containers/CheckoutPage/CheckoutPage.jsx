import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../actions";
import Layout from "../../components/Layout/Layout";
import { MaterialButton, MaterialInput } from "../../components/MaterialUI";
import AddressForm from "./AddressForm/AddressForm";

import "./style.scss";

const CheckoutStep = (props) => {
  return (
    <div className="checkout-step">
      <div
        onClick={props.onClick}
        className={`checkout-header ${props.active && "active"}`}
      >
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
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onAddressSubmit = () => {};

  const selectAddress = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  return (
    <Layout>
      <div className="cart-container" style={{ alignItems: "flex-start" }}>
        <div className="checkout-container">
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedin-id">
                  <span style={{ fontWeight: "bold" }}>
                    Hi, welcome to checkout {auth.user.fullName}
                  </span>
                  <br />
                  <span>Email: {auth.user.email}</span>
                </div>
              ) : (
                <div className="loggedin-id">
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />

          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={confirmAddress}
            body={
              <>
                {confirmAddress
                  ? JSON.stringify(selectedAddress)
                  : address.map((adr) => (
                      <div className="flex-row address-container">
                        <div className="">
                          <input
                            type="radio"
                            onClick={() => selectAddress(adr)}
                            name="address"
                          />
                        </div>

                        <div className="flex-row sb address-info">
                          <div className="">
                            <div className="">
                              <span>{adr.name}</span>
                              <span>{adr.addressType}</span>
                              <span>{adr.mobileNumber}</span>
                            </div>
                            <div>{adr.address}</div>

                            {adr.selected && (
                              <MaterialButton
                                title="DELIVERY HERE"
                                onClick={() => confirmDeliveryAddress(adr)}
                                style={{
                                  width: "250px",
                                  marginTop: "10px",
                                }}
                              />
                            )}
                          </div>

                          {adr.selected && (
                            <button className="edit-address-btn">
                              <AiFillEdit />
                              edit
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
              </>
            }
          />

          {confirmAddress ? null : auth.authenticate && newAddress ? (
            <AddressForm
              onSubmitForm={onAddressSubmit}
              setNewAddress={setNewAddress}
              onCancel={() => {}}
            />
          ) : (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              onClick={() => setNewAddress(true)}
              active={false}
            />
          )}

          <CheckoutStep stepNumber={"3"} title={"ORDER SUMARY"} />
          <CheckoutStep stepNumber={"4"} title={"PAYMENT OPTIONS"} />
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
