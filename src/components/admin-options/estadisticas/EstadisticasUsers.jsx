import React, { useEffect } from 'react';

// Components
import Headers from '../admin-options-components/Headers';

// Firebase
import { getInfoUsers } from '../../../firebase/admin-option/estadisticas/estadisticas';

// Zustand
import { useEstadisticas } from '../../../zustand/admin/estadisticas/estadisticas';

const EstadisticasUsers = () => {
  const { usersInfo, setUsersInfo } = useEstadisticas();

  useEffect(() => {
    if (usersInfo.length > 0) return;
    const f = async () => {
      const res = await getInfoUsers();
      if (res != false) setUsersInfo(res);
      console.log(res);
    };
    f();
  }, []);

  return (
    <>
      <Headers
        text="Estadisticas de usuarios"
        link="/admin-options/opciones-estadisticas-giras/"
      />

      <div
        className="d-flex justify-content-between my-4"
        onClick={() => console.log(usersInfo)}
      >
        <p className="m-0 fw-bold fs-5">Nombres</p>
        <p className="m-0 fw-bold fs-5">Dinero gastado</p>
      </div>

      {usersInfo.map((user) => {
        if (user.type == 'admin' || user.type == 'semi-admin') return;
        return (
          <User
            key={user.id}
            id={user.id}
            name={user.name != '' ? user.name : user.email}
            cell={user.number.length >= 9 ? user.number : 'Sin numero'}
            moneySpent={user.moneySpent}
            userInfo={user}
          />
        );
      })}
    </>
  );
};

export default EstadisticasUsers;

import { useNavigate } from 'react-router-dom';

const User = ({ id, name, cell, moneySpent, userInfo }) => {
  const { setUserSelected } = useEstadisticas();

  const navigate = useNavigate();
  const handleClickUser = () => {
    navigate(
      `/admin-options/opciones-estadisticas-giras/estadisticas-usuarios/${id}`,
    );
    setUserSelected(userInfo);
  };

  return (
    <div
      className="d-flex justify-content-between py-2"
      onClick={handleClickUser}
    >
      <p className="m-0 fw-medium fs-6">
        {name} - {cell}
      </p>
      <p className="m-0 fw-bold fs-6">{moneySpent}</p>
    </div>
  );
};
