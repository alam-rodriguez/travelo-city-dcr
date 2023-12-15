import React, { useEffect } from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zusttand
import { girasListForAdmin } from '../../../../zustand/admin/girasAdmin';

// Firebase
import { getGirasNoDone } from '../../../../firebase/firestoreGiras/giras';

// Components
import Headers from '../../admin-options-components/Headers';
import ListGiras from '../giras-components/giras/ListGiras';

const ListGirasForReservations = () => {
  const { allGiras, girasActives, setGiras } = girasListForAdmin();
  useEffect(() => {
    if (allGiras.length == 0) {
      const f = async () => {
        const resGiras = await getGirasNoDone();
        if (resGiras != false) setGiras(resGiras);
      };
      f();
    }
  }, []);

  const navigate = useNavigate();

  const handleClick = (currentId) => {
    navigate(`/admin-options/list-giras-for-reservations/${currentId}`);
  };

  return (
    <>
      <Headers
        text="Reservaciones Giras activas"
        link="/admin-options/opciones-reservaciones-giras"
      />
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

export default ListGirasForReservations;
