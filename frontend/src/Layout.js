import React from "react";
import TopNav from "./components/header/TopNav";
import { Outlet } from "react-router";
function Layout({ children }) {
  return (
    <div>
      <TopNav />
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}

export default Layout;
