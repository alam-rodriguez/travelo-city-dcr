import React from 'react';

const AccordinSection = ({ id, header, content }) => {
  const handleClickHeader = (e) => {
    // console.log(e);
    // console.log(e.target.classList);

    const content = document.querySelector(`.accordion-item-${id}`);
    const icon = document.querySelector(`.FaAnglesDown-${id}`);
    // console.log(content.classList);
    if (content.classList.contains('collapsed')) {
      console.log('si');
      icon.classList.remove('rotar');
    } else {
      console.log('no');
      icon.classList.add('rotar');
    }

    console.log({ icon });
    // console.log(content.hidden);
  };

  return (
    <div
      className="accordion z-0 my-3"
      id={`accordion-1`}
      onClick={handleClickHeader}
    >
      <div
        className={`accordion-item-${id} border-0 bg-light`}
        data-bs-toggle="collapse"
        data-bs-target={`#collapse-${id}`}
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        {/* <h2
          className="accordion-header"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-1`}
          aria-expanded="true"
          aria-controls="collapseOne"
        > */}
        {/* <button
            className="accordion-button bg-white p-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-1`}
            aria-expanded="true"
            aria-controls="collapseOne"
          > */}
        {header}
        {/* </button> */}
        {/* </h2> */}
        <div
          id={`collapse-${id}`}
          className="accordion-collapse collapse show-"
          data-bs-parent={`#accordion-${id}`}
        >
          {/* <div className="accordion-body p-0"> */}
          <div className="accordion-body p-0">{content}</div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AccordinSection;
