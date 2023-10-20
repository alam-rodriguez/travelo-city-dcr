import React, { useEffect } from 'react';

// Components
import Headers from '../../admin-options-components/Headers';
import ListGiras from '../../giras/giras-components/giras/ListGiras';

// Firebase
import { getGirasNoDone } from '../../../../firebase/firestoreGiras/giras';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zustand
import { girasListForAdmin } from '../../../../zustand/admin/girasAdmin';

const ListEstadisticasActivas = () => {
  const navigate = useNavigate();

  const { giras, setGiras } = girasListForAdmin();
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

  const handleClick = (currentId) => {
    navigate(`/admin-options/list-giras-for-stadisticas/${currentId}`);
    // navigate(`/admin-options/list-giras-for-reservations/${currentId}`);
  };

  return (
    <>
      <Headers text="Estadisticas giras activas" link={-1} />
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

export default ListEstadisticasActivas;
