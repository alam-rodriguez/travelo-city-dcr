import React, { useEffect } from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zusttand
import { useGiras } from '../../../../zustand/giras/giras';
import { girasListForAdmin } from '../../../../zustand/admin/girasAdmin';

// Components
import Headers from '../../admin-options-components/Headers';
import ListGiras from '../giras-components/giras/ListGiras';
import {
  getAllGiras,
  getGirasNoArchivadas,
} from '../../../../firebase/firestoreGiras/giras';

const ListTodasLasGiras = () => {
  const { giras, setGiras, allGiras, setAllGiras } = girasListForAdmin();

  useEffect(() => {
    if (allGiras.length == 0) {
      const f = async () => {
        console.log('first');
        const resGiras = await getAllGiras();
        console.log(resGiras);
        console.warn('Cargando todas las giras de BD');
        setAllGiras(resGiras);
      };
      f();
    }
  }, []);

  const navigate = useNavigate();

  const handleClick = (currentId) =>
    navigate(`/admin-options/giras-editar/${currentId}`);

  return (
    <>
      <Headers text="Todas las giras" link={-1} />
      <div className="my-4">
        {/* {giras.map((gira) => (
          <div
            className="d-flex justify-content-between align-items-center border-bottom py-3"
            key={gira.id}
            onClick={() => handleClick(gira.id)}
          >
            <div>
              <p className="m-0 fw-medium">{gira.title}</p>
              <p className="m-0" style={{ fontSize: 14 }}>
                {gira.description}
              </p>
            </div>
            <p className="m-0 fw-bold">${gira.prices.adulto}</p>
          </div>
        ))} */}
        {allGiras.map((gira) => (
          <ListGiras
            key={gira.currentId}
            currentId={gira.currentId}
            title={gira.title}
            description={gira.description}
            price={gira.prices.adult}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
};

export default ListTodasLasGiras;
