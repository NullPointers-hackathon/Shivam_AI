import React from 'react';
import "./Header.css";
import { FaPlus } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Header = ({headername}) => {
    const title = useSelector((state) => state.title.value);
    const navigate=useNavigate();



  return (
    <div
    className='header-main-container'>
        <div className="header-title">{title}</div>
        <div className="header-profile-container">
            {title=="Study Pods"?    <div className="header-download-icon" style={{cursor:"pointer"}}><FaPlus onClick={()=>{navigate("/create-pod")}}/>

                </div> : " "}
            <div className="header-profile-icon"><FaUserCircle />
            </div>
        </div>

    </div>
  )
}

export default Header