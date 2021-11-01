import React from "react";
import labelTextStyles from "./LabelText.module.css";

function LabelText({ label, text, textStyles }) {
  return (
    <div className={labelTextStyles.labels_margin}>
      <p className={labelTextStyles.labels}>{label}</p>
      <p style={textStyles && textStyles}>{text}</p>
    </div>
  );
}

export default LabelText;
