import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Datepicker() {
  return (
    <div className="datepicker-component-container">
      <label>Date: </label>
      <div>
        <DatePicker />
      </div>
    </div>
  );
}
