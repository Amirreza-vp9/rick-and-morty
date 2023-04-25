import React from "react";
import SideBar from "../../components/sidebar";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function WebLayout() {
  return (
    <div>
      <SideBar />
      <Box
        sx={{
          width: { md: "calc(100% - 12em)", xs: "100%" },
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}

export default WebLayout;
