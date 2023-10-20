// import React, { useEffect } from 'react';

// // Components
// import HeaderSugerencia from './sugerencias-components/HeaderSugerencia';

// // Zustand
// import { useGiras } from '../../../zustand/giras/giras';
// import { useSugerencias } from '../../../zustand/sugerencias/sugerencias';

// // Firebase
// import { getSugerencias } from '../../../firebase/sugerencias/sugerencias';

// const EditarSugerencia = () => {

//   const { giras } = useGiras();
//   const { searchSugerencia, sugerencias, setSugerencias } = useSugerencias();

//   useEffect(() => {
//     if (!searchSugerencia) return;
//     console.log('Buscando sugerencias');
//     const f = async () => {
//       const res = await getSugerencias();
//       if (res != false) setSugerencias(res);
//     };
//     f();
//   }, []);

//   return (
//     <>
//       <HeaderSugerencia link="/admin-options" text="Crear sugerencia" />

//       <div>

//       </div>
//     </>
//   );
// };

// export default EditarSugerencia;
