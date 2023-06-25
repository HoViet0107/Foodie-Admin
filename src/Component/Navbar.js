import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <h1>Foodie</h1>
      </div>
      <div className="nav-right">
        <Link to="/" style={{ textDecoration: "none" }}>
          <p>Đơn hàng</p>
        </Link>
        <Link to="/addfood" style={{ textDecoration: "none" }}>
          <p>Thêm món</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;