import React, { useEffect } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Components
import Headers from '../admin-options-components/Headers';
import Input from './giras-components/giras/Input';
import TextArea from './giras-components/giras/TextArea';
import Switch from './giras-components/giras/Switch';
import List from './giras-components/giras/List';
import InputDate from './giras-components/giras/InputDate';
import DurationItem from './giras-components/giras/DurationItem';
import InputFile from './giras-components/giras/InputFile';
import BtnCreateGira from './giras-components/giras/BtnCreateGira';

// React-Router-dom
import { useNavigate, useParams } from 'react-router-dom';

// Zustand
import {
  girasListForAdmin,
  useCreateOrEditGira,
} from '../../../zustand/admin/girasAdmin';
import { useGiras } from '../../../zustand/giras/giras';

import {
  getImage,
  uploadImageGira,
  uploadImagesGira,
} from '../../../firebase/firestoreGiras/imagenesGira';
import InputSelectOneImage from './giras-components/giras/InputSelectOneImage';
import InputFileToDeleteImage from './giras-components/giras/InputFileToDeleteImage';
import { createGiraFirestore } from '../../../firebase/firestoreGiras/giras';
import { useAlerts } from '../../../zustand/alerts/alerts';
import { getBadgesAndPointsOptions } from '../../../firebase/admin-option/app-options/pointsSettings';
import { useInfoApp } from '../../../zustand/admin/app/app';

