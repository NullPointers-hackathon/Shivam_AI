import React, { useState } from "react";
import { db, storage } from "../../../../firebase";
import { collection, addDoc } from "firebase/firestore"; // Firestore modular import
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage modular imports

export default function CreatePod() {
  const [podName, setPodName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // Store the selected image file in state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!podName || !description) {
      setError("Pod name and description are required.");
      return;
    }

    if (!image) {
      setError("Please upload an image.");
      return;
    }

    setUploading(true);

    // Create a reference to the image in Firebase Storage
    const imageRef = ref(storage, `studyPods/${image.name}`);

    try {
      // Upload the image to Firebase Storage
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef); // Get the image URL after upload

      // Save the pod details in Firestore
      await addDoc(collection(db, "Study Pods"), {
        name: podName,
        description: description,
        imageUrl: imageUrl,
        createdAt: new Date(),
      });

      setSuccess("Study Pod created successfully!");
      setPodName("");
      setDescription("");
      setImage(null);
      setError("");
    } catch (err) {
      setError("Failed to create Study Pod. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Create a New Study Pod</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="podName">Pod Name:</label>
          <input
            type="text"
            id="podName"
            value={podName}
            onChange={(e) => setPodName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "Creating..." : "Create Pod"}
        </button>
      </form>
    </div>
  );
}
