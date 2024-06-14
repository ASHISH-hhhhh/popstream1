import React, { useState } from "react";
import "../css_files/videocontainer.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import VideoCart from "./VideoCart";
import { Link } from "react-router-dom";
import { API_KEY } from "../constants/popstream";
import { useDispatch } from "react-redux";
import { setHomeVideo } from "../utils/appSlice";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import HashLoader from "react-spinners/HashLoader";
function VideoContainer() {
  const { video, category } = useSelector((store) => store.apps);
  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();

  async function fetchVideoByCategory() {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=${API_KEY}`
      );
      dispatch(setHomeVideo(res?.data?.items));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchVideoByCategory();
  }, [category]);

  console.log(video);

  return (
    <>
      <Sidebar />
      {loading ? (
        <HashLoader color="#ff1493" size={120} className="loader" />
      ) : (
        <div className="vc-Parent-div">
          {video &&
            video.map((item) => <VideoCart item={item} key={uuidv4()} />)}
        </div>
      )}
    </>
  );
}

export default VideoContainer;
// https://www.googleapis.com/youtube/v3
