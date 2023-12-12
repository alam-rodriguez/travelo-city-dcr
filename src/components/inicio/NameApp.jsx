import React from 'react';

// Icons
import { SiYourtraveldottv } from 'react-icons/si';

// Zustand
import { useInfoApp } from '../../zustand/admin/app/app';
import { useInfoUser } from '../../zustand/user/user';

const NameApp = () => {
  const {
    isAdmin,
    userLogged,
    haveUserInfo,
    id,
    setId,
    email,
    setEmail,
    setName,
    setNumber,
    setMoneySpent,
    setPointsEarned,
    setPointsSpent,
    type,
    setType,
  } = useInfoUser();

  const { nameAppLarge } = useInfoApp();
  return (
    <header
      className="d-flex justify-content-center align-items-center gap-2 mt-4-"
      style={{ minHeight: '25.958px' }}
      onClick={() => console.log(type)}
    >
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
