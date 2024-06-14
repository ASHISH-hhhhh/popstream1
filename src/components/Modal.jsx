import React, { useEffect, useState } from "react";
import "../css_files/modal.css";
import { MdCancel } from "react-icons/md";
import { useRef } from "react";
function Modal({ onClose }) {
  const modalRef = useRef();
  function closeModal(e) {
    if (modalRef.current === e.target) {
      onClose();
    }
  }
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interTime = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interTime);
  }, []);
  //   console.log(typeof date.Date);
  return (
    <div className="overlay" ref={modalRef} onClick={closeModal}>
      <div className="md-portal wavy-background">
        <MdCancel size={"25px"} onClick={onClose} className="cancelIcon" />
        <p className="text-td" style={{ color: "#ff1493" }}>
          Date
        </p>
        <p className="text-td cl">{date.toLocaleDateString()}</p>
        <p className="text-td" style={{ color: "#ff1493" }}>
          Time
        </p>
        <p className="text-td cl">{date.toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default Modal;
