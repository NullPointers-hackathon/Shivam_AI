import React from "react";
import "./style.css"; 
import Shivam_logo from "../../../../assets/images/Shivam_logo.png"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-header">
        <img src={Shivam_logo} alt="Logo" className="navbar-logo-image" />
        <div className="navbar-logo">SHIVAM</div>
      </div>
      <div className="navbar-search-box">
        <input type="text" placeholder="Search....." />
      </div>
      <div className="navbar-clear-all">
        <button>Clear all chats</button>
      </div>
      <div className="navbar-history">
      <div className="navbar-history-text">History</div>
      </div>
      <div className="navbar-history">
        <ul>
          <li>
            <span role="img" aria-label="python">
              🦜
            </span>{" "}
            Langchain 
          </li>
          <li>
            <span role="img" aria-label="js">
              🔗
            </span>{" "}
            Langchain 
          </li>
          <li>
            <span role="img" aria-label="llama">
              🦙
            </span>{" "}
            LlamaIndex
          </li>
          <li>
            <span role="img" aria-label="chroma">
              🌈
            </span>{" "}
            Chroma
          </li>
          <li>
            <span role="img" aria-label="milvus">
              🛸
            </span>{" "}
            Milvus
          </li>
          <li>
            <span role="img" aria-label="faiss">
              🧠
            </span>{" "}
            Faiss
          </li>
          <li>
            <span role="img" aria-label="qdrant">
              🧩
            </span>{" "}
            Qdrant
          </li>
        </ul>
      </div>
      <div className="navbar-add-button">
        <button>+</button>
      </div>
    </div>
  );
};

export default Navbar;
