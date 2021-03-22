import React, { useState } from "react";
import {
  DropdownMenu,
  MaterialButton,
  MaterialInput,
  Modal,
} from "../MaterialUI";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import logo from "../../assets/img/commerce.png";
import "./style.scss";
import { useDispatch } from "react-redux";
import { login } from "../../actions";

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = () => {
    dispatch(login({ email, password }));
    setLoginModal(false);
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="author-container">
          <div className="row">
            <div className="left-space">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>

            <div className="right-space">
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

              <MaterialButton
                title="Login"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  margin: "40px 0px 20px 0px",
                }}
                onClick={userLogin}
              />

              <p>OR</p>

              <MaterialButton
                title="Request OTP"
                bgColor="#50BDC7"
                textColor="#fff"
                style={{
                  margin: "20px 0px",
                }}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/** */}

      <div className="sub-header">
        <div className="logo">
          <a href="">
            <img src={logo} className="logo-image" alt="" />
          </a>
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
          <DropdownMenu
            menu={
              <a className="login-button" onClick={() => setLoginModal(true)}>
                Login
              </a>
            }
            menus={[
              { label: "My Profile", href: "", icon: null },
              { label: "Flipkart Plus Zone", href: "", icon: null },
              { label: "Orders", href: "", icon: null },
              { label: "Wishlist", href: "", icon: null },
              { label: "Rewards", href: "", icon: null },
              { label: "Gift Cards", href: "", icon: null },
            ]}
            firstMenu={
              <div className="first-menu">
                <span>New Customer?</span>
                <a style={{ color: "#2874f0" }}>Sign Up</a>
              </div>
            }
          />
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
            <a className="cart">
              <IoIosCart />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
