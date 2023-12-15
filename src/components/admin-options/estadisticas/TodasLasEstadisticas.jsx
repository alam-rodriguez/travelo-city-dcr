import React, { useEffect, useState } from 'react';

// Components
import Headers from '../admin-options-components/Headers';
import ItemOfAllEstadisticas from '../admin-options-components/estadisticas/ItemOfAllEstadisticas';

// Zustand
import { useEstadisticas } from '../../../zustand/admin/estadisticas/estadisticas';
import { girasListForAdmin } from '../../../zustand/admin/girasAdmin';
import { getAllReservations } from '../../../firebase/firestoreGiras/reservations/reservations';
import { getAllGiras } from '../../../firebase/firestoreGiras/giras';
import { useAlerts } from '../../../zustand/alerts/alerts';

const TodasLasEstadisticas = () => {
  const { ask, successAlert, errorAlert, waitingAlert, warningAlert } =
    useAlerts();

  const [typeViewEstadisticas, setTypeViewEstadisticas] = useState('manual');

  const handleChangeTypeViewEstadistica = (e) =>
    setTypeViewEstadisticas(e.target.value);

  useEffect(() => {
    console.log(typeViewEstadisticas);
  }, [typeViewEstadisticas]);

  const { allGiras, setGiras } = girasListForAdmin();

  const {
    setStatistics,
    amountGiras,
    amountReservations,
    amountReservationsCancelled,
    amountBabies,
    amountChildren,
    amountAdults,
    amountPeople,
    earningsWithBabies,
    earningsWithChildren,
    earningsWithAdults,
    pointsGenerated,
    pointsSpent,
    reservationsPaidWithMoney,
    reservationsPaidWithTransfer,
    earningsTotal,
  } = useEstadisticas();

  // const [idsGiras, setIdsGiras] = useState([]);
  useEffect(() => {
    if (allGiras.length == 0) {
      const f = async () => {
        console.log('first');
        const resGiras = await getAllGiras();
        console.log(resGiras);
        console.warn('Cargando giras de BD');
        setGiras(resGiras);
      };
      f();
    }
  }, []);
  const generateStatistics = async () => {
    const fechaEspecifica = new Date(year, month, day);
    console.log(fechaEspecifica);
    console.log(year);
    console.log(month);
    console.log(day);

    // return;
    const idsOfGira = allGiras.map((gira) => gira.currentId);

    const reservattions = await getAllReservations();
    console.log(reservattions);
    const reservationsForStatistics = [];
    console.log(reservattions);
    reservattions.forEach((reservation) => {
      if (typeViewEstadisticas == 'manual') {
        const anio = reservation.dayMadeReservation.split('-')[0];
        const mes = reservation.dayMadeReservation.split('-')[1];
        const dia = reservation.dayMadeReservation.split('-')[2];
        console.log(dia);
        console.log(day);
        if (year == 'todos' && month == 'todos' && day == 'todos') {
          reservationsForStatistics.push(reservation);
        }

        if (year != 'todos' && month == 'todos' && day == 'todos') {
          if (anio == year) reservationsForStatistics.push(reservation);
        }
        if (year != 'todos' && month != 'todos' && day == 'todos') {
          if (anio == year && mes == month)
            reservationsForStatistics.push(reservation);
        }
        if (year != 'todos' && month != 'todos' && day != 'todos') {
          if (anio == year && mes == month && dia == day)
            reservationsForStatistics.push(reservation);
        }
      } else {
        console.log('first');
        if (dateInit == null || dateLimit == null) {
          warningAlert('Debes de seleccionar las fechas correctamente');
          return;
        }
        const fechaActualInMilliseconds = new Date().getTime();
        const dateInitInMilliseconds = new Date(dateInit).getTime();
        const dateLimitInMilliseconds = new Date(dateLimit).getTime();

        if (
          fechaActualInMilliseconds > dateInitInMilliseconds &&
          fechaActualInMilliseconds < dateLimitInMilliseconds
        )
          reservationsForStatistics.push(reservation);

        console.log(dateInitInMilliseconds);
        console.log('first');
        console.log(dateInit);
        console.log(dateLimit);
      }
      // if () {
      //   reservationsForStatistics.push(reservation);

      // }

      // if (idsOfGira.includes(reservation.giraCurrentId)) {
      //   reservationsForStatistics.push(reservation);
      //   console.log('first');
      // }
    });
    console.log(idsOfGira);
    console.log(reservationsForStatistics);
    setStatistics(allGiras, reservationsForStatistics);
  };

  useEffect(() => {
    generateStatistics();
    // if (girasArchivadas.length == 0) return;
  }, [allGiras]);

  const [year, setYear] = useState('todos');
  const [month, setMonth] = useState('todos');
  const [day, setDay] = useState('todos');

  const putMonth = (e) => {
    if (year == 'todos') {
      warningAlert('Para seleccionar un mes debes de seleccionar un anio');
      return;
    }
    setMonth(e.target.value);
  };

  const putDay = (e) => {
    if (month == 'todos') {
      warningAlert('Para seleccionar un mes debes de seleccionar un anio');
      return;
    }
    setDay(e.target.value);
  };

  const [dateInit, setDateInit] = useState(null);
  const [dateLimit, setDateLimit] = useState(null);

  const putDateInit = (e) => setDateInit(e.target.value);

  const putDateLimit = (e) => setDateLimit(e.target.value);

  return (
    <>
      <Headers
        text="Todas las estadisticas"
        link="/admin-options/opciones-estadisticas-giras/"
      />

      <div className="d-flex justify-content-center my-4">
        <select
          className="bg-transparent text-black border rounded-3 p-2"
          onChange={handleChangeTypeViewEstadistica}
        >
          <option value="manual">Seleccionar fecha manualmente</option>
          <option value="calendario">Seleccionar fecha con calendarios</option>
        </select>
      </div>

      {/* <p className="my-4 text-center fs-5 fw-medium">Seleccionar fecha</p> */}
      {typeViewEstadisticas == 'manual' ? (
        <div className="d-flex'justify-content-between row">
          <div className="col-4 d-flex flex-column align-items-center">
            <p className="mb-1 fw-medium">Año</p>
            <select
              className="bg-transparent text-black rounded-3 p-1 px-3"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
              <option value={2029}>2029</option>
              <option value={2030}>2030</option>
              <option value={2031}>2031</option>
              <option value={2032}>2032</option>
              <option value={2033}>2033</option>
            </select>
          </div>
          <div className="col-4 d-flex flex-column align-items-center">
            <p className="mb-1 fw-medium">Mes</p>
            <select
              className="bg-transparent text-black rounded-3 p-1 px-3"
              value={month}
              onChange={putMonth}
            >
              <option value="todos">Todos</option>
              <option value={1}>Enero</option>
              <option value={2}>Febrero</option>
              <option value={3}>Marzo</option>
              <option value={4}>Abril</option>
              <option value={5}>Junio</option>
              <option value={6}>Julio</option>
              <option value={7}>Agosto</option>
              <option value={8}>Mayo</option>
              <option value={9}>Septiembre</option>
              <option value={10}>Octubre</option>
              <option value={11}>Noviembre</option>
              <option value={12}>Dicciembre</option>
            </select>
          </div>
          <div className="col-4 d-flex flex-column align-items-center">
            <p className="mb-1 fw-medium">Dia</p>
            <select
              className="bg-transparent text-black rounded-3 p-1 px-3"
              onChange={putDay}
              value={day}
            >
              <option value="todos">Todos</option>
              <option value={1}>{1}</option>
              <option value={2}>{2}</option>
              <option value={3}>{3}</option>
              <option value={4}>{4}</option>
              <option value={5}>{5}</option>
              <option value={6}>{6}</option>
              <option value={7}>{7}</option>
              <option value={8}>{8}</option>
              <option value={9}>{9}</option>
              <option value={10}>{10}</option>
              <option value={11}>{11}</option>
              <option value={12}>{12}</option>
              <option value={13}>{13}</option>
              <option value={14}>{14}</option>
              <option value={15}>{15}</option>
              <option value={16}>{16}</option>
              <option value={17}>{17}</option>
              <option value={18}>{18}</option>
              <option value={19}>{19}</option>
              <option value={20}>{20}</option>
              <option value={21}>{21}</option>
              <option value={22}>{22}</option>
              <option value={23}>{23}</option>
              <option value={24}>{24}</option>
              <option value={25}>{25}</option>
              <option value={26}>{26}</option>
              <option value={27}>{27}</option>
              <option value={28}>{28}</option>
              <option value={29}>{29}</option>
              <option value={30}>{30}</option>
              <option value={31}>{31}</option>
            </select>
          </div>
        </div>
      ) : typeViewEstadisticas == 'calendario' ? (
        <div className="d-flex align-items-center gap-3">
          <p className="m-0 fw-medium">del</p>
          <input
            className="bg-transparent text-black rounded-3 border p-2"
            type="date"
            onChange={putDateInit}
          />
          <p className="m-0 fw-medium">al</p>
          <input
            className="bg-transparent text-black rounded-3 border p-2"
            type="date"
            onChange={putDateLimit}
          />
        </div>
      ) : (
        <></>
      )}

      <button
        className="w-100 bg-color text-white mt-3 border-0 rounded-4 fs-4 fw-medium p-1"
        onClick={generateStatistics}
      >
        Buscar
      </button>

      <hr />

      {/* <div>
        <ItemOfAllEstadisticas head="Cantidad de giras:" value={500} />
        <ItemOfAllEstadisticas
          head="Cantidad de giras pendientes:"
          value={43}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de giras realizadas:"
          value={257}
        />
        <ItemOfAllEstadisticas head="Cantidad de reservaciones:" value={1500} />
        <ItemOfAllEstadisticas
          head="Cantidad de reservaciones canceladas:"
          value={126}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de bebes que han ido:"
          value={300}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de niños que han ido:"
          value={700}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de adultos que han ido:"
          value={1200}
        />
        <ItemOfAllEstadisticas
          head="Cantidad total que han ido:"
          value={1200}
        />
        <ItemOfAllEstadisticas head="Ganancias con bebes:" value={1200} />
        <ItemOfAllEstadisticas head="Ganancias con niños:" value={1200} />
        <ItemOfAllEstadisticas head="Ganancias con adultos:" value={1200} />
        <ItemOfAllEstadisticas head="Reservaciones canceladas:" value={1200} />

        <hr />

        <ItemOfAllEstadisticas head="Total de ganancias:" value={1234567} /> */}
      {/* </div> */}
      <div>
        {/* <ItemOfAllEstadisticas
          head="Cantidad de giras activas:"
          value={amountGiras}
        /> */}

        <ItemOfAllEstadisticas
          head="Cantidad de reservaciones:"
          value={amountReservations}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de reservaciones canceladas:"
          value={amountReservationsCancelled}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de bebes que han ido:"
          value={amountBabies}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de niños que han ido:"
          value={amountChildren}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de adultos que han ido:"
          value={amountAdults}
        />
        <ItemOfAllEstadisticas
          head="Cantidad total de personas que han ido:"
          value={amountPeople}
        />
        <ItemOfAllEstadisticas
          head="Ganancias con bebes:"
          value={earningsWithBabies}
        />
        <ItemOfAllEstadisticas
          head="Ganancias con niños:"
          value={earningsWithChildren}
        />
        <ItemOfAllEstadisticas
          head="Ganancias con adultos:"
          value={earningsWithAdults}
        />
        <ItemOfAllEstadisticas
          head="Puntos generados:"
          value={pointsGenerated}
        />
        <ItemOfAllEstadisticas head="Puntos gastados:" value={pointsSpent} />

        <ItemOfAllEstadisticas
          head="Reservaciones pagadas con efectivo:"
          value={reservationsPaidWithMoney}
        />
        <ItemOfAllEstadisticas
          head="Reservaciones pagadas con transferencia:"
          value={reservationsPaidWithTransfer}
        />

        <hr />

        <ItemOfAllEstadisticas
          head="Total de ganancias:"
          value={earningsTotal}
        />
      </div>
    </>
  );
};

export default TodasLasEstadisticas;
