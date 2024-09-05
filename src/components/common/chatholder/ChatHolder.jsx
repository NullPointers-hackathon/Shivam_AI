import React from 'react';
import './style.css'; 

const ChatHolder = () => {
  return (
    <div className="chat-holder">
      <div className="chat-header">
        <div className="icon-container">
          <i className="download-icon">⬇</i>
        </div>
        <div className="profile-icon">A</div>
      </div>
      <div className="chat-body">
      </div>
    </div>
  );
};

export default ChatHolder;
