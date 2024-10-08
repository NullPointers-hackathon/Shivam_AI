import React, { useState } from "react";
import { db, storage } from "../../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./createpod.css";

export default function CreatePod() {
  const [podName, setPodName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    console.log("File input change event triggered");
    if (e.target.files[0]) {
      console.log("Image selected");
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    if (!podName || !description) {
      setError("Pod name and description are required.");
      return;
    }

    if (!image) {
      setError("Please upload an image.");
      return;
    }

    setUploading(true);

    const imageRef = ref(storage, `studyPods/${image.name}`);

    try {
      console.log("Uploading image...");
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded and URL retrieved");

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
      setImagePreview(null);
      setError("");
    } catch (err) {
      console.error("Error creating Study Pod:", err);
      setError("Failed to create Study Pod. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="create-pod-header">Create a New Study Pod</h2>
      {error && <p className="create-pod-error">{error}</p>}
      {success && <p className="create-pod-success">{success}</p>}
      <form className="create-pod-form" onSubmit={handleSubmit}>
        <div>
          <label className="create-pod-label" htmlFor="image">
            Upload Image:
          </label>
          <div
            className="create-pod-image-upload"
            onClick={() => document.getElementById("image").click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image preview"
                className="create-pod-image-preview"
              />
            ) : (
              <span className="create-pod-file-input-label">+</span>
            )}
            <input
              type="file"
              id="image"
              className="create-pod-file-input"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div>
          <label className="create-pod-label" htmlFor="podName">
            Name:
          </label>
          <input
            type="text"
            id="podName"
            className="create-pod-input"
            value={podName}
            onChange={(e) => setPodName(e.target.value)}
          />
        </div>
        <div>
          <label className="create-pod-label" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            className="create-pod-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="create-pod-button"
          disabled={uploading}
        >
          {uploading ? "Creating..." : "Create Pod"}
        </button>
      </form>
    </div>
  );
}
