import React, { useEffect, useState } from 'react';

// React-router-dom
import { useNavigate, useParams } from 'react-router-dom';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Zusttand
import { useGiras, useImages } from '../../../zustand/giras/giras';
import {
  girasListForAdmin,
  useCreateOrEditGira,
} from '../../../zustand/admin/girasAdmin';

// Components
import Headers from '../admin-options-components/Headers';
import Input from './giras-components/giras/Input';
import TextArea from './giras-components/giras/TextArea';
import Switch from './giras-components/giras/Switch';
import List from './giras-components/giras/List';
import InputDate from './giras-components/giras/InputDate';
import DurationItem from './giras-components/giras/DurationItem';
import BtnCreateGira from './giras-components/giras/BtnCreateGira';
import BtnArchivarGira from './giras-components/giras/BtnArchivarGira';

import InputFile from './giras-components/giras/InputFile';
import {
  archivarGiraFirebase,
  deleteGira,
  getAllGiras,
  getGiras,
  getGirasById,
  saveGira,
  updateGira,
} from '../../../firebase/firestoreGiras/giras';
import {
  deleteImage,
  getImage,
  getNamesOfFile,
  uploadImageGira,
  uploadImagesGira,
} from '../../../firebase/firestoreGiras/imagenesGira';
import InputFileToDeleteImage from './giras-components/giras/InputFileToDeleteImage';
import InputSelectOneImage from './giras-components/giras/InputSelectOneImage';
import { useAlerts } from '../../../zustand/alerts/alerts';
import BtnDeleteGira from './giras-components/giras/BtnDeleteGira';
import BtnSaveGira from './giras-components/giras/BtnSaveGira';

