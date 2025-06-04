import React, { useState } from "react";
import {
  FaBars,
  FaSearch,
  FaVideo,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchText);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#202020] flex items-center px-4 py-2 text-white z-50">
      <button className="mr-4 text-xl">
        <FaBars />
      </button>

      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube"
          className="h-6 mr-2"
        />
        <span className="font-bold text-xl select-none">YouTube</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 max-w-2xl mx-4">
        <input
          type="text"
          placeholder="ابحث عن فيديو..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-grow px-4 py-2 rounded-l-full border border-gray-600 bg-[#121212] text-white focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#303030] hover:bg-[#404040] px-4 rounded-r-full flex items-center justify-center"
        >
          <FaSearch />
        </button>
      </form>

      <div className="flex items-center gap-4 text-xl">
        <button
          title="رفع فيديو"
          className="hover:bg-[#383838] p-2 rounded-full"
        >
          <FaVideo />
        </button>
        <button
          title="الإشعارات"
          className="hover:bg-[#383838] p-2 rounded-full"
        >
          <FaBell />
        </button>
        <button title="حسابي" className="hover:bg-[#383838] p-2 rounded-full">
          <FaUserCircle />
        </button>
      </div>


      <button
        onClick={handleLogout}
        className="ml-4 bg-red-500 text-white px-2 p-2 hover:cursor-pointer hover:bg-red-600 text-sm"
      >
        خروج
      </button>
    </nav>
  );
};

export default Navbar;