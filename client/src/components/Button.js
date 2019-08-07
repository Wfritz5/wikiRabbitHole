import React from "react";

const Button = props => {

  return (
    <button
      type={props.type}
      form={props.id}
      id={props.id}
      className={props.className}
      style={props.style}
      onClick={props.onClick}>
      {props.label}
    </button>
  );
}

export default Button;