// src/components/Header.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/ministock.png";
import notification from "../assets/notification.png";
import profile from "../assets/profile.png";

const Header = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : "inactive"}>
            Summary
          </NavLink>
        </li>
        <li>
          <NavLink to="/management" className={({ isActive }) => isActive ? "active" : "inactive"}>
            Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className={({ isActive }) => isActive ? "active" : "inactive"}>
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={({ isActive }) => isActive ? "active" : "inactive"}>
            History
          </NavLink>
        </li>
      </ul>
      <div className="nav-icons">
        <img src={notification} alt="Notification" className="icon" />
        <img src={profile} alt="Profile" className="icon" />
      </div>
    </nav>
  );
};

export default Header;