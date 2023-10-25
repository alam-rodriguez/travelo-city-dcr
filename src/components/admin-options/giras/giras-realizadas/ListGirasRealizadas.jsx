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
  getGirasDone,
  getGirasNoDone,
} from '../../../../firebase/firestoreGiras/giras';

const ListGirasRealizadas = () => {
  const { girasNoDone, setGirasNoDone, girasDone, setGirasDone } =
    girasListForAdmin();

  useEffect(() => {
    if (girasDone.length == 0) {
      const f = async () => {
        console.log('first');
        const resGiras = await getGirasDone();
        console.log(resGiras);
        console.warn('Cargando giras activas de BD');
        setGirasDone(resGiras);
      };
      f();
    }
  }, []);

  const navigate = useNavigate();

  const handleClick = (currentId) =>
    navigate(`/admin-options/giras-editar/${currentId}`);

  return (
    <>
      <Headers text="Giras Realizadas" link={-1} />
      <div className="my-4">
        {girasDone.map((gira) => (
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

export default ListGirasRealizadas;
