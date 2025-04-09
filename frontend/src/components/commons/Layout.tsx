import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
