import React from "react";

function Button({ inner, style, onClick }) {
  return (
    <div className="custom-btn" style={style} onClick={onClick}>
      <span>{inner}</span>
    </div>
  );
}

export default Button;
