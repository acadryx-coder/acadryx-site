import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Kiki from "./Kiki.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Kiki />
    </>
  );
}
