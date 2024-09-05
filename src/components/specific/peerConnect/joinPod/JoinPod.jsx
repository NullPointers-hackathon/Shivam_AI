import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

export default function JoinPod({ podId }) {
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState("");

  // Fetch the current logged-in user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid); // Set the user ID when logged in
      }
    });

    // Cleanup the listener
    return () => unsubscribe();
  }, []);

  const handleJoinPod = async () => {
    if (!userID) {
      setError("You need to log in first.");
      return;
    }

    try {
      // Get the pod document reference
      const podRef = doc(db, "Study Pods", podId);

      // Get the current pod data to avoid overwriting existing members
      const podSnap = await getDoc(podRef);
      const podData = podSnap.exists() ? podSnap.data() : null;

      // Initialize members object if it doesn't exist, else update it
      const updatedMembers = podData?.members
        ? JSON.stringify({ ...podData.members, [userID]: true })
        : { [userID]: true };

      // Update the Firestore document with the new member
      await updateDoc(podRef, {
        members: updatedMembers,
      });

      setError(""); // Clear any errors if successful
      console.log("User joined successfully");
    } catch (err) {
      console.error("Error joining pod:", err);
      setError("Failed to join the pod. Please try again.");
    }
  };

  return (
    <div>
      <h2>Join Study Pod</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleJoinPod} disabled={!userID}>
        Join Pod
      </button>
    </div>
  );
}
