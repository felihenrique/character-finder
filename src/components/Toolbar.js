import { AppBar, Typography, Toolbar } from "@material-ui/core";
import React from "react";

export default function({ title, children, ...therest }) {
  return (
    <AppBar {...therest}>
      <Toolbar>
        {children ? (
          children
        ) : (
          <Typography variant="h6" color="inherit" noWrap>
            {title}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
