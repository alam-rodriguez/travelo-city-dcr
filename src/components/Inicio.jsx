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
import CopyRigthText from './inicio/CopyRigthText';

const Inicio = () => {
  const { giras } = useGiras();
  const { searchSugerencia, sugerencias, setSugerencias } = useSugerencias();

  useEffect(() => {
    if (!searchSugerencia) return;
    console.log('Buscando sugerencias');
    const f = async () => {
      const res = await getSugerencias();
      console.log(res);
      if (res != false) {
        res.sort((a, b) => a.position - b.position);
        setSugerencias(res);
      }
    };
    f();
  }, []);

  return (
    <div className="pt-4 pb-4">
      <NameApp />

      <OptionsApp />

      <div className="">
        <ListViwerInHome
          title="Descubre nuestras increibles giras"
          content={giras}
        />
      </div>
      <CoversSugerencias sugerencias={sugerencias} />

      {/* <CopyRigthText /> */}
    </div>
  );
};

export default Inicio;
