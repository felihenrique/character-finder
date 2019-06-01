import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function LoadingCover() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        background: "rgba(100, 100, 100, 0.3)",
        zIndex: 1000
      }}
    >
      <CircularProgress
        style={{ position: "fixed", top: "50%", left: "50%" }}
      />
    </div>
  );
}
