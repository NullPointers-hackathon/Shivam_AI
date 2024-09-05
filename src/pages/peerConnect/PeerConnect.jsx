import React from "react";
import CreatePod from "../../components/specific/peerConnect/createPod/CreatePod";
import JoinPod from "../../components/specific/peerConnect/joinPod/JoinPod";
import StudyPods from "../../components/specific/peerConnect/studyPods/StudyPods";

export default function PeerConnect() {
  return (
    <div>
      PeerConnect
      <CreatePod />
      <JoinPod />
      <StudyPods />
    </div>
  );
}
