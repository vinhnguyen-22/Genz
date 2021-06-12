import React, { useState } from "react";
import "./style.scss";

const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div className="modalClose" onClick={props.onClose}>
            x
          </div>
          <div className="modalContainer">{props.children}</div>
        </div>
      </div>
    </>
  );
};

const MaterialInput = (props) => {
  const [focus, setFocus] = useState(props.value === "" ? false : true);
  const [touch, setTouch] = useState(false);

  return (
    <div className="materialInput" style={{ marginBottom: "20px" }}>
      <label
        className={`label ${focus ? "focus" : ""}`}
        style={{
          top: 0,
          lineHeight: "none",
        }}
      >
        {props.label && `Enter ${props.label}`}
      </label>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          className="input"
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={(e) => {
            setFocus(true);
            setTouch(true);
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setFocus(false);
            } else {
              setTouch(false);
            }
          }}
        />
        {props.rightElement ? props.rightElement : null}
      </div>
      {touch && (
        <div
          style={{
            fontSize: "10px",
            color: "red",
            fontWeight: 500,
            marginTop: "5px",
          }}
        >{`${props.label} is require`}</div>
      )}
    </div>
  );
};

const MaterialButton = (props) => {
  const onClick = () => {
    props.onClick && props.onClick();
  };

  return (
    <div
      style={{
        width: "100%",
        ...props.style,
      }}
    >
      <button
        className="materialButton"
        style={{ backgroundColor: props.bgColor, textColor: props.textColor }}
        onClick={onClick}
      >
        {props.icon && props.icon}
        {props.title && props.title}
      </button>
    </div>
  );
};

const DropdownMenu = (props) => {
  return (
    <div className="headerDropdownContainer">
      {props.menu}
      <div className="dropdown">
        <div className="upArrow"></div>
        {props.firstMenu}
        <ul className="headerDropdownMenu">
          {props.menus &&
            props.menus.map((item, index) => (
              <li key={index}>
                <a
                  href={`${item.href}`}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick && item.onClick();
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const BreadCrumb = (props) => {
  return (
    <div className="BreadCrumb">
      <ul>
        {props.BreadCrumb &&
          props.BreadCrumb.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.name}</a>
              <div></div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { Modal, MaterialInput, MaterialButton, DropdownMenu, BreadCrumb };
