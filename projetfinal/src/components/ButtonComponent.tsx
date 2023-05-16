import React from "react";
import "./Button.css";

function ButtonComponent({ handleOnClick, text, lien }) {
  return (
    <a href={lien}>
      <button className="button-default" onClick={handleOnClick}>
        {text}
      </button>
    </a>
  );
}

export default ButtonComponent;
