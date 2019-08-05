import React from "react";
import styled from "styled-components";

const Input = styled.input`
border-radius: 3px;
margin: 0.5em;
`;

const Button = props => {

  return (
    <button 
    type={props.type}
    form={props.id}
    id={props.id}
    className=""
    style={props.style}
    onClick={props.onClick}>
    {props.label}
  </button>
  );
}

export default Button;