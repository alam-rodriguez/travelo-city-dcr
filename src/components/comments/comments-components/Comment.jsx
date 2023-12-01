import React, { useEffect, useState } from 'react';

// Icons
import { TbEdit } from 'react-icons/tb';
import { MdOutlineDeleteForever } from 'react-icons/md';

// Alerts
import { useAlerts } from '../../../zustand/alerts/alerts';
import {
  deleteComment,
  getCommentsByGira,
  updateGiraInformationAboutComments,
} from '../../../firebase/firestoreGiras/comments/commentsGira';

// Zustand
import { useGirasComments } from '../../../zustand/comments/commentsGiras';
import { useInfoUser } from '../../../zustand/user/user';
import { useNavigate } from 'react-router-dom';

const Comment = ({
  id,
  giraId,
  currentId,
  rate,
  name,
  placeReview,
  userBadged,
  dateReview,
  countryPerson,
  comment,
  dateActivity,
  userAllReservations,
}) => {
  const navigate = useNavigate();

  const { type, setCommentSeleted } = useInfoUser();

  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (userAllReservations.length == 0) return;
    const idsGirauserwent = [];
    userAllReservations.forEach((reservation) => {
      idsGirauserwent.push(reservation.giraId);
    });
    console.log(idsGirauserwent);
    if (idsGirauserwent.includes(giraId)) setCanEdit(true);
  }, [userAllReservations]);

  const { girasComments, addGirasComments, deleteCommentsGira } =
    useGirasComments();

  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

  const handleClickEdit = () => {
    console.log(id);
    console.log('Edit');
    setCommentSeleted({ id, rate, comment });
    navigate(`edit-comments`);
  };

  const handleClickDelete = async () => {
    const want = await ask({
      title: 'Quieres borrar este comentario?',
      text: 'Estas realmente seguro de que quieres borrar este comentario, se borrara para siempre.',
      confirmButtonText: 'Borrar comentario',
    });
    if (!want.isConfirmed) return;
    const want2 = await ask({
      title: 'Quieres borrar este comentario?',
      text: 'Estas realmente seguro de que quieres borrar este comentario, se borrara para siempre.',
      confirmButtonText: 'Borrar comentario',
    });
    if (!want2.isConfirmed) return;
    waitingAlert('Borrando comentario');

    const res = await deleteComment(id);

    let commentsGiraCount = 0;
    let sumRate = 0;
    const comments = await getCommentsByGira(giraId);
    comments.forEach((comment) => {
      commentsGiraCount += 1;
      sumRate += comment.rate;
    });
    const averageRate =
      commentsGiraCount > 0
        ? Number((sumRate / commentsGiraCount).toFixed(1))
        : 0;

    const resGiraUpdate = updateGiraInformationAboutComments(
      currentId,
      commentsGiraCount,
      averageRate,
    );

    if (res && resGiraUpdate) {
      await successAlert(
        'Comentario borrado',
        'El comentario ha sido borrado exitosamente',
      );
      deleteCommentsGira(giraId);
    } else
      errorAlert(
        'Error',
        'Ha ocurrido un error al intentar borrar el comentario, intentelo de nuevo.',
      );
  };

  return (
    <div
      className={`border-bottom py-4  position-relative ${
        canEdit ? 'bg-danger-subtle rounded-4' : ''
      }`}
    >
      <p className="mb-1 fw-medium" style={{ fontSize: 16 }}>
        {rate}/5
      </p>
      <p className="m-0 fw-medium" style={{ fontSize: 15 }}>
        {name}
      </p>
      <p className="m-0 text-secondary" style={{ fontSize: 14 }}>
        {dateReview}
      </p>
      <p className="m-0 text-secondary" style={{ fontSize: 14 }}>
        Insignia: <span className="text-black">Viajero {userBadged}</span>
      </p>
      <p className="mb-1 overflow-scroll" style={{ fontSize: 15 }}>
        {comment}
      </p>
      <p className="m-0 text-secondary" style={{ fontSize: 12 }}>
        Fecha de actividad: {dateActivity}
      </p>

      {canEdit || type == 'admin' || type == 'semi-admin' ? (
        <div className="position-absolute end-0 top-0 m-4 d-flex gap-3">
          <TbEdit className="fs-3 text-primary" onClick={handleClickEdit} />
          <MdOutlineDeleteForever
            className="fs-3 text-danger"
            onClick={handleClickDelete}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comment;
