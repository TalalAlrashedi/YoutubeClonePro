import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const API_KEY = "AIzaSyACFPooZgJxYigXMt1dYcmjqcr17cQy7Kw";

  const getVideos = async (searchQuery) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${API_KEY}&maxResults=10`
      );
      setVideos(res.data.items);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      getVideos();
    }
  }, []);

  const searchFunc = (e) => {
    e.preventDefault();
    getVideos(search);
  };

  return (
    <>
      <Navbar />

      <div className="mt-16 bg-[#0f0f0f] text-white min-h-screen px-6 py-4">
        <form
          onSubmit={searchFunc}
          className="mb-6 flex gap-2 max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="ابحث عن فيديو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 bg-[#121212] text-white border border-gray-700 rounded-md"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            بحث
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              onClick={() => navigate(`/detail/${video.id.videoId}`)}
              className="cursor-pointer hover:scale-[1.03] transition-all duration-200"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                className="w-full rounded-lg"
              />
              <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                {video.snippet.title}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {video.snippet.channelTitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
