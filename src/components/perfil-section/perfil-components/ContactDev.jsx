import React from 'react';

// React-router-dom
import { Link } from 'react-router-dom';

const ContactDev = () => {
  return (
    <Link
      className="text-decoration-none"
      to="https://curriculum-alam-rodriguez.netlify.app/"
      target="_blanc"
    >
      <p
        className="text-center text-secondary fw-light"
        style={{ fontSize: 10 }}
      >
        Desarrollado por Alam Rodriguez
      </p>
    </Link>
  );
};

export default ContactDev;
