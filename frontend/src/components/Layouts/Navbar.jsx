import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { FaHome } from 'react-icons/fa';
import LOGO from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const navigate = useNavigate();
  // Home Page
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black -mt-1"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <img src={LOGO} alt="logo" className="h-[24px] md:h-[26px]" />
      <div
        title="Home"
        onClick={handleClick}
        className="absolute top-4 right-4 text-black font-semibold text-lg hover:bg-gray-50 hover:text-sky-500 rounded-md px-3 py-1 cursor-pointer"
      >
        <FaHome />
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} setOpenSideMenu={setOpenSideMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
