import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setsavedVideos } from "./savedSlice";

const useFetchLikedVFB = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikedVideos = async () => {
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
        toast.success("Transactions Fetched!");
      }
      setLoading(false);
    };

    fetchLikedVideos();
  }, [user, dispatch]);

  return loading;
};

export default useFetchLikedVFB;
