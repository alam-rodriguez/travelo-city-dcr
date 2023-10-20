import React, { useEffect } from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zusttand
import { girasListForAdmin } from '../../../../../zustand/admin/girasAdmin';

// Components
import Headers from '../../../admin-options-components/Headers';
import ListGiras from '../../giras-components/giras/ListGiras';

import { getAllGiras } from '../../../../../firebase/firestoreGiras/giras';

const ListAllReservations = () => {
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

  const { giras, setGiras } = girasListForAdmin();

  const navigate = useNavigate();

  const handleClick = (currentId) => {
    navigate(`/admin-options/list-giras-for-reservations/${currentId}`);
  };

  return (
    <>
      <Headers text="Las reservaciones de todas las giras" link={-1} />
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

export default ListAllReservations;
