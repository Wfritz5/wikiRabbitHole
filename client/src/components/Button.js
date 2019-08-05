import React from "react";

// If we want a child component to update or pass data to its parent, we can create a method inside the parent for the update
// Then bind the method to the parent, and pass it to the child as a prop

function Button(props) {

  return (
    <button 
    type={props.type}
    form={props.id}
    id={props.id}
    className="" 
    onClick={props.onClick}>
    {props.label}
  </button>
  );
}

export default Button;
