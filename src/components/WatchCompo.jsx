import React from "react";
import "../css_files/watch.css";
import { useState, useEffect } from "react";
import { API_KEY } from "../constants/popstream";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function WatchCompo() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("v");
  const [videoInfo, setvideoInfo] = useState("");
  const { lightMode } = useSelector((store) => store.light);

  async function fetchSingleVideoInfo() {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      setvideoInfo(res?.data?.items[0]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchSingleVideoInfo();
  }, []);
  console.log(videoInfo);
  return (
    <>
      <div className="leri container">
        <div
          className="watchCont"
          style={{ backgroundColor: lightMode ? "white" : "" }}
        >
          {" "}
          <div className="iFrameParent">
            <iframe
              width={"100%"}
              height="470"
              className="iframWatch"
              src={`https://www.youtube.com/embed/${videoId}?&autoplay=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="vid-infodiv-watch">
              <div className="btp_par">
                <p
                  className="watch-videotitle"
                  style={{ color: lightMode ? "black" : "" }}
                >
                  {videoInfo?.snippet?.title}
                </p>
                <Link to="/home" className="BTP">
                  <p className="btp"> Back To Home Page</p>
                </Link>
              </div>

              <div
                className="watch-vhissue"
                style={{ color: lightMode ? "black" : "" }}
              >
                <div className="watch-titlediv cswatchMD ">
                  <h4 style={{ textAlign: "center" }}>Channel Name</h4>
                  <p className="vid-channel-name-watch cswatch">
                    {videoInfo?.snippet?.channelTitle.slice(0, 15)}
                  </p>
                </div>
                <div className="watch-likesdiv cswatchMD ">
                  <h4 style={{ textAlign: "center" }}>Likes</h4>
                  <p className="cswatch">
                    <AiOutlineLike size={"20px"} /> :
                    <span>{videoInfo?.statistics?.likeCount}</span>
                  </p>
                </div>
                <div className="watch-commentdiv cswatchMD ">
                  <h4 style={{ textAlign: "center" }}>Comments</h4>
                  <p className="cswatch">
                    <FaRegCommentDots size={"20px"} />:
                    <span>{videoInfo?.statistics?.commentCount}</span>
                  </p>
                </div>
                <div className="watch-viewdiv cswatchMD ">
                  <h4 style={{ textAlign: "center" }}>Views</h4>
                  <p className="cswatch">
                    <FaRegEye size={"20px"} />:
                    <span>{videoInfo?.statistics?.viewCount}</span>
                  </p>
                </div>
                <div className="watch-downloaddiv cswatchMD ">
                  <h4 style={{ textAlign: "center" }}>Download</h4>
                  <p className="cswatch">
                    <IoCloudDownloadOutline size={"20px"} />:
                    <span>
                      <a
                        href={`https://www.ssyoutube.com/watch?v=${videoId}`}
                        target="_blank"
                      >
                        Link
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WatchCompo;
