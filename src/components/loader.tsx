import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

export default function Loader() {
  const thisTheme = useSelector((state: any) => state.currentTheme.thisTheme);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        py: "1em",
        bgcolor: `${thisTheme === "dark" ? "#1e1e1e" : "#f6f6f6"}`,
      }}
    >
      <LinearProgress />
    </Box>
  );
}
