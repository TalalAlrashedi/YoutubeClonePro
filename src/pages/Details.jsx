import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const API_KEY = "AIzaSyAeFwiOuxYRHT9-yGP6Sd0npb4KRc_29mE";

const Details = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [homeVideos, setHomeVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [likes, setLikes] = useState(0);

  const getVideoDetails = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
      );
      const videoData = res.data.items[0];
      setVideo(videoData);
      setLikes(videoData.statistics?.likeCount ? Number(videoData.statistics.likeCount) : 0);
    } catch (err) {
      console.error("Error fetching video details:", err);
    }
  };

  const getHomeVideos = async () => {
    try {
      const searchRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=trending&key=${API_KEY}&maxResults=10&type=video&videoEmbeddable=true`
      );
      setHomeVideos(searchRes.data.items);
    } catch (err) {
      console.error("Error fetching home videos:", err);
    }
  };

  useEffect(() => {
    getVideoDetails();
    getHomeVideos();
  }, [id]);

  const addComment = () => {
    if (commentInput.trim() === "") return;
    setComments([...comments, commentInput.trim()]);
    setCommentInput("");
  };

  return (
    <>
      <Navbar />
      <div className="mt-16 bg-[#0f0f0f] text-white min-h-screen px-4 md:px-10 py-6">
        <div className="flex flex-col lg:flex-row-reverse gap-8">
          <div className="w-full lg:w-3/4">
            {video ? (
              <>
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${id}`}
                    allowFullScreen
                    title={video.snippet.title}
                  ></iframe>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.channelTitle}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h3 className="text-lg font-semibold">{video.snippet.channelTitle}</h3>
                </div>

                <h2 className="text-2xl font-semibold mb-2">{video.snippet.title}</h2>

                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-lg text-gray-700 cursor-default select-none">
                    <FaThumbsUp />
                    <span>{likes.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-lg text-gray-700 cursor-default select-none">
                    <FaThumbsDown />
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-6">
                  {video.snippet.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-3">التعليقات</h4>
                  <textarea
                    className="w-full p-3 rounded-md bg-[#1f1f1f] text-white resize-none"
                    rows={4}
                    placeholder="أضف تعليقك هنا..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  ></textarea>
                  <button
                    onClick={addComment}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded-md"
                  >
                    أضف تعليق
                  </button>

                  <div className="mt-6 space-y-4 max-h-60 overflow-y-auto">
                    {comments.length === 0 ? (
                      <p className="text-gray-400">لا توجد تعليقات بعد</p>
                    ) : (
                      comments.map((cmt, index) => (
                        <div
                          key={index}
                          className="bg-[#222] p-3 rounded-md break-words whitespace-pre-wrap"
                        >
                          {cmt}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p>...جاري تحميل الفيديو</p>
            )}
          </div>

          <div className="w-full lg:w-1/4 overflow-y-auto max-h-[80vh]">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              الفيديوهات من الصفحة الرئيسية
            </h3>
            <div className="space-y-4">
              {homeVideos.length === 0 ? (
                <p className="text-gray-400">لا توجد فيديوهات حالياً</p>
              ) : (
                homeVideos
                  .filter((vid) => vid.id?.videoId && vid.snippet)
                  .map((vid) => {
                    const videoId = vid.id.videoId;
                    return (
                      <Link
                        to={`/detail/${videoId}`}
                        key={videoId}
                        className="flex items-start gap-3 hover:bg-[#1f1f1f] p-2 rounded-md transition"
                      >
                        <img
                          src={vid.snippet.thumbnails.medium.url}
                          alt={vid.snippet.title}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-2">{vid.snippet.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{vid.snippet.channelTitle}</p>
                        </div>
                      </Link>
                    );
                  })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;