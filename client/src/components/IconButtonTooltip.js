import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const IconButtonWithHelpText = ({
  iconComponent: Icon,
  onClick: onClick,
  helpText,
  ...props
}) => {
  return (
    <Tooltip title={helpText} placement="top">
      <IconButton onClick={onClick} {...props}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default IconButtonWithHelpText;
