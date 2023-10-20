import React from 'react';

const InputDate = ({
  id,
  head,
  handleChange,
  value,
  setFechaDetallada,
  setfechaEnMilisegundos,
}) => {
  const handleFechaChange = (event) => {
    const fecha = event.target.value;

    // console.log(fecha);

    const fechaDate = new Date(fecha);

    console.log(fechaDate.getTime());

    const opcionesDia = { weekday: 'long' };
    const nombreDia = new Intl.DateTimeFormat('es-ES', opcionesDia).format(
      fechaDate,
    );
    let diaEnLetras = '';
    console.log(nombreDia);
    if (nombreDia == 'domingo') diaEnLetras = 'lun';
    else if (nombreDia == 'lunes') diaEnLetras = 'mar';
    else if (nombreDia == 'martes') diaEnLetras = 'mié';
    else if (nombreDia == 'miércoles') diaEnLetras = 'jue';
    else if (nombreDia == 'jueves') diaEnLetras = 'vie';
    else if (nombreDia == 'viernes') diaEnLetras = 'sáb';
    else if (nombreDia == 'sábado') diaEnLetras = 'dom';

    // Obtener el nombre del mes
    const opcionesMes = { month: 'long' };
    const mes = new Intl.DateTimeFormat('es-ES', opcionesMes).format(fechaDate);

    const fechaArray = fecha.split('-');
    let dianumber = fechaArray[2];
    let mesNumber = fechaArray[1];
    let year = fechaArray[0];
    handleChange(`${diaEnLetras} ${dianumber} de ${mes}`);
    // setFechaDetallada({
    //   dia: dianumber,
    //   mes: mesNumber,
    //   year: year,
    // });
    setfechaEnMilisegundos(fechaDate.getTime());
    setFechaDetallada(fecha);
    console.log(`${diaEnLetras} ${dianumber} de ${mes} del ${year}`);
  };

  return (
    <div className="d-flex flex-column my-4">
      <label htmlFor={id}>{head}</label>
      <input
        className="bg-black border border-secondary text-white p-2 rounded-3 fs-6"
        type="date"
        id={id}
        value={value}
        required
        onChange={handleFechaChange}
      />
    </div>
  );
};

export default InputDate;
