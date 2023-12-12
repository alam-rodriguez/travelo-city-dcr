import React, { useEffect } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Zustand
import { useCreateOrEditGira } from '../../../zustand/admin/girasAdmin';
import { useAlerts } from '../../../zustand/alerts/alerts';

// Components
import Headers from '../admin-options-components/Headers';
import Input from './giras-components/giras/Input';
import TextArea from './giras-components/giras/TextArea';
import Switch from './giras-components/giras/Switch';
import BtnCreateGira from './giras-components/giras/BtnCreateGira';
import List from './giras-components/giras/List';
import DurationItem from './giras-components/giras/DurationItem';
import InputDate from './giras-components/giras/InputDate';
import InputFile from './giras-components/giras/InputFile';

// Firestore
import { createGiraFirestore } from '../../../firebase/firestoreGiras/giras';
import {
  uploadImageGira,
  uploadImagesGira,
} from '../../../firebase/firestoreGiras/imagenesGira';
import InputSelectOneImage from './giras-components/giras/InputSelectOneImage';
import Swal from 'sweetalert2';
import { getBadgesAndPointsOptions } from '../../../firebase/admin-option/app-options/pointsSettings';
import { useInfoApp } from '../../../zustand/admin/app/app';
import { useNavigate } from 'react-router-dom';

