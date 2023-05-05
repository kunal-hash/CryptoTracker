import React from "react";
import "./style.css";

function Button({ text, outlined, onClick }) {
  return (
    <div
      className={outlined ? "outlined-btn" : "btn"}
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </div>
  );
}

export default Button;
