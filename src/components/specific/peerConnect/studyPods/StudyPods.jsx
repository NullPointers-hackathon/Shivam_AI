import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import JoinPod from "../joinPod/JoinPod";

export default function StudyPods() {
  const [pods, setPods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the list of Study Pods from Firestore
  useEffect(() => {
    const fetchPods = async () => {
      try {
        const podsCollection = collection(db, "Study Pods");
        const podsSnapshot = await getDocs(podsCollection);
        const podsList = podsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPods(podsList);
      } catch (err) {
        console.error("Error fetching pods:", err);
        setError("Failed to load study pods.");
      } finally {
        setLoading(false);
      }
    };

    fetchPods();
  }, []);

  if (loading) {
    return <p>Loading Study Pods...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Study Pods</h1>
      {pods.length === 0 ? (
        <p>No study pods available at the moment.</p>
      ) : (
        <ul>
          {pods.map((pod) => (
            <li key={pod.id} style={{ marginBottom: "1rem" }}>
              <h3>{pod.name}</h3>
              <p>{pod.description}</p>
              {/* Pass the pod ID to the JoinPod component */}
              <JoinPod podId={pod.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
