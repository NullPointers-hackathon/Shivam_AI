import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase"; // Adjust the import path based on your Firebase initialization file
import { useLocation } from "react-router-dom"; // Import useLocation

export default function PeerConnect() {
  const location = useLocation();
  const { id } = location.state || {}; // Retrieve id from state

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState("");

  const db = getDatabase(app);
  const auth = getAuth();

  useEffect(() => {
    // Fetch logged-in user ID
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setError("You need to log in first.");
      }
    });

    // Cleanup the auth listener
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (id) {
      const messagesRef = ref(db, `StudyPods/${id}/messages`);

      // Listen for new messages
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

      // Cleanup the RTDB listener
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
    <div>
      <h2>Peer Connect - Group Chat</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <div>
          {messages.map((msg) => (
            <div key={msg.id}>
              <strong>User {msg.userID}:</strong> {msg.text}{" "}
              <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
            </div>
          ))}
        </div>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
