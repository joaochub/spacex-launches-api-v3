import React, { useState } from "react";
import dateRangePickerStyles from "./DateRangePicker.module.css";

function DateRangePicker({ setValue, setOffset, startOptions, endOptions }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onChange = (e) => {
    if (e.target.id === startOptions.id) {
      setStartDate(e.target.value);
    }

    if (e.target.id === endOptions.id) {
      setEndDate(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (startDate && endDate) {
      setValue(`start=${startDate}&end=${endDate}`);
      setOffset(0);
    }
  };

  const onClear = () => {
    setStartDate("");
    setEndDate("");
    setValue("");
    setOffset(0);
  };

  return (
    <form>
      <div className={dateRangePickerStyles.fields_container}>
        <div className={dateRangePickerStyles.fields}>
          <label
            className={dateRangePickerStyles.labels}
            htmlFor={startOptions.id}
          >
            {startOptions.label}
          </label>
          <input
            id={startOptions.id}
            type="date"
            min="2006-01-01"
            max="2020-12-31"
            value={startDate}
            onChange={onChange}
          />
        </div>
        <div className={dateRangePickerStyles.fields}>
          <label
            className={dateRangePickerStyles.labels}
            htmlFor={endOptions.id}
          >
            {endOptions.label}
          </label>
          <input
            id={endOptions.id}
            type="date"
            min="2006-01-01"
            max="2020-12-31"
            value={endDate}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={dateRangePickerStyles.buttons_container}>
        <input
          className={dateRangePickerStyles.buttons}
          type="submit"
          value="Apply"
          onClick={onSubmit}
        />
        <input
          className={dateRangePickerStyles.buttons}
          type="button"
          value="Clear"
          onClick={onClear}
        />
      </div>
    </form>
  );
}

export default DateRangePicker;
