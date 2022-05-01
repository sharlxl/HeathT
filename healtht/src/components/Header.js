import React, { useState } from "react";
import MenuIcon from "../svg/MenuIcon";
import Logo from "../images/placeholderLogo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);

  const onClickDropdown = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  return (
    <div className="bg-[rgba(40,213,188,1)] justify-between h-[3rem] flex sm:flex-col sm:h-full sm:w-[15rem] sm:justify-start">
      <img className="sm:w-[80%] sm:self-center" src={Logo} alt="logo" />
      <button className="w-auto p-3 sm:hidden" onClick={onClickDropdown}>
        <MenuIcon />
      </button>
      {dropdown ? (
        <div className="origin-top-right absolute top-[3.1rem] right-[0.5rem] rounded-md shadow-lg bg-[rgba(40,213,188,1)] text-black flex flex-col w-[12rem] sm:hidden">
          <ul className="p-5">
            <li className="p-[0.5rem]">
              <NavLink to="/main">Home</NavLink>
            </li>
            <li className="">
              <NavLink to="/conditions">Medical Conditions</NavLink>
            </li>
            <li className="p-[0.5rem]">
              <NavLink to="/record">Records</NavLink>
            </li>
            <li className="p-[0.5rem]">
              <NavLink to="/faq">FAQ/Useful Links</NavLink>
            </li>
            <li className="p-[0.5rem]">
              <NavLink to="">logout</NavLink>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
      <ul className="hidden sm:flex sm:flex-col self-center">
        <li className="">
          <NavLink to="/main">Home</NavLink>
        </li>
        <li className="">
          <NavLink to="/conditions">Medical Conditions</NavLink>
        </li>
        <li className="">
          <NavLink to="/record">Records</NavLink>
        </li>
        <li className="">
          <NavLink to="/faq">FAQ/Useful Links</NavLink>
        </li>
        <li className="">
          <NavLink to="">logout</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
