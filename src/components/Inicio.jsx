import React, { useEffect } from 'react';

// Components
import NameApp from './inicio/NameApp';
import OptionsApp from './inicio/options-app/OptionsApp';
import ListViwerInHome from './inicio/lists-in-home/ListViwerInHome';
import CoversSugerencias from './inicio/sugerencias/CoversSugerencias';

// Firebase
import { getSugerencias } from '../firebase/sugerencias/sugerencias';

// Zustand
import { useGiras } from '../zustand/giras/giras';
import { useSugerencias } from '../zustand/sugerencias/sugerencias';

const Inicio = () => {
  const { giras } = useGiras();
  const { searchSugerencia, sugerencias, setSugerencias } = useSugerencias();

  useEffect(() => {
    if (!searchSugerencia) return;
    console.log('Buscando sugerencias');
    const f = async () => {
      const res = await getSugerencias();
      if (res != false) setSugerencias(res);
    };
    f();
  }, []);

  return (
    <div className="pt-4" style={{ marginBottom: 500 }}>
      <NameApp />

      <OptionsApp />

      <div className="">
        <ListViwerInHome
          title="Descubre nuestras increibles giras"
          content={giras}
        />
      </div>
      <CoversSugerencias sugerencias={sugerencias} />
    </div>
  );
};

export default Inicio;
