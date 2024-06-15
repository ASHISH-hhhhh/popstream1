import React from "react";
import "../css_files/sidebar.css";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { CiTimer } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/appSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { useEffect } from "react";
import { setsavedVideos } from "../utils/savedSlice";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { setshowSide } from "../utils/toggleSice";

function Sidebar() {
  const { savedVideos } = useSelector((store) => store.saved);
  const { show } = useSelector((store) => store.toggle);
  const [user] = useAuthState(auth);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const categoriesArr = [
    "All",
    "Music",
    "Vlogs",
    "Trending",
    "CSS",
    "JavaScript",
    "React Js",
    "Programming",
    "DSA",
    "Russia",
    "RTK Query",
    "Redux",
    "React Router",
  ];

  const [active, setActive] = useState("All");
  const dispatch = useDispatch();

  function vidByCategories(catName) {
    if (active != catName) {
      setActive(catName);
    }
    dispatch(setCategory(catName));
  }
  async function fetchLikedVFB() {
    // setLoading(true);
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
      toast.success("Fetching Playlist");
    }
    // setLoading(false);
  }
  async function deleteLikedVideo(documentId) {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/likedvideos`, documentId));
      toast.success("Video removed  successfully");
      fetchLikedVFB(); // Fetch the updated list after deletion
    } catch (error) {
      console.error("Error removing document: ", error);
      toast.error("Failed to remove element");
    }
  }
  // async function fetchLikedVFB1() {
  //   // setLoading(true);
  //   if (user) {
  //     const q = query(collection(db, `users/${user.uid}/likedvideos`));
  //     const querySnapshot = await getDocs(q);

  //     let tempLVFB = [];
  //     querySnapshot.forEach((doc) => {
  //       const withDocId = doc.data();
  //       withDocId.documentId = doc.id;
  //       tempLVFB.push(withDocId);
  //     });
  //     // dispatch(setsavedVideos(tempLVFB));
  //     toast.success("Fetching Playlist");
  //   }
  //   // setLoading(false);
  // }
  useEffect(() => {
    fetchLikedVFB();
  }, [user]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const sidebarStyles = {
    display: windowWidth <= 650 && show ? "none" : "",
  };

  return (
    <div className="sidebar-div" style={sidebarStyles}>
      <div className="sidebar-home-icon-div">
        <IoHomeOutline size={"25px"} /> Home
      </div>
      <hr className="hr" />
      <div className="sidebar-icte-div">
        {" "}
        <BiCategory size={"25px"} />
        <h4 className="cat-head">Categories</h4>
      </div>

      <div className="sidebar-categories">
        {categoriesArr.map((categaory) => (
          <div
            style={{
              backgroundColor: active == categaory ? "#ff1493" : "",
            }}
            className="sidebar-category-list"
            key={uuidv4()}
            onClick={() => {
              vidByCategories(categaory);
              dispatch(setshowSide());
            }}
          >
            {categaory}{" "}
          </div>
        ))}
      </div>
      <hr className="hr" />
      <div className="sidebar-icte-div">
        <CiTimer size={"25px"} className="timer-icon" />
        <h4 className="cat-head">Watch Later </h4>
      </div>

      <div className="watch-later-parent-div">
        {" "}
        {savedVideos.map((objVid) => (
          <div className="single-watch-vid" key={uuidv4()}>
            {/* <p>{objVid.id}</p> */}
            <Link to={`/watch/?v=${objVid.id}`} className="watchlater-Link">
              {" "}
              <p className="watchlater-Link-para">{objVid.name}...</p>
            </Link>
            <div className="dt-parent">
              <TiDelete
                size={"22px"}
                color="black"
                onClick={() => deleteLikedVideo(objVid.documentId)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// export { fetchLikedVFB };
export default Sidebar;
