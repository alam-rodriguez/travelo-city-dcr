import React, { useEffect, useState } from 'react';

// Components
import Headers from '../../admin-options-components/Headers';

// Firebase
import { getAllGiras } from '../../../../firebase/firestoreGiras/giras';

// Zustand
import { girasListForAdmin } from '../../../../zustand/admin/girasAdmin';

// React-router-dom
import { useNavigate } from 'react-router-dom';

const GrupoDegirasList = () => {
  const navigate = useNavigate();

  const { allGiras, setGiras, giraGroupSelected, setGiraGroupSelected } =
    girasListForAdmin();

  useEffect(() => {
    if (allGiras.length == 0) {
      const f = async () => {
        const resGiras = await getAllGiras();
        console.log(resGiras);
        setGiras(resGiras);
      };
      f();
    }
  }, []);

  const [girasByGroup, setGirasByGroup] = useState([]);
  useEffect(() => {
    if (allGiras.length == 0) return;
    const girasOrded = {};
    console.log(allGiras);
    allGiras.forEach((gira) => {
      if (!girasOrded[gira.id]) {
        girasOrded[gira.id] = [gira];
      } else {
        girasOrded[gira.id] = [...girasOrded[gira.id], gira];
      }
    });
    setGirasByGroup(girasOrded);
    console.log(girasOrded);
    Object.values(girasOrded).map((g) => {
      g.forEach((gira) => {
        console.log(gira);
      });
      console.log(g);
    });
  }, [allGiras]);

  const handleClick = (grupoDeGira) => {
    console.log(grupoDeGira);
    setGiraGroupSelected(grupoDeGira);
    navigate(
      '/admin-options/opciones-estadisticas-giras/giras-por-grupos/group-selected',
    );
  };

  return (
    <>
      <Headers
        text="Estadisticas de giras por grupos"
        link="/admin-options/opciones-estadisticas-giras"
      />
      <div>
        {Object.values(girasByGroup).map((grupoDeGira, i) => (
          <div
            key={i}
            className="my-4"
            onClick={() => handleClick(grupoDeGira)}
          >
            <p className="m-0 text-center- fs-5 fw-bold">Grupo {i + 1}</p>
            <p className="m-0 fw-medium">
              Giras: {grupoDeGira.map((gira) => `${gira.title}, `)}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default GrupoDegirasList;
