import React from "react";

import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import InputAdornment from "@material-ui/core/InputAdornment";

export function Lock({ locked, onClick }) {
  const Icon = locked ? LockIcon : LockOpenIcon;

  return (
    <InputAdornment position="end">
      <Icon aria-label="lock icon" onClick={onClick} />
    </InputAdornment>
  );
}