const EditGira = () => {
  const { images: imagesGiras } = useImages();

  // const { giras, setGiras, giraSelected, setGiraSelected, removeGiraSelected } =
  //   useGiras();

  const { giras, setGiras } = girasListForAdmin();
  const { allGiras, setAllGiras } = girasListForAdmin();

  useEffect(() => {
    if (allGiras.length == 0) {
      const f = async () => {
        console.log('first');
        const resGiras = await getAllGiras();
        console.log(resGiras);
        console.warn('Cargando todas las giras de BD');
        setAllGiras(resGiras);
      };
      f();
    }
  }, []);

  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

  const [viewBtnForSaveGira, setViewBtnForSaveGira] = useState(false);

  useEffect(() => {
    const dateInMilliseconds = new Date().getTime();
    giras.map((gira) => {
      if (gira.dateInMilliseconds < dateInMilliseconds) {
        setViewBtnForSaveGira(true);
        alert('Ya esta gira paso');
        return;
      }
    });
  }, [giras]);

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
  } = useCreateOrEditGira();

  // const navigate = useNavigate();

  const { currentId: currentIdOfParams } = useParams();

  useEffect(() => {
    if (allGiras.length == 0) return;
    // console.log(currentId);
    console.log(giras);
    console.log(currentId);
    console.log(allGiras);
    allGiras.forEach(async (gira) => {
      console.log(currentId);
      if (gira.currentId == currentIdOfParams) {
        console.log(gira);
        console.log(gira.idsImages);
        // setGiraSelected(gira);
        // console.log(gira.title);
        setId(gira.id);
        setCurrentId(gira.currentId);
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
  }, [allGiras]);

  const editarGira = async (e) => {
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
      title: '¿Quieres crear esta gira?',
      text: '¿Estas seguro de que quieres crear esta gira? tus usuarios la veran, asi que asegurate de llenar toda la informacion necesaria.',
      confirmButtonText: 'Crear Gira',
    });

    if (!result.isConfirmed) return;

    const promesa = new Promise(async (resolve, reject) => {
      waitingAlert();

      const imagesOfThisCurrentId = [];
      const idsIMagesThatAreInUse = [];
      let newCoverImageId = undefined;

      let resUploadImageGira = true;

      //? PASO 1: cambiar imagen cover si es necesario
      if (coverImage.name != undefined) {
        console.log('Debe subir imagen');
        console.log(1 + 2);
        const newId = uuidv4();
        idsIMagesThatAreInUse.push(newId);
        resUploadImageGira = await uploadImageGira(
          'giras',
          id,
          newId,
          coverImage,
        );
        newCoverImageId = newId;
      }
      // console.log(coverImage);

      //? PASO 2: Pone Id a imagenes nuevas
      // console.log(images);
      let newImagesWithId = [];
      images.forEach((image) => {
        const imageId = uuidv4();
        newImagesWithId.push({ imageId, image });
        idsIMagesThatAreInUse.push(imageId);
        imagesOfThisCurrentId.push(imageId);
      });

      console.log(images);

      //? PASO 7: ids de imagenes de esta gira
      // pathImagesToDelete.forEach((pathImageToDelete) => {
      //   const id = pathImageToDelete.split('/');
      //   imagesOfThisCurrentId.push(id[2]);
      // });
      // console.log(imagesWithId);

      Object.entries(imagesWithId).forEach(([id, link]) => {
        imagesOfThisCurrentId.push(id);
      });

      console.log(images);

      //? PASO 8: Sube nuevas imagenes
      const resUploadImages = await uploadImagesGira(
        'giras',
        id,
        newImagesWithId,
      );

      const newGira = {
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
        coverImageId:
          newCoverImageId != undefined ? newCoverImageId : coverImageId,
        idsImages: imagesOfThisCurrentId,
        showGira: showGira,
      };
      console.log(newGira);

      //? PASO 8: Aqui edito categoria
      const resUpdateGira = await updateGira(currentId, newGira);
      // console.log(res);

      //? PASO 3: Obtiene todas las imagenes que se estan utilizando
      const girasOfId = await getGirasById(id);
      girasOfId.forEach((gira) => {
        if (!idsIMagesThatAreInUse.includes(gira.coverImageId))
          idsIMagesThatAreInUse.push(gira.coverImageId);
      });
      girasOfId.forEach((gira) => {
        gira.idsImages.forEach((image) => {
          if (!idsIMagesThatAreInUse.includes(image))
            idsIMagesThatAreInUse.push(image);
        });
      });
      // Imagenes que aun se utilizan
      console.log('Imagenes que aun se utilizan');
      console.log(idsIMagesThatAreInUse);

      //? PASO 4: Obtiene todas las imagenes de este Id.
      let idsImagesOfThisId = [];
      let resIdsOfFile = await getNamesOfFile(`giras/${id}`);
      resIdsOfFile.forEach((id) => {
        // if (id != coverImageId)
        idsImagesOfThisId.push(id);
      });

      //? PASO 5: se obtiene ids de las imagenes que no voy a utilizar
      const idsImagesToDelete = [];
      // idsImages.forEach((idImage) => {
      idsImagesOfThisId.forEach((idImage) => {
        if (!idsIMagesThatAreInUse.includes(idImage))
          idsImagesToDelete.push(idImage);
        console.log(coverImageId);
      });
      console.log(idsImagesToDelete);

      //? Paso 6: Borrar imagenes
      let resImagesDeleted = await deleteImage('giras', id, idsImagesToDelete);
      console.log(idsImagesToDelete);
      // })

      if (
        resUploadImageGira &&
        resUploadImages &&
        resUpdateGira &&
        girasOfId != false &&
        resIdsOfFile != false &&
        resImagesDeleted
      ) {
        resolve();
      } else {
        reject();
      }
    });

    promesa
      .then(() => {
        successAlert(
          'Gira editada correctamente',
          'Toda la informacion de la gira y todas las imagenes han sido editadas de manera exitosa',
        );
      })
      .catch(() => {
        errorAlert(
          'Error',
          'Ha ocurrido un error al intentar editar la gira, intentelo de nuevo',
        );
      });
  };

  const eliminarGira = async () => {
    const result = await ask({
      title: '¿Quieres eliminar esta gira?',
      text: '¿Estas seguro de que quieres eliminar esta gira? si la eliminas esta gira la eliminaras para siempre y nunca podras recurperla.',
      confirmButtonText: 'Eliminar Gira',
    });

    if (!result.isConfirmed) return;

    const result2 = await ask({
      title: '¿Estas realmente quieres eliminar esta gira?',
      text: '¿Estas seguro de que realmente quieres eliminar esta gira? si la eliminas esta gira la eliminaras para siempre y nunca podras recurperla.',
      confirmButtonText: 'Eliminar Gira',
    });

    if (!result2.isConfirmed) return;

    const promesa = new Promise(async (resolve, reject) => {
      waitingAlert();

      //? PASO 1: EliminarGira de base de datos
      const resDeleteGira = await deleteGira(currentId);

      //? PASO 2: ids de imagenes de esta gira
      const imagesOfThisCurrentId = [];
      Object.entries(imagesWithId).forEach(([id, link]) => {
        imagesOfThisCurrentId.push(id);
      });
      imagesOfThisCurrentId.push(coverImageId);

      //? PASO 3: Obtiene todas las imagenes que se estan utilizando
      const idsIMagesThatAreInUse = [];
      const girasOfId = await getGirasById(id);
      girasOfId.forEach((gira) => {
        if (!idsIMagesThatAreInUse.includes(gira.coverImageId))
          idsIMagesThatAreInUse.push(gira.coverImageId);
      });
      girasOfId.forEach((gira) => {
        gira.idsImages.forEach((image) => {
          if (!idsIMagesThatAreInUse.includes(image))
            idsIMagesThatAreInUse.push(image);
        });
      });
      // Imagenes que aun se utilizan
      console.log('Imagenes que aun se utilizan');
      console.log(idsIMagesThatAreInUse);

      //? PASO 4: Obtiene todas las imagenes de este Id.
      let idsImagesOfThisId = [];
      let resIdsOfFile = await getNamesOfFile(`giras/${id}`);
      resIdsOfFile.forEach((id) => {
        // if (id != coverImageId)
        idsImagesOfThisId.push(id);
      });

      //? PASO 5: se obtiene ids de las imagenes que no voy a utilizar
      const idsImagesToDelete = [];
      // idsImages.forEach((idImage) => {
      idsImagesOfThisId.forEach((idImage) => {
        if (!idsIMagesThatAreInUse.includes(idImage))
          idsImagesToDelete.push(idImage);
        console.log(coverImageId);
      });
      console.log(idsImagesToDelete);

      //? Paso 6: Borrar imagenes
      let resImagesDeleted = await deleteImage('giras', id, idsImagesToDelete);
      console.log(idsImagesToDelete);
      // })

      if (
        resDeleteGira &&
        girasOfId != false &&
        resIdsOfFile != false &&
        resImagesDeleted
      ) {
        resolve();
      } else {
        reject();
      }
    });

    promesa
      .then(() => {
        successAlert(
          'Gira eliminada correctamente',
          'Toda la informacion de la gira y todas las imagenes han sido eliminadas de manera exitosa',
        );
      })
      .catch(() => {
        errorAlert(
          'Error',
          'Ha ocurrido un error al intentar eliminar la gira, intentelo de nuevo',
        );
      });
  };

  const guardarGira = async () => {
    const result = await ask({
      title: '¿Quieres guardar esta gira?',
      text: '¿Estas seguro de que quieres guardar esta gira? si la guardas esta gira estaras confirmando que se realizo la gira exitosamente, asi que sera guardada en el historial.',
      confirmButtonText: 'Guardar Gira',
    });

    if (!result.isConfirmed) return;

    const result2 = await ask({
      title: 'Realmente quieres guardar esta gira?',
      text: '¿Estas realmente seguro de que quieres guardar esta gira? si la guardas esta gira estaras confirmando que se realizo la gira exitosamente, asi que sera guardada en el historial.',
      confirmButtonText: 'Guardar Gira',
    });

    if (!result2.isConfirmed) return;

    waitingAlert();
    const promesa = new Promise(async (resolve, reject) => {
      const res = await saveGira(currentId);

      if (res) resolve();
      else reject();
    });

    promesa
      .then(() => {
        successAlert(
          'Gira guardada correctamente',
          'Toda la informacion de la gira y todas las imagenes han sido guardadas de manera exitosa',
        );
      })
      .catch(() => {
        errorAlert(
          'Error',
          'Ha ocurrido un error al intentar guardar la gira, intentelo de nuevo',
        );
      });
  };

  const archivarGira = async () => {
    const result = await ask({
      title: '¿Quieres archivar esta gira?',
      text: '¿Estas seguro de que quieres archivar esta gira? si archivas esta gira estaras confirmando que se realizo la gira exitosamente, asi que sera guardada en el historial.',
      confirmButtonText: 'Archivar Gira',
    });
    if (!result.isConfirmed) return;
    const result2 = await ask({
      title: 'Realmente quieres archivar esta gira?',
      text: '¿Estas realmente seguro de que quieres archivar esta gira? si la archivas esta gira estaras confirmando que se realizo la gira exitosamente, asi que sera guardada en el historial.',
      confirmButtonText: 'Archivar Gira',
    });
    if (!result2.isConfirmed) return;
    waitingAlert();
    const promesa = new Promise(async (resolve, reject) => {
      const res = await archivarGiraFirebase(currentId);

      if (res) resolve();
      else reject();
    });

    promesa
      .then(() => {
        successAlert(
          'Gira guardada correctamente',
          'Toda la informacion de la gira y todas las imagenes han sido guardadas de manera exitosa',
        );
      })
      .catch(() => {
        errorAlert(
          'Error',
          'Ha ocurrido un error al intentar guardar la gira, intentelo de nuevo',
        );
      });
  };

  return (
    <>
      <Headers text="Gira seleccionada" link={-1} />
      <form onSubmit={editarGira} className="my-4">
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
          handleChange={setDateLimitForCancel}
          value={dateLimitForCancelDetaild}
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
        <Switch
          id="view-gira"
          text="Mostrar gira"
          checked={showGira}
          handleChange={setShowGira}
          fs="fs-4"
        />
        <div className="d-flex gap-4">
          <BtnDeleteGira action={eliminarGira} />
          <BtnCreateGira />
        </div>

        <BtnSaveGira action={guardarGira} />
        <BtnArchivarGira action={archivarGira} />
      </form>
    </>
  );
};

export default EditGira;
