import React from 'react';

// React-router-dom
import { Link, NavLink } from 'react-router-dom';

const NavBarItem = ({ icon, text, link }) => {
  return (
    <NavLink
      to={link}
      className="NavLink color-1 d-flex text-decoration-none text-black- flex-column align-items-center"
      style={{ width: '20%' }}
    >
      {icon}
      <p className="m-0 mt-1" style={{ fontSize: 12 }}>
        {text}
      </p>
    </NavLink>
  );
};

export default NavBarItem;
