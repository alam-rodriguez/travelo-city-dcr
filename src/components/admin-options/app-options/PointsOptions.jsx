// import React, { useState } from 'react';

// // Components
// import Headers from '../../admin-options/admin-options-components/Headers';
// import Input from '../admin-options-components/insputs/Input';
// import BtnAction from '../admin-options-components/insputs/BtnAction';
// // import { createPointSettings } from '../../../firebase/admin-option/app-options/pointsSettings';

// const PointsOptions = () => {
//   const [valuePoint, setValuePoint] = useState(0);

//   const handleChangeValuePoint = (value) => setValuePoint(Number(value));

//   return (
//     <>
//       <Headers text="Opciones de ountos" link={-1} />
//       <div className="my-4">
//         <Input
//           id="costo-punto"
//           label="Costo de cada punto:"
//           type="number"
//           value={valuePoint}
//           placeholder="Costa en pesos de cada punto"
//           minLength={3}
//           handleChange={handleChangeValuePoint}
//         />

//         <BtnAction text="Guardar configuracion" action={{}} />
//       </div>
//     </>
//   );
// };

// export default PointsOptions;
