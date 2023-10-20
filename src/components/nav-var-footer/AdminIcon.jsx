import React from 'react';

// Icon
import { AiFillSetting } from 'react-icons/ai';

// React-router-dom
import { Link, useLocation } from 'react-router-dom';

const AdminIcon = () => {
  const location = useLocation();

  if (location.pathname != '/') return <></>;

  return (
    <div
      className="position-fixed bg-white rounded-circle d-flex justify-content-center align-items-center shadow"
      style={{ left: 10, bottom: 100, width: 50, height: 50 }}
    >
      <Link to="/admin-options">
        <AiFillSetting className="fs-3 color-1" />
      </Link>
    </div>
  );
};

export default AdminIcon;
