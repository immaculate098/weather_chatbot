import React, { useState } from 'react';
import './Navbar.css';
// import { FaBolt, FaCamera, FaImage, FaUser, FaHeart, FaSearch, FaThLarge, FaTimes } from 'react-icons/fa';


const Navbar = () => {
  const [active, setActive] = useState(null);

  const handleClick = (index) => {
    setActive(index === active ? null : index);
  };

  return (
    <div className="navbar-container">
      <div className="background">
        {/* <img src="path_to_your_background_image.jpg" alt="Background" className="background-image" /> */}
      </div>
      <div className="icon-container">
        <div className="icon" onClick={() => handleClick(0)}>
          <i className="fas fa-bolt"></i>
          <p>Write something</p>
          {active === 0 && <div className="description">Description for writing something.</div>}
        </div>
        <div className="icon" onClick={() => handleClick(1)}>
          <i className="fas fa-camera"></i>
          <p>Take a photo</p>
          {active === 1 && <div className="description">Description for taking a photo.</div>}
        </div>
        <div className="icon" onClick={() => handleClick(2)}>
          <i className="fas fa-image"></i>
          <p>From your gallery</p>
          {active === 2 && <div className="description">Description for choosing from the gallery.</div>}
        </div>
      </div>
      <div className="bottom-icons">
        <i className="fas fa-user"></i>
        <i className="fas fa-heart"></i>
        <i className="fas fa-search"></i>
        <i className="fas fa-th-large"></i>
      </div>
      <div className="close-icon">
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default Navbar;
