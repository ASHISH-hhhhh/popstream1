// import React from "react";
// import ChatMessage from "./ChatMessage";
// import "../css_files/livechat.css";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getRandomUsername } from "../utils/helper";
// import { getRandomChatMessage } from "../utils/helper";
// import { setMessage } from "../utils/chatSlice";

// function LiveChat() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const intervalMSG = setInterval(() => {
//       dispatch(
//         setMessage({
//           name: getRandomUsername(),
//           chatMsg: getRandomChatMessage(),
//         })
//       );
//     }, 1000);
//     return () => {
//       clearInterval(intervalMSG);
//     };
//   }, []);
//   const messagesMine = useSelector((state) => state.chat.message);
//   return (
//     <div>
//       {messagesMine && messagesMine.map((item) => <ChatMessage item={item} />)}
//     </div>
//   );
// }

// export default LiveChat;
