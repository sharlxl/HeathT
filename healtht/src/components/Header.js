import React, { useState } from "react";
import MenuIcon from "../svg/MenuIcon";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, selectUser } from "../redux/userSlice";
import logo2 from "../images/logo2.png";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const user = useSelector(selectUser);
  const styledName = user.name[0].toUpperCase() + user.name.substring(1);

  const onClickDropdown = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = (e) => {
    e.preventDefault();
    dispatch(LOGOUT());
    navigate("/");
  };

  return (
    <div className="bg-[rgba(40,213,188,1)] justify-between h-[3rem] flex sm:flex-col sm:h-full sm:w-[15rem] sm:justify-start">
      <div className="flex sm:flex-col">
        <img
          className="h-[3rem] sm:h-[5rem] sm:p-1.5 sm:self-center"
          src={logo2}
          alt="logo"
        />
        <h1 className="text-3xl sm:pt-5 pl-5 pt-1.5 text-[#344B46]">
          Hi, {styledName}
        </h1>
      </div>

      <button className="w-auto p-3 sm:hidden" onClick={onClickDropdown}>
        <MenuIcon />
      </button>

      {dropdown ? (
        <div className="z-50 origin-top-right absolute top-[3.1rem] right-[0.5rem] rounded-md shadow-lg bg-[rgba(40,213,188,1)] text-black flex flex-col w-[12rem] sm:hidden">
          <ul className="p-5">
            <li className="mt-0.5 p-[0.5rem] shadow-sm ">
              <NavLink to="/main">Home</NavLink>
            </li>
            <li className="mt-0.5 p-[0.5rem] shadow-sm ">
              <NavLink to="/allergies">Allergies</NavLink>
            </li>
            <li className="mt-0.5 p-[0.5rem] shadow-sm ">
              <NavLink to="/conditions">Medical Conditions</NavLink>
            </li>
            <li className="mt-0.5 p-[0.5rem] shadow-sm ">
              <NavLink to="/record">Records</NavLink>
            </li>
            <li className="mt-0.5 p-[0.5rem] shadow-sm ">
              <NavLink to="/faq">FAQ/Useful Links</NavLink>
            </li>
            <button
              className="w-auto p-3 float-right shadow-sm "
              title="Log out"
              onClick={onClickLogout}
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z" />
              </svg>
            </button>
          </ul>
        </div>
      ) : (
        ""
      )}
      <ul className="hidden sm:flex sm:flex-col self-center w-full px-10">
        <li className="hover:bg-[#6D9B91] p-2 rounded-md shadow-sm">
          <NavLink to="/main">Home</NavLink>
        </li>
        <li className="hover:bg-[#6D9B91] p-2 rounded-md shadow-sm">
          <NavLink to="/allergies">Allergies</NavLink>
        </li>
        <li className="hover:bg-[#6D9B91] p-2 rounded-md shadow-sm">
          <NavLink to="/conditions">Medical Conditions</NavLink>
        </li>
        <li className="hover:bg-[#6D9B91] p-2 rounded-md shadow-sm">
          <NavLink to="/record">Records</NavLink>
        </li>
        <li className="hover:bg-[#6D9B91] p-2 rounded-md shadow-sm">
          <NavLink to="/faq">FAQ/Useful Links</NavLink>
        </li>
        <button
          className="w-auto p-3 hover:bg-[#6D9B91] rounded-md self-center shadow-sm"
          title="Log out"
          onClick={onClickLogout}
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z" />
          </svg>
        </button>
      </ul>
    </div>
  );
};

export default Header;
