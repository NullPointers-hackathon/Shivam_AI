import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { useLocation } from "react-router-dom";
import Header from "../../components/common/header/Header";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/titleSlice";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./peerConnect.css";
import { IoSend } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export default function PeerConnect() {
  const location = useLocation();
  const { id } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const db = getDatabase(app);
  const auth = getAuth();
  const firestore = getFirestore(app);

  useEffect(() => {
    dispatch(setTitle("Peer Connect"));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserID(user.uid);
        setUserName(user.displayName || "Anonymous");

        if (!user.displayName) {
          try {
            const userRef = doc(firestore, "Users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              setUserName(userData.name || "Anonymous");
            }
          } catch (err) {
            console.error("Error fetching user data:", err);
          }
        }
      } else {
        setError("You need to log in first.");
      }
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  useEffect(() => {
    if (id) {
      const messagesRef = ref(db, `StudyPods/${id}/messages`);

      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const loadedMessages = data
          ? Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value,
            }))
          : [];
        setMessages(loadedMessages);
      });

      return () => unsubscribe();
    }
  }, [db, id]);

  const handleSendMessage = async () => {
    if (!userID || !newMessage.trim()) {
      setError("Please log in and enter a message.");
      return;
    }

    try {
      const messagesRef = ref(db, `StudyPods/${id}/messages`);
      await push(messagesRef, {
        userID,
        userName,
        text: newMessage,
        timestamp: new Date().toISOString(),
      });
      setNewMessage("");
      setError("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send the message. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="peer-connect-container">
          <div className="peer-connect-inner-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`peer-connect-message ${
                  msg.userID === userID ? "peer-connect-message-self" : ""
                }`}
              >
                {/* Render user icon for messages from other users */}
                {msg.userID !== userID && (
                  <FaUserCircle
                    className="peer-connect-message-icon"
                    style={{ marginRight: "1rem" }}
                  />
                )}

                <div className="peer-connect-message-all-container">
                  <strong
                    className={`peer-connect-username ${
                      msg.userID === userID
                        ? "peer-connect-message-self-username"
                        : ""
                    }`}
                  >
                    {msg.userName}
                  </strong>

                  <div className="peer-connect-message-bubble">
                    <span>{msg.text}</span>
                  </div>
                  <div className="peer-connect-message-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                {/* Render user icon for messages from the current user */}
                {msg.userID === userID && (
                  <FaUserCircle className="peer-connect-message-icon" />
                )}
              </div>
            ))}
          </div>

          <div className="peer-connect-input-container">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="peer-connect-text"
            />
            <IoSend className="peer-connect-send" onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </>
  );
}