const RelanzarGira = () => {
  const { giras, setGiras } = girasListForAdmin();

  const navigate = useNavigate();

  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

  const {
    id,
    setId,

    currentId,
    setCurrentId,

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

    images,
    setImages,
    addImages,
    deleteImige,

    pathImagesToDelete,
    addPathImageToDelete,
    pathsImagesOfGira,
    setPathsImagesOfGira,

    imagesWithId,
    addImageWithId,
    deleteImigeWithId,

    idsImages,
    setIdsImages,

    idsImagesToDelete,
    addIdImageToDelete,

    coverImage,
    setCoverImage,
    deleteCoverImage,
    coverImageId,
    setImageCoverId,

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

  const { hasInfo, setSettingsBadgesAndPoints, costo, badges, valuePoint } =
    useInfoApp();
  useEffect(() => {
    if (hasInfo) return;
    const f = async () => {
      const res = await getBadgesAndPointsOptions();
      if (res != false) {
        setSettingsBadgesAndPoints(res);
        setBadgesForThisGira(res.badges);
      }
      console.log(res);
    };
    f();
  }, []);

  const { currentId: currentIdValue } = useParams();

  useEffect(() => {
    if (!hasInfo) return;
    console.log('first');
    // console.log(currentIdValue);
    // console.log(giras);
    giras.forEach(async (gira) => {
      if (gira.currentId == currentIdValue) {
        console.log('first');
        // console.log(gira);
        // console.log(gira.includes);
        // // setGiraSelected(gira);
        // // console.log(gira.title);
        // setTitle(gira.title);
        // setDescription(gira.description);
        // setCity(gira.city);
        // setCountry(gira.country);
        // setLocation(gira.location);
        // setLocationUrl(gira.locationUrl);
        // setMeetingPoint(gira.meetingPoint);
        // setPriceAdult(gira.prices.adult);
        // setPriceChild(gira.prices.child);
        // setPriceBaby(gira.prices.baby);
        // setAboutActivity(gira.aboutActivity);
        // setGeneralData(gira.generalData);
        // setIncludes(gira.includes);
        // setNoIncludes(gira.noIncludes);
        // setUtilInformation(gira.utilInformation);

        // setDate(gira.date);
        // setDateDetaild(gira.dateDetaild);

        // setHour(gira.hourDetaild.hour);
        // setMinute(gira.hourDetaild.minute);
        // setAmORpm(gira.hourDetaild.amORpm);

        // setDateLimitForCancel(gira.dateLimitForCancel);
        // setDateLimitForCancelDetaild(gira.dateLimitForCancelDetaild);

        // setDurationDays(gira.durationDetaild.days);
        // setDurationHours(gira.durationDetaild.hours);
        // setDurationMinutes(gira.durationDetaild.minutes);

        // setImages(gira.images);

        // // set;
        // // setDescription(gira.description);
        // // setCity(gira.city);

        // return;

        console.log(gira);
        console.log(gira.idsImages);
        // setGiraSelected(gira);
        // console.log(gira.title);
        setId(gira.id);
        setTitle(gira.title);
        setDescription(gira.description);
        setCity(gira.city);
        setCountry(gira.country);
        setLocation(gira.location);
        setLocationUrl(gira.locationUrl);
        setMeetingPoint(gira.meetingPoint);
        setPriceAdult(gira.prices.adult);
        setPriceChild(gira.prices.child);
        setPriceBaby(gira.prices.baby);
        setAboutActivity(gira.aboutActivity);
        setGeneralData(gira.generalData);
        setIncludes(gira.includes);
        setNoIncludes(gira.noIncludes);
        setUtilInformation(gira.utilInformation);

        setDate(gira.date);
        setDateDetaild(gira.dateDetaild);
        setDateInMilliseconds(gira.dateInMilliseconds);

        setHour(gira.hourInformation.hour);
        setMinute(gira.hourInformation.minute);
        setAmORpm(gira.hourInformation.amORpm);

        setDateLimitForCancel(gira.dateLimitForCancel);
        setDateLimitForCancelDetaild(gira.dateLimitForCancelDetaild);
        setDateLimitForCancelInMilliseconds(
          gira.dateLimitForCancelInMilliseconds,
        );

        setDurationDays(gira.durationDetaild.days);
        setDurationHours(gira.durationDetaild.hours);
        setDurationMinutes(gira.durationDetaild.minutes);

        setPathsImagesOfGira(gira.idsImages);

        setIdsImages(gira.idsImages);

        setImageCoverId(gira.coverImageId);

        setShowGira(gira.showGira);

        console.log(gira.pointsAndBadgesSettings);

        setActivePoints(gira.pointsAndBadgesSettings.activePoints);
        setActiveDiscountWithPoints(
          gira.pointsAndBadgesSettings.activeDiscountWithPoints,
        );
        setActiveBadges(gira.pointsAndBadgesSettings.activeBadges);
        if (gira.pointsAndBadgesSettings.activeBadges)
          setBadgesForThisGira(gira.pointsAndBadgesSettings.badgesForThisGira);
        else setBadgesForThisGira(badges);

        setPriceInPoint(gira.pointsAndBadgesSettings.priceInPoint);
        // setPriceAdultInPoint(gira.pointsAndBadgesSettings.priceAdultInPoint);
        // setPriceChildInPoint(gira.pointsAndBadgesSettings.priceChildInPoint);
        // setPriceBabyInPoint(gira.pointsAndBadgesSettings.priceBabyInPoint);

        const imgLink = await getImage(`giras/${gira.id}/${gira.coverImageId}`);
        setCoverImage(imgLink);

        let imagesLinks = [];

        gira.idsImages.forEach(async (idImage) => {
          // if (imagesWithId[idImage]) return;
          // console.log('Decargando imagen');

          const imgLink = await getImage(`giras/${gira.id}/${idImage}`);
          console.log(imgLink);
          imagesLinks.push(imgLink);
          addImageWithId(idImage, imgLink);
          // addImages(imgLink);
        });
        // setImages(imagesLinks);

        // setImages(gira.images);

        // set;
        // setDescription(gira.description);
        // setCity(gira.city);

        return;
      }
    });
  }, [hasInfo]);

  const relanzarGira = async (e) => {
    e.preventDefault();

    if (hour == 0 && minute == 0) {
      alert('Debes de ingresar la hora de la gira');
      return;
    } else if (
      durationDays == 0 &&
      durationHours == 0 &&
      durationMinutes == 0
    ) {
      alert('Debes de ingresar la hora de la gira');
      return;
    }

    const result = await ask({
      title: '¿Quieres relanzar esta gira?',
      text: '¿Estas seguro de que quieres relanzar esta gira esta gira? tus usuarios la veran, asi que asegurate de llenar toda la informacion necesaria.',
      confirmButtonText: 'Relanzar Gira',
    });

    if (!result.isConfirmed) return;

    const promise = new Promise(async (resolve, reject) => {
      waitingAlert();

      // console.log(imagesWithId);

      //? PASO 1: para agregar imagen de cover si es necesario
      let newCoverImageId = undefined;
      let resUploadImageCover = true;
      if (coverImage.name != undefined) {
        const newId = uuidv4();
        resUploadImageCover = await uploadImageGira(
          'giras',
          id,
          newId,
          coverImage,
        );
        newCoverImageId = newId;
      }

      const idsImagesGira = [];
      Object.entries(imagesWithId).forEach(([id, link]) => {
        idsImagesGira.push(id);
      });
      console.log(idsImagesGira);

      let newImagesWithId = [];
      images.forEach((image) => {
        const imageId = uuidv4();
        newImagesWithId.push({ imageId, image });
        idsImagesGira.push(imageId);
      });

      const resUploadImages = await uploadImagesGira(
        'giras',
        id,
        newImagesWithId,
      );

      const currentId = uuidv4();

      const newGira = {
        id: id,
        currentId: currentId,
        title: title,
        description: description,
        city: city,
        country: country,
        hasVotes: false,
        // rate: 4.0,
        // votes: 255,
        location: location,
        locationUrl: locationUrl,
        meetingPoint: meetingPoint,
        prices: {
          adult: priceAdult,
          child: priceChild,
          baby: priceBaby,
        },
        aboutActivity: aboutActivity,
        canGo: {
          adultos: true,
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
        coverImageId:
          newCoverImageId != undefined ? newCoverImageId : coverImageId,
        idsImages: idsImagesGira,
        images: images,
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
      console.log(newGira);

      const resCreateGira = await createGiraFirestore(newGira);
      console.log(resCreateGira);

      if (resCreateGira && resUploadImageCover && resUploadImages) {
        resolve();
      } else {
        reject();
      }
    });

    promise
      .then(() => {
        successAlert(
          'Gira relanzada correctamente',
          'Toda la gira ha sido relanzada exitosamente, tus usuarios ya la pueden ver.',
        );
        navigate('/giras');
      })
      .catch(() => {
        errorAlert(
          'Error',
          'Ha ocurrido un error al intentar relanzar la gira, intentelo de nuevo',
        );
      });
  };

  return (
    <>
      <Headers text="Gira seleccionada para relanzar " link={-1} />
      <div className="my-4">
        <form onSubmit={relanzarGira}>
          <Input
            id="titulo"
            label="Titulo"
            value={title}
            placeholder="Titulo gira"
            handleChange={setTitle}
          />
          <Input
            id="description"
            label="Descripcion"
            value={description}
            placeholder="descripcion de gira"
            handleChange={setDescription}
          />
          <Input
            id="coidad"
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
            id="price-chil"
            label="Precio para niños"
            type="number"
            value={priceChild}
            placeholder="precio para niño"
            handleChange={setPriceChild}
          />
          <Input
            id="price-bebe"
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
            value={dateDetaild}
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
                  className="w-75 bg-white text-black border border-secondary"
                  id="dia-noche"
                  value={amORpm}
                  onChange={setAmORpm}
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
            value={dateLimitForCancelDetaild}
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
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            deleteCoverImage={deleteCoverImage}
            // required={coverImage.name === undefined ? false : true}
          />

          <InputFileToDeleteImage
            giraId={id}
            addImages={addImages}
            imagesContainer={imagesWithId}
            newImagesContainer={images}
            onClickToDelete={deleteImigeWithId}
            addPathImageToDelete={addPathImageToDelete}
            // idsImages={idsImages}
            // pathsImagesOfGira={pathsImagesOfGira}
            // addIdImageToDelete={addIdImageToDelete}
          />

          <hr />
          <p>Seccion de puntos y insignias</p>
          <Switch
            id="active-points"
            text="Activar generador de puntos y utilizar puntos"
            checked={activePoints}
            handleChange={setActivePoints}
          />
          {activePoints ? (
            <>
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
          <BtnCreateGira text="Relanzar gira" />
        </form>
      </div>
    </>
  );
};

export default RelanzarGira;
