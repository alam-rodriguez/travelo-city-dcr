import React, { useEffect, useState } from 'react';

// Icons
import { MdArrowBackIosNew } from 'react-icons/md';
import { HiOutlineHeart } from 'react-icons/hi';
import { IoShareOutline } from 'react-icons/io5';

// Zustand
import { useAlerts } from '../../../../../zustand/alerts/alerts';
import { useInfoApp } from '../../../../../zustand/admin/app/app';
import { useInfoUser } from '../../../../../zustand/user/user';
import { FaHeart } from 'react-icons/fa';
import useUserInfoHook from '../../../../../hooks/user/useUserInfoHook';

const HeaderSelectedGira = ({
  currentId,
  text,
  minLengthToShow: ml,
  action,
}) => {
  const { addOrDeleteFaboriteGira } = useUserInfoHook();

  const { ask, successAlert, errorAlert, waitingAlert, warningAlert } =
    useAlerts();

  const { nameAppShort, nameAppLarge } = useInfoApp();

  const { favoritesGirasId } = useInfoUser();

  const handleClickShare = async () => {
    // navigator.clipboard.writeText('Este es el texto a copiar').then(
    //   () => {
    //     successAlert('Copiado', 'La gira a sido copiada correctamente');
    //     console.log('Contenido copiado al portapapeles');
    //     /* Resuelto - texto copiado al portapapeles con éxito */
    //   },
    //   () => {
    //     console.error('Error al copiar');
    //     /* Rechazado - fallo al copiar el texto al portapapeles */
    //   },
    // );
    try {
      if (navigator.share) {
        await navigator.share({
          title: nameAppLarge,
          text: `Pagina oficial de ${nameAppShort} para actividades`,
          url: window.location.href,
        });
        console.log('Enlace compartido con éxito');
      } else {
        console.log(
          'La API de Web Share no está disponible en este navegador.',
        );
      }
    } catch (error) {
      console.error('Error al compartir enlace:', error);
    }
  };

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    let isFavorite = false;
    if (favoritesGirasId.includes(currentId)) isFavorite = true;
    else isFavorite = false;
    setIsFavorite(isFavorite);
  }, [favoritesGirasId]);

  const handleClickAddOrRemoveFavorite = () =>
    addOrDeleteFaboriteGira(currentId);

  return (
    <header
      className="d-flex justify-content-between align-items-center position-fixed start-0 w-100 py-4 bg-white"
      style={{ zIndex: 10 }}
    >
      <MdArrowBackIosNew className="display-6 color-1" onClick={action} />
      {text.length < ml ? (
        <p
          className={`m-0 fs-4 fw-medium position-fixed w-75- start-50 translate-middle-x w-50 overflow-hidden text-center `}
        >
          {text.slice(0, 19)}
        </p>
      ) : (
        <p
          className={`m-0 fs-4 fw-medium position-fixed start-0- translate-middle-x- overflow-hidden text-start ms-4- ps-2- me-5-`}
          style={{ width: '70%', left: 35 }}
        >
          {text.slice(0, ml) + '...'}
        </p>
      )}

      <div className="d-flex gap-4 pe-2 bg-white">
        <IoShareOutline
          className="display-6 color-1"
          onClick={handleClickShare}
        />
        {!isFavorite ? (
          <HiOutlineHeart
            className="display-6"
            onClick={handleClickAddOrRemoveFavorite}
          />
        ) : (
          <FaHeart
            className="display-6 text-danger"
            onClick={handleClickAddOrRemoveFavorite}
          />
        )}
      </div>
    </header>
  );
};

export default HeaderSelectedGira;
