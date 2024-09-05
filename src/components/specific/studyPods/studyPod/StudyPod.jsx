import React, { useState } from "react";
import "./StudyPod.css";
import AI from "../../../../assets/images/AIML.jpg";

export default function StudyPod({ Image = AI, Name, Desc, onClick }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="study-pod" onClick={onClick}>
      {loading && (
        <div className="loading-study-pods-cards">
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
      )}
      <img
        src={Image}
        alt="Study-Pods-Profile"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)} // Ensure loader hides if image fails to load
      />
      <h1>{Name}</h1>
      <p>{Desc}</p>
    </div>
  );
}
