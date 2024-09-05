import React, { useEffect, useState } from "react";
import "./StudyPods.css";
import StudyPod from "../../components/specific/studyPods/studyPod/StudyPod";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function StudyPods() {
  const [pods, setPods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="study-pods">
      {pods.map((pod) => (
        <StudyPod
          key={pod.id}
          Image={pod.imageUrl}
          Name={pod.name}
          Desc={pod.description}
        />
      ))}
    </div>
  );
}
