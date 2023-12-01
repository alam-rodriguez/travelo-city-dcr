import React, { useEffect } from 'react';

// Components
import HeaderSugerencia from './sugerencias-components/HeaderSugerencia';

// Zustand
import { useGiras } from '../../../zustand/giras/giras';
import { useSugerencias } from '../../../zustand/sugerencias/sugerencias';

// Firebase
import { getSugerencias } from '../../../firebase/sugerencias/sugerencias';
import { useNavigate } from 'react-router-dom';

const ListSugerencias = () => {
  const navigate = useNavigate();
  const { giras } = useGiras();
  const { searchSugerencia, sugerencias, setSugerencias } = useSugerencias();

  useEffect(() => {
    if (!searchSugerencia) return;
    console.log('Buscando sugerencias');
    const f = async () => {
      const res = await getSugerencias();
      if (res != false) {
        res.sort((a, b) => a.position - b.position);
        setSugerencias(res);
      }
    };
    f();
  }, []);

  const handlleClick = (id) =>
    navigate(`/admin-options/list-sugerencias/${id}`);

  return (
    <>
      <HeaderSugerencia
        link="/admin-options/opciones-sugerencias"
        text="Lista de sugerencias"
      />

      <div>
        {sugerencias.map((sugerencia) => (
          <div
            className="py-3 border-bottom"
            key={sugerencia.id}
            onClick={() => handlleClick(sugerencia.id)}
          >
            <p className="m-0 fw-medium">
              Titulo: <span className="fw-bold">{sugerencia.titulo}</span>
            </p>
            <p className="m-0 fw-medium">
              Subtitulo: <span className="fw-bold">{sugerencia.subtitulo}</span>
            </p>
            <p className="m-0 fw-medium">
              Sugerencia:{' '}
              <span className="fw-bold" style={{ fontSize: 13 }}>
                {sugerencia.info}
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListSugerencias;
