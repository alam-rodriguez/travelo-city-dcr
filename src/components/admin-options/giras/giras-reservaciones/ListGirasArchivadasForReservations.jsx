import React, { useEffect } from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zusttand
import { girasListForAdmin } from '../../../../zustand/admin/girasAdmin';

// Firebase
import {
  getAllGiras,
  getGirasDone,
} from '../../../../firebase/firestoreGiras/giras';

// Components
import Headers from '../../admin-options-components/Headers';
import ListGiras from '../giras-components/giras/ListGiras';

const ListGirasArchivadasForReservations = () => {
  const { allGiras, girasArchivadas, setGiras } = girasListForAdmin();

  // const { girasDone, setGirasDone } = girasListForAdmin();

  useEffect(() => {
    if (allGiras.length == 0) {
      const f = async () => {
        const resGiras = await getAllGiras();
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
      <Headers text="Reservaciones Giras realizadas" link={-1} />
      <div className="my-4">
        {girasArchivadas.map((gira) => (
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

export default ListGirasArchivadasForReservations;
