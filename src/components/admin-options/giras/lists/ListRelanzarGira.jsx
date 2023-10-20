import React, { useEffect } from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zusttand
import { useGiras } from '../../../../zustand/giras/giras';

// Components
import Headers from '../../admin-options-components/Headers';
import ListGiras from '../giras-components/giras/ListGiras';
import { girasListForAdmin } from '../../../../zustand/admin/girasAdmin';
import { getAllGiras } from '../../../../firebase/firestoreGiras/giras';

const ListRelanzarGira = () => {
  const { giras, setGiras } = girasListForAdmin();

  useEffect(() => {
    if (giras.length == 0) {
      const f = async () => {
        console.log('first');
        const resGiras = await getAllGiras();
        console.log(resGiras);
        console.warn('Cargando giras de BD');
        setGiras(resGiras);
      };
      f();
    }
  }, []);

  const navigate = useNavigate();

  const handleClick = (currentId) =>
    navigate(`/admin-options/giras-relanzar/${currentId}`);

  return (
    <>
      <Headers text="Relanzar Gira" link={-1} />
      <div className="my-4">
        {giras.map((gira) => (
          <ListGiras
            gira={gira}
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

export default ListRelanzarGira;
