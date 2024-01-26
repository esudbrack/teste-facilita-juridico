import { TextField } from "@mui/material";
import * as React from "react";

export const CustomTextField = ({
  field,
  placeholder,
  required,
  type,
}) => {
  return (
    <TextField
      {...field}
      label={placeholder}
      required={required}
      type={type}
      fullWidth
      margin="normal"
    />
  );
};
