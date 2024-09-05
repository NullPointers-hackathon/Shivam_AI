import React, { useEffect, useState } from "react";
import "./StudyPods.css";
import { useNavigate } from "react-router-dom";
import StudyPod from "../../components/specific/studyPods/studyPod/StudyPod";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/titleSlice";
import Header from "../../components/common/header/Header";

export default function StudyPods() {
  const [pods, setPods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle("Study Pods")); //use the title u need
  }, [dispatch]);
  useEffect(() => {
    const fetchPods = async () => {
      try {
        const podsCollection = collection(db, "Study Pods");
        const podsSnapshot = await getDocs(podsCollection);
        const podsList = podsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          count: doc.data().members
            ? Object.keys(doc.data().members).length
            : 0,
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

  const handlePodClick = (pod) => {
    navigate(`/study-pods/${pod.id}`, { state: pod });
  };

  if (loading) {
    return (
      <div className="loading-study-pods">
        <div class="honeycomb">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <Header />

      <div className="study-pods">
        {pods.map((pod) => (
          <StudyPod
            key={pod.id}
            Image={pod.imageUrl}
            Name={pod.name}
            Desc={pod.description}
            onClick={() => handlePodClick(pod)}
          />
        ))}
      </div>
    </>
  );
}
