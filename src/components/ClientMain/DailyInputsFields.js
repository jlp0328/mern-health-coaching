import React from "react";

import TextField from "@material-ui/core/TextField";

export default function DailyInputField({
  attributes: { label, name, required, type, inputProps, multiline, rows }
}) {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      margin="normal"
      inputProps={inputProps}
      required={required}
      multiline={multiline}
      rows={rows}
    />
  );
}
