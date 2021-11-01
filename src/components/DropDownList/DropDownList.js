import React from "react";
import dropDownListStyles from "./DropDownList.module.css";

function DropDownList({ setValue, setOffset, options }) {
  const onChange = (e) => {
    setValue(e.target.value);
    setOffset(0);
  };

  return (
    <select className={dropDownListStyles.select} onChange={onChange}>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  );
}

export default DropDownList;
