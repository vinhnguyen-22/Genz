import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  MaterialButton,
  MaterialInput,
  Modal,
} from "../MaterialUI";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import logo from "../../assets/img/commerce.png";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, registration } from "../../actions";
import { Link, Redirect } from "react-router-dom";
import { getCartItems } from "../../actions/cart.action";

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const totalItem = Object.values(cart.cartItems)
    .map((key, index) => {
      return key.quantity;
    })
    .reduce((acc, cur) => {
      acc += cur;
      return acc;
    }, 0);

  const dispatch = useDispatch();

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(registration(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
    }
  };
  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.fullName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "SuperCoin Zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="login-button"
            onClick={() => {
              setLoginModal(true);
              setSignup(false);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="first-menu" style={{ margin: "10px 10px" }}>
            <span>New Customer ? </span>
            <a
              style={{
                color: "white",
                backgroundColor: "cornflowerblue",
                padding: "5px",
              }}
              onClick={() => {
                setSignup(true);
                setLoginModal(false);
              }}
            >
              Register
            </a>
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <Modal
        visible={loginModal || signup}
        onClose={() => {
          setLoginModal(false);
          setSignup(false);
        }}
      >
        <div className="author-container">
          <div className="row">
            <div className="left-space">
              <h2>{signup ? "Registration" : "Login"}</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>

            <div className="right-space">
              {signup && (
                <MaterialInput
                  type="text"
                  label="Enter firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              )}

              {signup && (
                <MaterialInput
                  type="text"
                  label="Enter lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              )}

              <MaterialInput
                type="text"
                label="Enter email/mobile phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // rightElement={<a href="#">Forgot ?</a>}
              />
              {signup ? (
                <>
                  <MaterialButton
                    title="Registration"
                    bgColor="#fb641b"
                    textColor="#ffffff"
                    style={{
                      margin: "40px 0px 0px 0px",
                      width: "300px",
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      userLogin();
                      setSignup(false);
                    }}
                  />
                  <MaterialButton
                    title="Login"
                    bgColor="cornflowerblue"
                    textColor="#ffffff"
                    style={{
                      margin: "40px 0px 0px 0px",
                      width: "300px",
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      setSignup(false);
                      setLoginModal(true);
                    }}
                  />
                </>
              ) : (
                <>
                  <MaterialButton
                    title="Login"
                    bgColor="#fb641b"
                    textColor="#ffffff"
                    style={{
                      margin: "40px 0px 0px 0px",
                      width: "300px",
                      borderRadius: "20px",
                    }}
                    onClick={userLogin}
                  />

                  <p style={{ textAlign: "center" }}>or</p>

                  <MaterialButton
                    title="Request OTP"
                    bgColor="#50BDC7"
                    textColor="#fff"
                    style={{ width: "300px" }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/** */}

      <div className="sub-header">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} className="logo-image" alt="" />
          </Link>
          <a style={{ marginTop: "-10px" }}>
            <span className="explore-text">Explore</span>
            <span className="plus-text">Plus</span>
            <img src={logo} className="golden-star" alt="" />
          </a>
        </div>
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="search-input-container">
            <input
              className="search-input"
              placeholder={"search for products, brands and more"}
            />
            <div className="search-icon-container">
              <IoIosSearch
                style={{
                  color: "#3c40c6",
                }}
              />
            </div>
          </div>
        </div>

        <div className="right-menu">
          {!auth.authenticate ? renderNonLoggedInMenu() : renderLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <Link to="/cart" className="cart">
              <IoIosCart />
              <span class="badge">{totalItem}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