const CreateGira = () => {
  const navigate = useNavigate();

  const {
    title,
    setTitle,

    description,
    setDescription,

    city,
    setCity,

    country,
    setCountry,

    location,
    setLocation,

    locationUrl,
    setLocationUrl,

    priceAdult,
    setPriceAdult,

    priceChild,
    setPriceChild,

    priceBaby,
    setPriceBaby,

    priceInPoint,
    setPriceInPoint,

    priceAdultInPoint,
    setPriceAdultInPoint,
    priceChildInPoint,
    setPriceChildInPoint,
    priceBabyInPoint,
    setPriceBabyInPoint,

    meetingPoint,
    setMeetingPoint,

    aboutActivity,
    setAboutActivity,

    canGoChildren,
    setCanGoChildren,

    canGoBebies,
    setCanGoBebies,

    canCancelFree,
    setCanCancelFree,

    instandConfirm,
    setInstandConfirm,

    voucherMovil,
    setVoucherMovil,

    generalData,
    setGeneralData,
    editGeneralData,
    decrementGeneralData,
    incrementGeneralData,

    includes,
    setIncludes,
    editIncludes,
    decrementIncludes,
    incrementIncludes,

    noIncludes,
    setNoIncludes,
    editNoIncludes,
    decrementNoIncludes,
    incrementNoIncludes,

    utilInformation,
    setUtilInformation,
    editUtilInformation,
    incrementUtilInformation,
    decrementUtilInformation,

    durationDays,
    setDurationDays,

    durationHours,
    setDurationHours,

    durationMinutes,
    setDurationMinutes,

    date,
    setDate,
    dateDetaild,
    setDateDetaild,

    dateInMilliseconds,
    setDateInMilliseconds,

    dateLimitForCancel,
    setDateLimitForCancel,
    dateLimitForCancelDetaild,
    setDateLimitForCancelDetaild,

    dateLimitForCancelInMilliseconds,
    setDateLimitForCancelInMilliseconds,

    hour,
    setHour,

    minute,
    setMinute,

    amORpm,
    setAmORpm,

    coverImage,
    setCoverImage,
    deleteCoverImage,

    images,
    addImages,
    deleteImige,

    showGira,
    setShowGira,

    activePoints,
    setActivePoints,
    activeDiscountWithPoints,
    setActiveDiscountWithPoints,
    activeBadges,
    setActiveBadges,

    badgesForThisGira,
    setBadgesForThisGira,
    editBadgesForThisGira,
    editBadgesForThisGiraDescuentos,
  } = useCreateOrEditGira();

  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

  const { hasInfo, setSettingsBadgesAndPoints, costo, badges, valuePoint } =
    useInfoApp();

  useEffect(() => {
    setBadgesForThisGira(badges);
  }, []);
  // useEffect(() => {
  //   console.log(badgesForThisGira);
  //   if (hasInfo) return;
  //   const f = async () => {
  //     const res = await getBadgesAndPointsOptions();
  //     if (res != false) {
  //       setSettingsBadgesAndPoints(res);
  //       setBadgesForThisGira(res.badges);
  //       console.log(res);
  //     }
  //     console.log(res);
  //   };
  //   f();
  // }, [badgesForThisGira]);

  // '¿Quieres crear esta gira?',
  // '¿Estas seguro de que quieres crear esta gira? tus usuarios la veran, asi que asegurate de llenar toda la informacion necesaria.',
  // 'question',
  // '#0008FF',
  // 'Crear Gira',
  // 'Cancelar',

  // useEffect(() => {
  //   const ff = async () => {
  //     const result = await ask(
  //       '¿Quieres crear esta gira?',
  //       '¿Estas seguro de que quieres crear esta gira? tus usuarios la veran, asi que asegurate de llenar toda la informacion necesaria.',
  //       'question',
  //       '#0008FF',
  //       'Crear Gira',
  //       'Cancelar',
  //     );
  //     console.log(result);
  //     if (result.isConfirmed) {
  //       const alertaDeEsperra = waitingAlert();

  //       setTimeout(() => {
  //         alertaDeEsperra.close();
  //         successAlert('title', 'text');
  //       }, 5000);
  //     } else if (!result.isConfirmed) {
  //       // errorAlert('title', 'text');
  //     }
  //   };
  //   ff();
  // }, []);

  // async function realizarTarea() {
  //   // Mostrar una alerta de espera mientras se ejecuta una promesa
  //   Swal.fire({
  //     title: 'Cargando...',
  //     allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic fuera de ella
  //     onOpen: () => {
  //       Swal.showLoading();
  //     },
  //     showConfirmButton: false, // Oculta el botón OK
  //   });

  //   try {
  //     // Simular una tarea asincrónica (reemplaza esto con tu propia promesa)
  //     await new Promise((resolve) => setTimeout(resolve, 3000)); // Espera 3 segundos

  //     // Tarea completada, cierra la alerta
  //     Swal.close();
  //     Swal.fire(
  //       'Tarea completada',
  //       'La tarea se ha completado con éxito',
  //       'success',
  //     );
  //   } catch (error) {
  //     // Si la promesa se rechaza, muestra una alerta de error
  //     Swal.close();
  //     Swal.fire('Error', 'Se produjo un error al realizar la tarea', 'error');
  //   }
  // }

  const crearGira = async (e) => {
    // console.log({
    //   adultInPoint: priceAdultInPoint,
    //   childInPoint: priceChildInPoint,
    //   babyInPoint: priceBabyInPoint,
    // });

    // return;
    e.preventDefault();

    const fecha = new Date().getTime();

    if (fecha > dateInMilliseconds) {
      alert('Debes de seleccionar una de los proximos dias como fecha');
      return;
    }

    if (dateLimitForCancelInMilliseconds > dateInMilliseconds) {
      alert(
        'la fecha limite de cancelacion debe de ser antes de la fecha de la gira',
      );
      return;
    }

    if (hour == 0 && minute == 0) {
      alert('Debes de ingresar la hora de la gira');
      return;
    } else if (
      durationDays == 0 &&
      durationHours == 0 &&
      durationMinutes == 0
    ) {
      alert('Debes de la duracion de la gira');
      return;
    }

    const promiseCreateGira = new Promise(async (resolve, reject) => {
      const result = await ask({
        title: '¿Quieres crear esta gira?',
        text: '¿Estas seguro de que quieres crear esta gira? tus usuarios la veran, asi que asegurate de llenar toda la informacion necesaria.',
        confirmButtonText: 'Crear Gira',
      });
      if (!result.isConfirmed) {
        resolve('cancelado');
        return;
      }
      waitingAlert();

      const giraId = uuidv4();
      const currentId = uuidv4();
      const coverImageId = uuidv4();
      let imagesWithId = [];
      let idsImages = [];

      images.forEach((image) => {
        const imageId = uuidv4();
        imagesWithId.push({ imageId, image });
        idsImages.push(imageId);
      });

      const newGira = {
        id: giraId,
        currentId: currentId,
        title: title,
        description: description,
        city: city,
        country: country,
        hasVotes: false,
        rate: 0.0,
        votes: 0,
        location: location,
        locationUrl: locationUrl,
        meetingPoint: meetingPoint,
        prices: {
          adult: priceAdult,
          child: priceChild,
          baby: priceBaby,
          // adultInPoint: priceAdultInPoint,
          // childInPoint: priceChildInPoint,
          // babyInPoint: priceBabyInPoint,
        },
        aboutActivity: aboutActivity,
        canGo: {
          adults: true,
          children: canGoChildren,
          babies: canGoBebies,
        },
        instandConfirm: instandConfirm,
        canCancelFree: canCancelFree,
        HasVoucherMovil: voucherMovil,
        generalData: generalData,
        includes: includes,
        noIncludes: noIncludes,
        utilInformation: utilInformation,
        date: date,
        dateDetaild: dateDetaild,
        dateInMilliseconds: dateInMilliseconds,
        hourInformation: {
          hour: hour,
          minute: minute,
          amORpm: amORpm,
        },
        dateLimitForCancel: dateLimitForCancel,
        dateLimitForCancelDetaild: dateLimitForCancelDetaild,
        dateLimitForCancelInMilliseconds: dateLimitForCancelInMilliseconds,
        duration: `${durationDays > 0 ? `${durationDays} dias ` : ''}${
          durationHours > 0 ? `${durationHours} hrs ` : ''
        }${durationMinutes > 0 ? `${durationMinutes} mins` : ''}`,
        durationDetaild: {
          days: durationDays,
          hours: durationHours,
          minutes: durationMinutes,
        },
        coverImageId: coverImageId,
        idsImages: idsImages,
        showGira: showGira,
        pointsAndBadgesSettings: {
          activePoints,
          activeDiscountWithPoints,
          priceInPoint,
          // priceAdultInPoint,
          // priceChildInPoint,
          // priceBabyInPoint,
          activeBadges,
          badgesForThisGira,
        },
      };

      const resCreateGira = await createGiraFirestore(newGira);

      const resCoverImage = await uploadImageGira(
        'giras',
        newGira.id,
        coverImageId,
        coverImage,
      );

      const resUploadImages = await uploadImagesGira(
        'giras',
        newGira.id,
        imagesWithId,
      );

      if (resCreateGira && resCoverImage && resUploadImages) resolve();
      else reject();
    });
    promiseCreateGira
      .then((res) => {
        if (res != 'cancelado') {
          successAlert(
            'Gira creada exitosamente',
            'Toda la informacion de la gira y todas las imagenes han sido publicadas de manera exitosa',
          );
          navigate('/giras');
        }
      })
      .catch(() => {
        errorAlert(
          'Error',
          'Ha ocurrido un error al intentar crear la gira, intentelo de nuevo',
        );
      });
  };

  return (
    <>
      <form onSubmit={crearGira}>
        <Headers text="Crear Gira" link={-1} />
        <div className="my-5">
          <Input
            id="titulo"
            label="Titulo"
            maxLength={50}
            value={title}
            placeholder="Titulo gira"
            handleChange={setTitle}
          />
          <Input
            id="description"
            label="Descripcion"
            value={description}
            placeholder="descripcion de gira"
            minLength={10}
            handleChange={setDescription}
          />
          <Input
            id="ciudad"
            label="Ciudad"
            value={city}
            placeholder="Ciudad de la gira"
            handleChange={setCity}
          />
          <Input
            id="pais"
            label="Pais"
            value={country}
            placeholder="Lugar gira"
            handleChange={setCountry}
          />
          <Input
            id="ubicacion"
            label="Ubicacion"
            value={location}
            placeholder="ubicacion de la actividad"
            handleChange={setLocation}
          />
          <Input
            id="ubicacion-google"
            label="Ubicacion con google map"
            value={locationUrl}
            placeholder="ubicacion de la actividad en google map"
            handleChange={setLocationUrl}
          />
          <Input
            id="punto-encuentro"
            label="Punto de Encuentro"
            value={meetingPoint}
            maxLength={50}
            placeholder="punto de encuentro"
            handleChange={setMeetingPoint}
          />
          <Input
            id="price-adulto"
            label="Precio para adultos"
            type="number"
            value={priceAdult}
            placeholder="precio para adulto"
            handleChange={setPriceAdult}
          />
          <Input
            id="price-child"
            label="Precio para niños"
            type="number"
            value={priceChild}
            placeholder="precio para niño"
            handleChange={setPriceChild}
          />
          <Input
            id="price-baby"
            label="Precio para bebes"
            type="number"
            value={priceBaby}
            placeholder="precio para bebe"
            handleChange={setPriceBaby}
          />

          <hr />

          <TextArea
            id="acerca-actividad"
            label="Informacion acerca de la actividad"
            value={aboutActivity}
            placeholder="informacion que describe la actividad, el lugar y la experiancia"
            handleChange={setAboutActivity}
          />

          <hr />

          <Switch
            id="pueden-children"
            text="Pueden ir niños"
            checked={canGoChildren}
            handleChange={setCanGoChildren}
          />
          <Switch
            id="pueden-bebies"
            text="Pueden ir bebes"
            checked={canGoBebies}
            handleChange={setCanGoBebies}
          />

          <Switch
            id="pueden-cancelar"
            checked={canCancelFree}
            text="Se puede cancelar reservacion gratuitamente"
            handleChange={setCanCancelFree}
          />

          <Switch
            id="confirmacio-instantanea"
            text="Confirmacion instantanea"
            checked={instandConfirm}
            handleChange={setInstandConfirm}
          />

          <Switch
            id="voucher-movil"
            text="voucher movil"
            checked={voucherMovil}
            handleChange={setVoucherMovil}
          />

          <hr />

          <List
            head="Datos generales"
            decrementFun={decrementGeneralData}
            array={generalData}
            incrementFun={incrementGeneralData}
            placeholder="placeholder"
            onChange={editGeneralData}
          />

          <List
            head="Cosas que incluye"
            decrementFun={decrementIncludes}
            array={includes}
            incrementFun={incrementIncludes}
            placeholder="cosa que incluye"
            onChange={editIncludes}
          />

          <List
            head="Cosas que no incluye"
            decrementFun={decrementNoIncludes}
            array={noIncludes}
            incrementFun={incrementNoIncludes}
            placeholder="cosa que no incluye"
            onChange={editNoIncludes}
          />

          <List
            head="Informacion util para antes de reservar"
            decrementFun={decrementUtilInformation}
            array={utilInformation}
            incrementFun={incrementUtilInformation}
            placeholder="informacion util"
            onChange={editUtilInformation}
          />

          <hr />

          <InputDate
            id="dia-gira"
            head="Fecha de gira"
            handleChange={setDate}
            setFechaDetallada={setDateDetaild}
            setfechaEnMilisegundos={setDateInMilliseconds}
          />

          <div className="my-4">
            <p>Seleccionar Hora</p>
            <div className="row">
              <DurationItem
                id="hora"
                label="Hora:"
                minI={0}
                maxI={13}
                value={hour}
                onChange={setHour}
              />

              <DurationItem
                id="minuto"
                label="Minuto:"
                maxI={59}
                value={minute}
                onChange={setMinute}
              />
              <div className="col-4 flex-column">
                <div>
                  <label className="text-center" htmlFor="dia-noche">
                    Dia o noche
                  </label>
                </div>
                <select
                  required
                  className="w-75 bg-white text-black border border-secondary"
                  id="dia-noche"
                  value={amORpm}
                  onChange={(e) => setAmORpm(e.target.value)}
                >
                  <option value="a. m.">AM</option>
                  <option value="p. m.">PM</option>
                </select>
              </div>
            </div>
          </div>

          <hr />

          <InputDate
            id="limite-cancelar"
            head="Fecha limite para cancelar"
            handleChange={setDateLimitForCancel}
            setFechaDetallada={setDateLimitForCancelDetaild}
            setfechaEnMilisegundos={setDateLimitForCancelInMilliseconds}
          />

          <hr />

          <div className="my-4">
            <p>Duracion Gira</p>
            <div className="row">
              <DurationItem
                id="dias"
                label="Dias:"
                maxI={100}
                value={durationDays}
                onChange={setDurationDays}
              />

              <DurationItem
                id="horas"
                label="Horas:"
                maxI={23}
                value={durationHours}
                onChange={setDurationHours}
              />

              <DurationItem
                id="minutos"
                label="Minutos:"
                maxI={59}
                value={durationMinutes}
                onChange={setDurationMinutes}
              />
            </div>
          </div>

          <InputSelectOneImage
            id="select-image"
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            deleteCoverImage={deleteCoverImage}
            required={true}
          />

          <InputFile
            id="select-images"
            addImages={addImages}
            imagesContainer={images}
            onClickToDelete={deleteImige}
            required={true}
          />

          <hr />
          <p>Seccion de puntos y insignias</p>
          <Switch
            id="active-points"
            text="Activar generador de puntos y utilizar puntos"
            checked={activePoints}
            handleChange={setActivePoints}
          />
          {/* <Input
                id="costo-points-adult"
                label="Costo en puntos para ir a Gira adulto"
                value={priceAdultInPoint}
                placeholder={`Recomendacion: ${valuePoint * priceAdult}`}
                handleChange={setPriceAdultInPoint}
                type="number"
              />
              <Input
                id="costo-points-child"
                label="Costo en puntos para ir a Gira niño"
                value={priceChildInPoint}
                placeholder={`Recomendacion: ${valuePoint * priceChild}`}
                handleChange={setPriceChildInPoint}
                type="number"
              />
              <Input
                id="costo-points-baby"
                label="Costo en puntos para ir a Gira bebe"
                value={priceBabyInPoint}
                placeholder={`Recomendacion: ${valuePoint * priceBaby}`}
                handleChange={setPriceBabyInPoint}
                type="number"
              /> */}
          {activePoints ? (
            <>
              <Input
                id="costo-points"
                label="Valor de peso en puntos"
                value={priceInPoint}
                placeholder={`Recomendacion: ${valuePoint}`}
                handleChange={setPriceInPoint}
                type="number"
              />

              <Switch
                id="active-discount-with-points"
                text="Permitir generar descuentos con puntos"
                checked={activeDiscountWithPoints}
                handleChange={setActiveDiscountWithPoints}
              />
            </>
          ) : (
            <></>
          )}

          <Switch
            id="active-badges"
            text="Activar descuentos por insignias"
            checked={activeBadges}
            handleChange={setActiveBadges}
          />
          {activeBadges ? (
            badgesForThisGira.map((badge, i) => (
              <div className="border-bottom border-secondary pb-3 mb-3" key={i}>
                <div className="d-flex align-items-center gap-3">
                  <label
                    className="m-0 fw-medium"
                    htmlFor={`insignia-name-${i}`}
                  >
                    Insignia: <span className="fw-bold">{badge.badge}</span> |
                    Porcentaje de descuento:
                  </label>
                  <input
                    id={`insignia-name-${i}`}
                    className="bg-transparent text-black border rounded-3 p-1 w-25"
                    placeholder="Porcentaje de descuesto"
                    value={badge.discountRate}
                    onChange={(e) =>
                      editBadgesForThisGiraDescuentos(Number(e.target.value), i)
                    }
                    type="number"
                  />
                </div>
              </div>
            ))
          ) : (
            <></>
          )}

          <hr />

          <Switch
            id="view-gira"
            text="Mostrar gira"
            checked={showGira}
            handleChange={setShowGira}
            fs="fs-4"
          />

          <BtnCreateGira />
        </div>
      </form>
    </>
  );
};

export default CreateGira;
