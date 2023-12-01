import React from 'react';

// Icons
import { SiYourtraveldottv } from 'react-icons/si';

// Zustand
import { useInfoApp } from '../../zustand/admin/app/app';

const NameApp = () => {
  const { nameAppLarge } = useInfoApp();
  return (
    <header className="d-flex justify-content-center align-items-center gap-2">
      {nameAppLarge != '' ? (
        <>
          <SiYourtraveldottv className="fs-3" />
          <h4 className="m-0">{nameAppLarge}</h4>
        </>
      ) : (
        <></>
      )}
      {/* <h4 className="m-0">TRAVELOCITYDCR</h4> */}
      {/* <h4 className="m-0">{nameAppLarge}</h4> */}
    </header>
  );
};

export default NameApp;
