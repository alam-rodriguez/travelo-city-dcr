import React from 'react';

// Component
import Btn from './Btn';

const AdminBtns = () => {
  return (
    <div
      className="position-fixed w-100 d-flex justify-content-evenly start-0"
      style={{ bottom: 25 }}
    >
      <Btn text="Editar gira" link="/admin-options/giras-editar" />
      <Btn text="Relanzar gira" link="/admin-options/giras-relanzar" />
      <Btn text="Crear Gira" link="/admin-options/create-gira" />
    </div>
  );
};

export default AdminBtns;
