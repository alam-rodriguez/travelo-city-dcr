import React from 'react';

// Icon
import { PiChatsFill } from 'react-icons/pi';

// React-router-dom
import { Link, useLocation } from 'react-router-dom';

const ChatIcon = () => {
  const location = useLocation();

  if (location.pathname != '/' && location.pathname != '/mis-viajes')
    return <></>;

  return (
    <div
      className="position-fixed bg-white rounded-circle d-flex justify-content-center align-items-center shadow"
      style={{ right: 10, bottom: 100, width: 50, height: 50 }}
    >
      <Link to="httts://google.com" target="_blank">
        <PiChatsFill className="fs-3 color-1" />
      </Link>
    </div>
  );
};

export default ChatIcon;
