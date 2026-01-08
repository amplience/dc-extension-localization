import React from "react";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import InputAdornment from "@material-ui/core/InputAdornment";

export function Lock({ locked, onClick, locale }) {
  const Icon = locked ? LockIcon : LockOpenIcon;

  return (
    <InputAdornment position="end">
      <span
        role="button"
        aria-label={`lock-${locale}`}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <Icon />
      </span>
    </InputAdornment>
  );
}
