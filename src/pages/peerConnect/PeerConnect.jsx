import React from "react";
import CreatePod from "../../components/specific/peerConnect/createPod/CreatePod";
import JoinPod from "../../components/specific/peerConnect/joinPod/JoinPod";
import StudyPods from "../../components/specific/peerConnect/studyPods/StudyPods";
import PeerConnector from "../../components/specific/peerConnect/peerConnect/PeerConnect";

export default function PeerConnect() {
  return (
    <>
      PeerConnect
      <CreatePod />
      <JoinPod />
      <StudyPods />
      <PeerConnector podId="aDSKLQv4eAOfLHzAwfME" />
    </>
  );
}
