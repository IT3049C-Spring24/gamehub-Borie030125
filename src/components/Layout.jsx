import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
    <Navbar />
    <button style={{ position: 'fixed', top: '70px', right: '10px' }} onClick={() => document.body.classList.toggle('light-mode')}>
        Toggle Dark/Light Mode
      </button>
    <Outlet />
    </>
  );
}