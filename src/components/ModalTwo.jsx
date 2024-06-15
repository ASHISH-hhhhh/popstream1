import React from "react";
import "../css_files/modaltwo.css";
import { MdCancel } from "react-icons/md";
import { useRef } from "react";
function ModalTwo({ onClose }) {
  const modalRef = useRef();
  function closeModal(e) {
    if (modalRef.current === e.target) {
      onClose();
    }
  }
  return (
    <div className="overlay" ref={modalRef} onClick={closeModal}>
      <div className="md-portal2 ">
        <MdCancel size={"25px"} onClick={onClose} className="cancelIcon" />
        <h2 className="text-td">Important Note:</h2>
        <p className="note">
          Since I'm using the free version of the Google YouTube Data API v3, it
          is limited to 10,000 query requests per day. Therefore, if videos are
          not appearing, it's likely due to reaching this quota limit and not an
          error or bug on my end.{" "}
        </p>
      </div>
    </div>
  );
}

export default ModalTwo;
