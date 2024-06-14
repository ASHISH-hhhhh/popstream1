import React from "react";
import "../css_files/videocart.css";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setsavedVideos } from "../utils/savedSlice";
import { Link } from "react-router-dom";
function VideoCart({ item }) {
  const { savedVideos } = useSelector((store) => store.saved);
  const { lightMode } = useSelector((store) => store.light);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function likedVid(item) {
    if (item) {
      const isLiked = savedVideos.some(
        (likedVDO) => likedVDO.id === item.id.videoId
      );
      if (!isLiked) {
        const likedVideoInfoDoc = {
          id: item.id.videoId,
          name: item?.snippet?.title?.slice(0, 10),
        };
        addLikedVideoInfoDoc(likedVideoInfoDoc);
      } else {
        toast.info("Video already liked");
      }
    }
  }
  async function addLikedVideoInfoDoc(likedVideoInfoDoc) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/likedvideos`),
        likedVideoInfoDoc
      );

      // toast.success("Doc Created");
      fetchLikedVFB();
    } catch (error) {
      console.log(error);
      toast.error("Doc not created");
    }
  }
  async function fetchLikedVFB() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/likedvideos`));
      const querySnapshot = await getDocs(q);

      let tempLVFB = [];
      querySnapshot.forEach((doc) => {
        const withDocId = doc.data();
        withDocId.documentId = doc.id;
        tempLVFB.push(withDocId);
      });
      dispatch(setsavedVideos(tempLVFB));
      toast.success("Added to Watch List");
    }
    setLoading(false);
  }
  console.log(savedVideos);
  return (
    <div
      className="vCart-parent-div"
      style={{ backgroundColor: lightMode ? "white" : "" }}
    >
      <div className="vCart-first-div">
        {" "}
        <Link
          to={`/watch/?v=${
            typeof item.id === "object" ? item.id.videoId : item.id
          }`}
        >
          <img
            src={item?.snippet?.thumbnails?.medium?.url}
            alt="thumbnail-photo"
            className="vCart-thum-img"
          />
        </Link>
        <div
          className="vCart-vidinfo"
          style={{ color: lightMode ? "black" : "" }}
        >
          <h4 className="pub-heading">Published At :</h4>
          <h4 style={{ color: "#ff1493" }} className="pub-date">
            {item?.snippet?.publishedAt}{" "}
          </h4>
          <button onClick={() => likedVid(item)} className="btn-watch-later">
            Watch Later
          </button>
        </div>
      </div>
      <div className="vCart-second-div">
        <div style={{ color: lightMode ? "black" : "" }}>
          <Link
            to={`/watch/?v=${
              typeof item.id === "object" ? item.id.videoId : item.id
            }`}
            className="link-to-watch"
          >
            {" "}
            <h4 style={{ color: lightMode ? "black" : "" }} className="vid-tit">
              {item?.snippet?.title?.slice(0, 70)}
            </h4>
          </Link>

          <h4 className="vCart-video-title">
            Channel Name :{" "}
            <span className="vCart-color-span">
              {item?.snippet?.channelTitle}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default VideoCart;
