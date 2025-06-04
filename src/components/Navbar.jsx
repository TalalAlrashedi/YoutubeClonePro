import React, { useState } from "react";
import { FaBars, FaSearch, FaVideo, FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchText);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#202020] flex items-center px-4 py-2 text-white z-50">
      <button className="mr-4 text-xl">
        <FaBars />
      </button>

      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="red"
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15l5.19-3L10 9v6z" />
          <path d="M21.8 8s-.2-1.42-.8-2.05c-.76-.8-1.61-.81-2-.85C15.25 5 12 5 12 5h0s-3.25 0-6 .1c-.38.04-1.24.05-2 .85-.6.63-.8 2.05-.8 2.05S3 9.75 3 11.5v1c0 1.75.2 3.5.2 3.5s.2 1.42.8 2.05c.76.8 1.76.77 2.2.85 1.6.13 6.8.1 6.8.1s3.25 0 6-.1c.38-.04 1.24-.05 2-.85.6-.63.8-2.05.8-2.05S21 14.25 21 12.5v-1c0-1.75-.2-3.5-.2-3.5z" />
        </svg>
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
    </nav>
  );
};

export default Navbar;