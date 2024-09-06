import React from 'react';
import "./Header.css";
import { FiDownload } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';


const Header = ({headername}) => {
    const title = useSelector((state) => state.title.value);



  return (
    <div
    className='header-main-container'>
        <div className="header-title">{title}</div>
        <div className="header-profile-container">
            <div className="header-profile-icon"><FaUserCircle />
            </div>
        </div>

    </div>
  )
}

export default Header