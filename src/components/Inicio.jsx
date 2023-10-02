import React, { useEffect } from 'react';

// Components
import NameApp from './inicio/NameApp';
import OptionsApp from './inicio/options-app/OptionsApp';

// Images
import imgSantoDomingo from '../assets/images/imgSantoDomingo.jpeg';

// Components
import ListViwerInHome from './inicio/lists-in-home/ListViwerInHome';
import { useGiras } from '../zustand/giras/giras';
import { getGiras } from '../firebase/firestoreGiras/giras';

const Inicio = () => {
  const { giras, setGiras } = useGiras();

  // useEffect(() => {
  //   if (giras.length == 0) {
  //     const f = async () => {
  //       const resGiras = await getGiras();
  //       // console.log(resGiras);
  //       console.warn('Cargando giras de BD');
  //       setGiras(resGiras);
  //     };
  //     f();
  //   }
  // }, []);

  return (
    <div className="pt-4">
      <NameApp />

      <OptionsApp />

      <ListViwerInHome
        title="Descubre nuestras increibles giras"
        content={giras}
      />
    </div>
  );
};

export default Inicio;
