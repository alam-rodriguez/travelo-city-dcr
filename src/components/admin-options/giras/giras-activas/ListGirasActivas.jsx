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
  getGirasNoDone,
} from '../../../../firebase/firestoreGiras/giras';

const ListGirasActivas = () => {
  const { allGiras, girasActives, setGiras } = girasListForAdmin();
  // const { girasNoDone, setGirasNoDone } = girasListForAdmin();

  useEffect(() => {
    if (allGiras.length == 0) {
      const f = async () => {
        console.log('first');
        const resGiras = await getAllGiras();
        console.log(resGiras);
        console.warn('Cargando giras activas de BD');
        setGiras(resGiras);
      };
      f();
    }
  }, []);

  const navigate = useNavigate();

  const handleClick = (currentId) =>
    navigate(`/admin-options/giras-editar/${currentId}`);

  return (
    <>
      <Headers text="Giras activas" link={-1} />
      <div className="my-4">
        {girasActives.map((gira) => (
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

export default ListGirasActivas;
