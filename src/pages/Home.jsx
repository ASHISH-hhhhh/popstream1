import React from "react";
import VideoContainer from "../components/VideoContainer";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="leri container">
        <VideoContainer />
      </div>
    </div>
  );
}

export default Home;
