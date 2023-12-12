import React from 'react';

const AccordinSection = ({ id, title, icon, content }) => {
  return (
    <div className="accordion z-0" id={`accordion-${id}`}>
      <div className="accordion-item border-0">
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-white- bg-light px-0 "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${id}`}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <p className="m-0 fw-bold fs-4">{title}</p>
          </button>
        </h2>
        <div
          id={`collapse-${id}`}
          className="accordion-collapse collapse show- overflow-scroll bg-light"
          data-bs-parent={`#accordion-${id}`}
        >
          <div className="accordion-body px-0">
            {content.map((item, i) => (
              <div key={i} className="d-flex align-items-center gap-3">
                {icon}
                <p className="m-0">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordinSection;
