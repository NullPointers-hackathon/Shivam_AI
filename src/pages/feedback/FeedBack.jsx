import React, { useState } from 'react';
import './feedback.css'; // Import the CSS file
import { auth, db } from '../../firebase'; // Import Firestore instance
import { doc, setDoc } from 'firebase/firestore';

const FeedBack = () => {
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Access the currently logged-in user
      const user = auth.currentUser;

      if (user) {
        // Save feedback and rating to Firestore using userId (uid) as the document ID
        await setDoc(doc(db, 'feedbacks', user.uid), {
          rating: rating,
          feedback: feedback,
          timestamp: new Date(), // Store the time of submission
        });

        alert(`Feedback submitted! Rating: ${rating}/5\nFeedback: ${feedback}`);
        setFeedback(''); // Reset the feedback field
        setRating(4);    // Reset rating to default
      } else {
        alert('User not authenticated');
      }
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-form-container">
      <h2 className="feedback-form-heading">Session feedback</h2>
      <p className="feedback-form-text">Please rate your experience below</p>
      <div className="feedback-form-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingClick(star)}
            className={star <= rating ? 'feedback-form-star active' : 'feedback-form-star'}
          >
            ★
          </span>
        ))}
      </div>
      <p>{rating}/5 stars</p>
      <form onSubmit={handleSubmit} className="feedback-form">
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Additional feedback"
          className="feedback-form-textarea"
        />
        <button type="submit" className="feedback-form-button">Submit feedback</button>
      </form>
    </div>
  );
};

export default FeedBack;
