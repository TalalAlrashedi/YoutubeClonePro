import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f0f] text-white shadow-md fixed top-0 w-full z-10">

      <div className="flex items-center space-x-2">
        <img
          src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
          alt="YouTube"
          className="h-6 md:h-7"
        />
      </div>


      <div className="flex flex-grow justify-center px-4">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            placeholder="ابحث"
            className="w-full px-4 py-2 bg-zinc-900 text-white border border-zinc-700 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            className="px-4 py-2 bg-zinc-800 text-white border border-zinc-700 border-l-0 rounded-r-full hover:bg-zinc-700"
            aria-label="search"
          >
            <FaSearch />
          </button>
        </div>
      </div>


      <div className="hidden md:flex items-center space-x-4">
        <button className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700">
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default Navbar;