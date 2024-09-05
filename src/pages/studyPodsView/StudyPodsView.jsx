import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/common/header/Header";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./StudyPodsView.css";
import { db } from "../../firebase";
export default function StudyPodsView() {
  const location = useLocation();
  const { name, count, description, imageUrl, id } = location.state || {};
  const [isMember, setIsMember] = useState(false);
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
        checkIfUserJoined(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkIfUserJoined = async (uid) => {
    try {
      const podRef = doc(getFirestore(), "Study Pods", id);
      const podSnap = await getDoc(podRef);

      if (podSnap.exists()) {
        const podData = podSnap.data();
        const members = podData.members || {};
        console.log("Members:", members);
        setIsMember(!!members[uid]);
      }
    } catch (error) {
      console.error("Error checking membership:", error);
    }
  };

  const handleJoinPod = async () => {
    if (!userID) {
      setError("You need to log in first.");
      return;
    }

    try {
      const podRef = doc(db, "Study Pods", id);

      const podSnap = await getDoc(podRef);
      const podData = podSnap.exists() ? podSnap.data() : null;
      const updatedMembers = podData?.members
        ? { ...podData.members, [userID]: userID }
        : { [userID]: userID };

      await updateDoc(podRef, {
        members: updatedMembers,
      });

      setError("");
      setIsMember(true);
      console.log("User joined successfully");
    } catch (err) {
      console.error("Error joining pod:", err);
      setError("Failed to join the pod. Please try again.");
    }
  };

  const handleButtonClick = () => {
    if (isMember) {
      // Redirect to chat or open the chat interface
      navigate("/peer-connect", { state: { id } });
    } else {
      handleJoinPod();
    }
  };

  return (
    <>
      <Header />
      <div className="study-pods-view-outer">
        <div className="study-pods-view">
          <div className="study-pods-view-inner">
            <img src={imageUrl} alt="" />
            <h1>{name}</h1>
            <h3>{count} Members</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleButtonClick} disabled={!userID}>
              {isMember ? "Chat now" : "Join now"}
            </button>
          </div>
        </div>
        <hr
          style={{
            border: "none",
            height: "2px",
            backgroundColor: "#777779",
            margin: "20px 0",
          }}
        />
        <div className="study-pods-view-second-container">
          <h1>Description:</h1>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
