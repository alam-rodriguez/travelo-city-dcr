import React, { useEffect } from 'react';

// React-router-dom
import { useParams } from 'react-router-dom';

// Components
import Headers from '../admin-options-components/Headers';
import EstadisticaValue from '../admin-options-components/estadisticas/EstadisticaValue';

// Firebase
import { getEstadisticasByCurrentId } from '../../../firebase/admin-option/estadisticas/estadisticas';

// Zustand
import { useEstadisticas } from '../../../zustand/admin/estadisticas/estadisticas';

const EstadisticaGira = () => {
  const { id } = useParams();

  const { countBabies, setCountBabies } = useEstadisticas();
  const { countChildren, setCountChildren } = useEstadisticas();
  const { countAdults, setCountAdults } = useEstadisticas();
  const { priceBaby, setPriceBaby } = useEstadisticas();
  const { priceChild, setPriceChild } = useEstadisticas();
  const { priceAdult, setPriceAdult } = useEstadisticas();
  const { countReservations, setCountReservations } = useEstadisticas();

  useEffect(() => {
    console.log(id);
    const f = async () => {
      const countBabies = 0;
      const countChildren = 0;
      const countAdults = 0;
      const priceBaby = 0;
      const priceChild = 0;
      const priceAdult = 0;
      const countReservations = 0;

      const res = await getEstadisticasByCurrentId(id);
      res.forEach((reservacion) => {
        countReservations += 1;
        Object.entries(reservacion.bebiesNames).forEach(
          () => (countBabies += 1),
        );
        Object.entries(reservacion.childrenNames).forEach(
          () => (countChildren += 1),
        );

        countAdults += 1;
        Object.entries(reservacion.childrenNames).forEach(
          () => (countAdults += 1),
        );

        priceBaby = reservacion.bebiesPrice;
        priceChild = reservacion.childrenPrice;
        priceAdult = reservacion.adultPrice;

        console.log(reservacion);
      });
      setCountBabies(countBabies);
      setCountChildren(countChildren);
      setCountAdults(countAdults);
      setPriceBaby(countBabies * priceBaby);
      setPriceChild(countChildren * priceChild);
      setPriceAdult(countAdults * priceAdult);
      setCountReservations(countReservations);
      console.log(res);
    };
    f();
  }, []);

  return (
    <>
      <Headers text="Estadisticas giras activas" link={-1} />
      <div className="my-4">
        <EstadisticaValue
          head="Cantidad de reservaciones:"
          value={countReservations}
          desk="reservaciones"
        />
        <EstadisticaValue
          head="Cantidad de bebes:"
          value={countBabies}
          desk="bebes"
        />
        <EstadisticaValue
          head="Total por ir bebes:"
          value={priceBaby}
          desk="pesos"
        />
        <EstadisticaValue
          head="Cantidad de niños:"
          value={countChildren}
          desk="niños"
        />
        <EstadisticaValue
          head="Total por ir ninos:"
          value={priceChild}
          desk="pesos"
        />
        <EstadisticaValue
          head="Cantidad de adultos:"
          value={countAdults}
          desk="adultos"
        />
        <EstadisticaValue
          head="Total por ir adultos:"
          value={priceAdult}
          desk="pesos"
        />
        <hr />
        <EstadisticaValue
          head="Total:"
          value={priceBaby + priceChild + priceAdult}
          desk="pesos"
        />
      </div>
    </>
  );
};

export default EstadisticaGira;