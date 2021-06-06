import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../actions";
import { getCartItems } from "../../actions/cart.action";
import { addOrder } from "../../actions/user.action";

import Layout from "../../components/Layout/Layout";
import { MaterialButton, MaterialInput } from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails/PriceDetails";
import Card from "../../components/UI/Card/Card";
import CartPage from "../CartPage/CartPage";
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

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
  disableAddressEditForm,
}) => {
  return (
    <div className="flex-row address-container">
      <div className="">
        <input type="radio" onClick={() => selectAddress(adr)} name="address" />
      </div>

      <div className="flex-row sb address-info">
        {!adr.edit ? (
          <div className="address-detail">
            <div className="">
              <span className="address-info__name">{adr.name}</span>
              <span className="address-info__mobilephone">
                {adr.mobileNumber}
              </span>
              <span className="address-info__type">{adr.addressType}</span>
            </div>
            <div className="address-info__address">
              {adr.address}
              {adr.selected && (
                <button
                  className="edit-address-btn"
                  onClick={() => enableAddressEditForm(adr)}
                >
                  <AiFillEdit />
                  edit
                </button>
              )}
            </div>

            <div className="full-address">
              {adr.address} <br />
              {`${adr.state} -${adr.pinCode}`}
            </div>

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
        ) : (
          <AddressForm
            title={"EDIT ADDRESS"}
            stepNumber={"x"}
            withoutLayout={true}
            initialData={adr}
            onSubmitForm={onAddressSubmit}
            onClick={() => disableAddressEditForm(adr)}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

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
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );

    setAddress(updatedAddress);
  };

  const disableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) => ({ ...adr, edit: false }));

    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalPrice = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, quantity } = cart.cartItems[key];
      return totalPrice + price * quantity;
    }, 0);

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].quantity,
    }));

    const payload = {
      addressId: selectedAddress._id,
      totalAmount: totalPrice,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };

    console.log({ payload });
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);

    user.address.length === 0 && setNewAddress(false);
  }, [user.address]);

  if (confirmOrder) {
    return (
      <Layout>
        <Card>
          <div>Thank you so much !!!</div>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="cart-container"
        style={{ alignItems: "flex-start", marginTop: "20px" }}
      >
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
            active={confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div
                    style={{
                      margin: "10px 20px",
                      color: "darkcyan",
                      lineHeight: "30px",
                    }}
                    className="show-address"
                  >
                    <div>
                      Thank for
                      <strong
                        style={{ color: "chocolate" }}
                      >{` ${selectedAddress.name}  - ${selectedAddress.mobileNumber} `}</strong>
                      . Hope you have a great day
                    </div>
                    <strong>{`${selectedAddress.address} - ${selectedAddress.cityDistrictTown} - ${selectedAddress.pinCode}`}</strong>
                  </div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      disableAddressEditForm={disableAddressEditForm}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {confirmAddress ? null : newAddress ? (
            <AddressForm
              title="NEW ADDRESS"
              onSubmitForm={onAddressSubmit}
              stepNumber="-"
              onClick={() => setNewAddress(false)}
            />
          ) : (
            <CheckoutStep
              stepNumber={"+"}
              title="NEW ADDRESS"
              onClick={() => setNewAddress(true)}
              active={!auth.authenticate ? false : true}
            />
          )}

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <strong style={{ padding: "20px", color: "darkcyan" }}>
                  <table style={{ margin: "0 auto" }}>
                    <thead style={{ textAlign: "center", color: "coral" }}>
                      LIST ITEMS
                    </thead>
                    {Object.values(cart.cartItems).map((item, index) => (
                      <tr>
                        <td style={{ width: "65%" }}>{item.name}:</td>
                        <td
                          style={{
                            textAlign: "right",
                            width: "35%",
                            color: "chocolate",
                          }}
                        >
                          {item.quantity}
                        </td>
                      </tr>
                    ))}
                  </table>
                  <h3 style={{ textAlign: "center" }}>
                    Total Items: {Object.keys(cart.cartItems).length}
                  </h3>
                </strong>
              ) : null
            }
          />

          {orderSummary ? (
            <Card style={{ marginBottom: "20px", marginTop: "0px" }}>
              <div className="flex-row sb" style={{ padding: "10px" }}>
                <p style={{ width: "70%" }}>
                  Order confirmation email will be sent to {auth.user.email}
                </p>
                <MaterialButton
                  title="CONTINUE"
                  style={{ width: "30%" }}
                  bgColor={"cornflowerblue"}
                  onClick={userOrderConfirmation}
                />
              </div>
            </Card>
          ) : null}

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div className="step-completed">
                  <div
                    className="flex-row"
                    style={{
                      width: "70%",
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <input type="radio" name="paymentOption" value="cod" />
                    <div className="">Cash on delivery</div>
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    style={{ width: "30%", margin: "0 0 20px 20px" }}
                    bgColor={"cornflowerblue"}
                    onClick={onConfirmOrder}
                  />
                </div>
              )
            }
          />
        </div>

        <Card
          style={{ width: "400px", marginTop: "0px" }}
          headerLeft={"Price Detail"}
        >
          <PriceDetails
            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
              return qty + cart.cartItems[key].quantity;
            }, 0)}
            totalPrice={Object.keys(cart.cartItems).reduce(
              (totalPrice, key) => {
                const { price, quantity } = cart.cartItems[key];
                return totalPrice + price * quantity;
              },
              0
            )}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
