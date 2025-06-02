import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_KEY = "AIzaSyACFPooZgJxYigXMt1dYcmjqcr17cQy7Kw";

const Details = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const getVideoDetails = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`
      );
      setVideo(res.data.items[0]);
    } catch (err) {
      console.error("Error fetching video details:", err);
    }
  };

  const getRelatedVideos = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=10&key=${API_KEY}`
      );
      setRelatedVideos(res.data.items);
    } catch (err) {
      console.error("Error fetching related videos:", err);
    }
  };

  useEffect(() => {
    getVideoDetails();
    getRelatedVideos();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="mt-16 bg-[#0f0f0f] text-white min-h-screen px-4 md:px-10 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4 overflow-y-auto max-h-[80vh]">
            <h3 className="text-lg font-semibold mb-4">فيديوهات مقترحة</h3>
            <div className="space-y-4">
              {relatedVideos.map((vid) => {
                const videoId = vid.id?.videoId || vid.id;
                return (
                  <Link
                    to={`/details/${videoId}`}
                    key={videoId}
                    className="flex items-start gap-3 hover:bg-[#1f1f1f] p-2 rounded-md transition"
                  >
                    <img
                      src={vid.snippet.thumbnails.medium.url}
                      alt={vid.snippet.title}
                      className="w-32 rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{vid.snippet.title}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {vid.snippet.channelTitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            {video ? (
              <>
                <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${id}`}
                    allowFullScreen
                    title={video.snippet.title}
                  ></iframe>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {video.snippet.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {video.snippet.channelTitle}
                </p>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {video.snippet.description}
                </p>
              </>
            ) : (
              <p>...جاري تحميل الفيديو</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
