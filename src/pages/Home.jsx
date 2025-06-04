import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const API_KEY = "AIzaSyBM8EqTfxpbMKiudVnazUrOT7tgpl8Ri6A";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchPopularVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "snippet,statistics",
          chart: "mostPopular",
          maxResults: 12,
          key: API_KEY,
        },
      });
      setVideos(res.data.items);
    } catch (error) {
      console.error("خطأ في جلب الفيديوهات:", error);
    }
  };

  const fetchSearchedVideos = async (query) => {
    try {
      const res = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: "snippet",
          q: query,
          maxResults: 12,
          type: "video",
          key: API_KEY,
        },
      });
      setVideos(res.data.items);
    } catch (error) {
      console.error("خطأ في البحث عن الفيديوهات:", error);
    }
  };

  useEffect(() => {
    fetchPopularVideos();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      fetchPopularVideos();
    } else {
      fetchSearchedVideos(query);
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white pt-16">
      <Navbar onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => {
          const videoId = video.id.videoId || video.id;
          const snippet = video.snippet;
          return (
            <div
              key={videoId}
              className="bg-[#202020] rounded-lg overflow-hidden cursor-pointer hover:bg-[#383838]"
              onClick={() => navigate(`/detail/${videoId}`)}
            >
              <img
                src={snippet.thumbnails.high.url}
                alt={snippet.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold mb-1">{snippet.title}</h3>
                <p className="text-xs text-gray-400">{snippet.channelTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
