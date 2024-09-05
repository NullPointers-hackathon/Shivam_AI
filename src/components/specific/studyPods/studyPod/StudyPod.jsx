import React from "react";
import "./StudyPod.css";
import AI from "../../../../assets/images/AIML.jpg";
export default function StudyPod({ Image, Name, Desc }) {
  return (
    <div className="study-pod">
      <img src={Image} alt="Study-Pods-Profile" />
      <h1>{Name}</h1>
      <p>{Desc}</p>
    </div>
  );
}
