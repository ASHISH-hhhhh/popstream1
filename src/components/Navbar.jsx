import React from "react";
import logo from "../assets/logo.png";
import "../css_files/navbar.css";
import { CiClock2 } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { FaRegMoon } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/appSlice";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { SEARCH_SUGGESTIONS_API } from "../constants/popstream";
// import { setsearchSuggestion } from "../utils/appSlice";
import { setsearchSuggestion } from "../utils/suggestionSlice";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "./Modal";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { setlightMode } from "../utils/lightSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { setshowSide } from "../utils/toggleSice";

function Navbar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("v");
  const { searchSuggestion } = useSelector((store) => store.suggest);

  const { lightMode } = useSelector((store) => store.light);
  const [showModal, setshowModal] = useState(false);
  // const [lightMode, setlightMode] = useState(false);
  console.log(searchSuggestion);
  function searchInput() {
    if (input.length <= 0) {
      return alert("Enter Valid Search");
    }
    dispatch(setCategory(input));
    setInput("");
  }
  async function fetchSuggestion() {
    try {
      const res = await axios.get(SEARCH_SUGGESTIONS_API + input);
      console.log(res.data);
      dispatch(setsearchSuggestion(res.data[1])); // Update the search suggestions in the store
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("Calling use effect");
    const timer = setTimeout(() => {
      if (input.trim().length > 0) {
        fetchSuggestion();
      }
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/");
          toast.success("Logged Out Sucessfully");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      searchInput();
      navigate("/home");
    }
  }
  return (
    <div className="container">
      {showModal && <Modal onClose={() => setshowModal(false)} />}

      <div
        className="nav-pChild"
        // style={{ backgroundColor: lightMode ? "white" : "" }}
      >
        <div className="nav-logo">
          <div className="toogle-side-icon">
            <GiHamburgerMenu
              size={"22px"}
              onClick={() => dispatch(setshowSide())}
            />
          </div>
          <h2 className="pop-heading">Pop</h2>
          <img
            src={logo}
            alt=""
            className="colored-image"
            onClick={() => navigate("/Home")}
          />
          <h2 className="pop-heading">Stream</h2>
        </div>
        <div className="nav-icons">
          <CiClock2
            size={"25px"}
            onClick={() => setshowModal(true)}
            className="ni-size"
          />
          {/* <IoLanguageSharp size={"25px"} /> */}
          <IoIosLogOut size={"25px"} onClick={logoutFnc} className="ni-size" />
          <FaRegMoon
            size={"25px"}
            onClick={() => dispatch(setlightMode())}
            className="ni-size"
          />
        </div>
        <div className="nav-search-paren">
          {" "}
          <div className="nav-search">
            <input
              type="text"
              placeholder="Search"
              className="nav-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <FaSearch
              size={"25px"}
              className="nav-search-icon"
              onClick={searchInput}
            />
          </div>
          <div
            className="search-response"
            style={{
              display:
                searchSuggestion.length <= 0 || input == "" ? "none" : "",
            }}
          >
            <ul>
              {searchSuggestion &&
                searchSuggestion.map((item) => (
                  <li
                    key={uuidv4()}
                    onClick={() => {
                      setInput(item);
                      if (videoId) {
                        navigate("/Home");
                      }
                      setInput("");
                      return dispatch(setCategory(item));
                    }}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="nav-search1">
          <input
            type="text"
            placeholder="Search"
            className="nav-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {/* <FaSearch
          size={"25px"}
          className="nav-search-icon"
          onClick={searchInput}
        /> */}
        </div>
        <div
          className="search-response1 search-response"
          style={{
            display: searchSuggestion.length <= 0 || input == "" ? "none" : "",
          }}
        >
          <ul>
            {searchSuggestion &&
              searchSuggestion.map((item) => (
                <li
                  key={uuidv4()}
                  onClick={() => {
                    setInput(item);
                    if (videoId) {
                      navigate("/Home");
                    }
                    setInput("");
                    return dispatch(setCategory(item));
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
