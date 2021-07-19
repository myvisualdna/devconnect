import React from "react";
import SpinnerImage from "./cupertino_activity_indicator.gif";

function Spinner() {
  return (
    <div>
      <img
        src={SpinnerImage}
        style={{ width: "50px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
}

export default Spinner;
