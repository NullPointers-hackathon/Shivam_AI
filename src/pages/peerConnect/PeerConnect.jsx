import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase"; // Adjust the import path based on your Firebase initialization file
import { useLocation } from "react-router-dom"; // Import useLocation
import Header from "../../components/common/header/Header";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/titleSlice";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore

export default function PeerConnect() {
  const location = useLocation();
  const { id } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(""); // Store user name
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const db = getDatabase(app);
  const auth = getAuth();
  const firestore = getFirestore(app);

  useEffect(() => {
    dispatch(setTitle("Peer Connect")); // Set the page title
  }, [dispatch]);

  // Fetch the logged-in user's ID and name
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserID(user.uid);
        setUserName(user.displayName || "Anonymous"); // Get the display name from Firebase Auth

        // If the display name is not available, fetch it from Firestore (if applicable)
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

  // Fetch messages for the pod
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

      return () => unsubscribe();
    }
  }, [db, id]);

  // Handle sending new message
  const handleSendMessage = async () => {
    if (!userID || !newMessage.trim()) {
      setError("Please log in and enter a message.");
      return;
    }

    try {
      const messagesRef = ref(db, `StudyPods/${id}/messages`);
      await push(messagesRef, {
        userID,
        userName, // Include the user's name
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
        <div>
          <div>
            {messages.map((msg) => (
              <div key={msg.id}>
                <strong>{msg.userName}:</strong> {msg.text}{" "}
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
    </>
  );
}
