import React from 'react';

// Icons
import { MdArrowBackIosNew } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';

// React-router-dom
import { useNavigate } from 'react-router-dom';

const GirasHeader = () => {
  const navigate = useNavigate();

  const handleClickBack = () => navigate('/');

  return (
    <header className="position-fixed w-100 start-0 top-0 z-3 bg-white  border-bottom d-flex justify-content-between align-items-center py-4 px-2">
      <MdArrowBackIosNew
        className="display-6 color-1"
        onClick={handleClickBack}
      />
      <h3 className="m-0">Giras con TraveloCity</h3>
      <BiSearch className="display-6 color-1" />
    </header>
  );
};

export default GirasHeader;
