import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" id="home-btn">
        FruitMart
      </NavLink>
      <Search />
      <div>
        <NavLink to="">
          <AiOutlineUser />
        </NavLink>
        <NavLink to="">
          <AiOutlineShopping />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
