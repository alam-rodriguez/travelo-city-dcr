import React, { useEffect, useState } from 'react';

import { v4 as uuid } from 'uuid';

// Components
import HeaderComments from '../comments-components/HeaderComments';
import { useGiras } from '../../../zustand/giras/giras';
import { useInfoUser } from '../../../zustand/user/user';
import { getUserInfo } from '../../../firebase/users/users';
import { useInfoApp } from '../../../zustand/admin/app/app';
import { getBadgesAndPointsOptions } from '../../../firebase/admin-option/app-options/pointsSettings';
import { getGira } from '../../../firebase/firestoreGiras/giras';
import {
  createCommentGira,
  getCommentsByGira,
  updateComment,
  updateGiraInformationAboutComments,
} from '../../../firebase/firestoreGiras/comments/commentsGira';
import { useNavigate, useParams } from 'react-router-dom';
import { useGirasComments } from '../../../zustand/comments/commentsGiras';
import { useAlerts } from '../../../zustand/alerts/alerts';
import Swal from 'sweetalert2';

const EditCommentGira = () => {
  const navigate = useNavigate();

  const { giraId, giraCurrentId } = useParams();

  const { giraSelected, setGiraSelected } = useGiras();

  const { girasComments, addGirasComments, deleteCommentsGira } =
    useGirasComments();

  const { ask, successAlert, errorAlert, waitingAlert, warningAlert } =
    useAlerts();

  const { sendEmailToAdmins, nameAppLarge } = useInfoApp();

  // useEffect(() => {
  //   if (girasComments[giraId] != undefined) return;
  //   const f = async () => {
  //     const res = await getCommentsByGira(giraId);
  //     console.log(res);
  //     if (res != false) addGirasComments(giraId, res);
  //   };
  //   f();
  // }, []);

  // useEffect(() => {
  //   if (giraSelected.id != undefined) return;

  //   console.log('sigio');
  //   console.log(giraSelected.id);
  //   if (giraSelected.id == undefined) {
  //     const f = async () => {
  //       console.log(giraSelected.id);
  //       console.warn('Buscando gira por Id');
  //       const gira = await getGira(giraCurrentId);
  //       setGiraSelected(gira);
  //     };
  //     f();
  //   }
  // }, []);

  const { badges, hasInfo, setSettingsBadgesAndPoints } = useInfoApp();

  // useEffect(() => {
  //   if (hasInfo) return;
  //   const f = async () => {
  //     const res = await getBadgesAndPointsOptions();
  //     if (res != false) setSettingsBadgesAndPoints(res);
  //   };
  //   f();
  // }, []);

  const {
    userLogged,
    haveUserInfo,
    id,
    setId,
    email,
    setEmail,
    name,
    setName: setNameUser,
    setNameAndSurname,
    setNumber: setNumberUser,
    name: oldName,
    number: oldNumber,
    moneySpent,
    setMoneySpent,
    pointsEarned,
    setPointsEarned,
    pointsSpent,
    setPointsSpent,
    badge: badgeUser,
    calcBadge,
    setBadge,
    type,
    commentSelected,
  } = useInfoUser();

  useEffect(() => {
    if (commentSelected.rate == undefined)
      navigate(`/giras/${giraId}/${giraCurrentId}/comments`);

    setrate(commentSelected.rate);
    setComment(commentSelected.comment);
  }, []);

  // const calcBadge = (num, badges) => {
  //   console.log(badges);
  //   console.log(num);
  //   let badgeSelected = {};
  //   badges.forEach((badge, i) => {
  //     if (num >= badge.minMoney) {
  //       if (i == 0) badgeSelected = badge;
  //       else if (i == badge.length) badgeSelected == badge;
  //       else badgeSelected = badges[i];
  //     }
  //     return;
  //   });
  //   console.log(badgeSelected);
  //   console.log(badges[4 - 1]);
  //   return badgeSelected;
  // };

  useEffect(() => {
    console.log(badges);
    console.log(haveUserInfo);
    console.log(oldName);
    if (haveUserInfo) {
      // setNameAndSurname(oldName);
      // setNumber(oldNumber);
      return;
    }
    const f = async () => {
      console.log('obteniendo user de BD');
      console.log(id);
      if (id == '') return;
      console.log('first');
      const res = await getUserInfo(id);
      console.log(res);
      if (res != false) {
        console.log(res);
        setNameUser(res.name);
        // setNameAndSurname(res.name);
        // setNumberUser(res.number);
        // setNumber(res.number);
        setMoneySpent(res.moneySpent);
        console.warn(res.moneySpent);
        setPointsEarned(res.pointsEarned);
        setPointsSpent(res.pointsSpent);
        // console.log(res);
        // setBadge(res.badge);
      }
      console.warn(res);
    };
    f();
  }, []);

  useEffect(() => {
    if (!haveUserInfo || badges.length == 0) return;
    calcBadge(moneySpent, badges);
  }, [moneySpent, badges]);

  const [rate, setrate] = useState(5);
  const [comment, setComment] = useState('');

  const handleChangeRate = (e) => setrate(e.target.valueAsNumber);
  const handleChangeComment = (e) => setComment(e.target.value);

  const [commenStatus, setCommenStatus] = useState('');

  const handleClickActualizarComentario = async (e) => {
    e.preventDefault();

    console.log(badgeUser);

    if (comment.trim().length < 10) {
      warningAlert(
        'Para publicar tu comentario debes de por lo menos escribir 10 palabras',
      );
      return;
    }

    const resAsk = await ask({
      title: 'Estas seguro ?',
      text: 'Estas seguro de que quieres editar este comentario?, recuerda, todos lo veran.',
      confirmButtonText: 'Publicar',
    });
    if (!resAsk.isConfirmed) return;

    setCommenStatus('subiendo');
    waitingAlert('Actualizando comentario...');

    // const date = new Date();

    // const dateCommentInMilliseconds = date.getTime();
    // const dia = date.getDate();
    // const mes = date.getMonth();
    // const anio = date.getFullYear();

    // const meses = [
    //   'Ene.',
    //   'Feb.',
    //   'Mar.',
    //   'Abr.',
    //   'May.',
    //   'Jun.',
    //   'Jul.',
    //   'Ago.',
    //   'Sept.',
    //   'Oct.',
    //   'Nov.',
    //   'Dic.',
    // ];

    // const badge = calcBadge(moneySpent, badges);

    const commentUpdated = {
      commentId: commentSelected.id,
      rate,
      // userBadged: badge.badge,
      comment,
      userBadged: badgeUser.badge,
    };

    const resUpdateComment = await updateComment(commentUpdated);

    // console.log(resCreateComment);

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
    console.log(commentsGiraCount);
    console.log(sumRate);
    console.log(averageRate);

    const resGiraUpdate = updateGiraInformationAboutComments(
      giraCurrentId,
      commentsGiraCount,
      averageRate,
    );

    if (resUpdateComment && resGiraUpdate) {
      successAlert(
        'Comentario actualizado',
        'Comentario actualizada exitosamente.',
      );
      deleteCommentsGira(giraId);
      sendEmailToAdmins(
        'Comentario actualizado',
        `${commentSelected.name} ha actualizado un comentario en ${nameAppLarge}`,
      );
    } else
      errorAlert(
        'Error',
        'Ha ocurrido un error al intentar actualizar el comentario',
      );
    setCommenStatus('subido');

    // if (resGiraUpdate) console.log('gira actualizada');
    // if (res) console.log('Comentario subido');
  };

  return (
    <>
      <HeaderComments />
      {/* <div> */}
      <form
        onSubmit={handleClickActualizarComentario}
        style={{ paddingTop: 70 }}
      >
        <p className="m-0 fw-medium fs-5">
          Gracias de antemano por tu comentario.
        </p>

        <p className="m-0 mt-4 fw-medium fs-6">
          Su comentario sera publico y estara a la vista de todos, por favor, no
          comente nada ofensivo ni despectivo ni obseno, si publica algo
          inapropiado su comentario sera borrado y su cuenta puede ser vetada.
        </p>

        <p className="m-0 mt-4 fw-medium fs-6">
          Elija la puntuacion que le da a la gira del 1 al 5
        </p>

        <p className="text-center fw-bold fs-4 mb-2 mt-4">
          puntuacion: <span className="color-1">{rate}</span>
        </p>

        <input
          className="w-100"
          type="range"
          min={1}
          max={5}
          step={0.1}
          value={rate}
          onChange={handleChangeRate}
        />

        <p className="mb-2 mt-5 fw-medium">
          Acontinuacion ingresa el comentario que quieres compartir:
        </p>
        <textarea
          className="w-100 bg-transparent border rounded-3 text-black"
          placeholder="Ingresa aqui tu comentario"
          style={{ minHeight: 200 }}
          onChange={handleChangeComment}
          value={comment}
          required
          maxLength={500}
        ></textarea>

        {commenStatus == '' ? (
          <button className=" position-fixed border rounded-3 fw-medium p-2 px-2 fs-5 bottom-0 start-50 translate-middle bg-color mb-4">
            Actualizar comentario
          </button>
        ) : commenStatus == 'subiendo' ? (
          <button
            className="position-fixed border rounded-3 fw-medium p-2 px-2 fs-5 bottom-0 start-50 translate-middle bg-color mb-4"
            type="button"
          >
            Actualizando comentario...
          </button>
        ) : commenStatus == 'subido' ? (
          <button
            className="position-fixed border rounded-3 fw-medium p-2 px-2 fs-5 bottom-0 start-50 translate-middle bg-color mb-4"
            type="button"
          >
            Comentario actualizado
          </button>
        ) : (
          <></>
        )}
      </form>
      {/* </div> */}
    </>
  );
};

export default EditCommentGira;
