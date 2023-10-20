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
  getGirasNoDone,
} from '../../../../firebase/firestoreGiras/giras';

const ListGirasForReservations = () => {
  useEffect(() => {
    if (giras.length == 0) {
      const f = async () => {
        console.log('first');
        const resGiras = await getGirasNoDone();
        console.log(resGiras);
        console.warn('Cargando giras de BD');
        setGiras(resGiras);
      };
      f();
    }
  }, []);

  const { giras, setGiras } = girasListForAdmin();

  const navigate = useNavigate();

  const handleClick = (currentId) => {
    navigate(`/admin-options/list-giras-for-reservations/${currentId}`);
  };

  return (
    <>
      <Headers text="Reservaciones Giras activas" link={-1} />
      <div className="my-4">
        {giras.map((gira) => (
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

export default ListGirasForReservations;
