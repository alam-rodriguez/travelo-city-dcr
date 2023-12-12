import React, { useEffect, useState } from 'react';

// Icon
import { BsChevronRight } from 'react-icons/bs';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zustand
import { useInfoApp } from '../../../../../zustand/admin/app/app';
import { getReservationsByEmail } from '../../../../../firebase/firestoreGiras/reservations/reservations';
import { useInfoUser } from '../../../../../zustand/user/user';
import { useAlerts } from '../../../../../zustand/alerts/alerts';

const GiraInfo2 = ({ giraId, giraCurrentId, giraRate, giraOpinions }) => {
  const navigate = useNavigate();

  const { nameAppShort } = useInfoApp();

  const { type, email, userAllReservations, setReservations } = useInfoUser();

  const { infoAlert } = useAlerts();

  useEffect(() => {
    if (email == '' || userAllReservations.length > 0) return;
    const f = async () => {
      const res = await getReservationsByEmail(email);
      setReservations(res);
    };
    f();
  }, [email]);

  const [canComment, setCanComment] = useState(false);
  useEffect(() => {
    userAllReservations.forEach((reservation) => {
      if (reservation.giraId == giraId) {
        setCanComment(true);
        return;
      }
    });
  }, [userAllReservations]);

  const addComment = () => {
    if (canComment || type == 'admin' || type == 'semi-admin')
      navigate(`/giras/${giraId}/${giraCurrentId}/add-comments`);
    else
      infoAlert(
        'No puedes comentar',
        'Para poder comentar debes haber asistido a alguna gira de estas.',
      );
  };

  const seeComments = () =>
    navigate(`/giras/${giraId}/${giraCurrentId}/comments`);

  if (giraOpinions == 0)
    return (
      <div className="d-flex align-items-center color-1" onClick={addComment}>
        <p className="m-0">Publicar comentario</p>
        <BsChevronRight />
      </div>
    );
  return (
    <>
      <p>
        <span className="fw-bold fs-3">{giraRate}/5</span> {giraOpinions}{' '}
        opiniciones de {nameAppShort}
      </p>
      <div className="d-flex align-items-center color-1" onClick={seeComments}>
        <p className="m-0">ver todas las opiniones</p>
        <BsChevronRight />
      </div>
    </>
  );
};

export default GiraInfo2;
