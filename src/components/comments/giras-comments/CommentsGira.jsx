import React, { useEffect, useState } from 'react';

// Components
import HeaderComments from '../comments-components/HeaderComments';
import Comment from '../comments-components/Comment';
import { useGirasComments } from '../../../zustand/comments/commentsGiras';
import { useNavigate, useParams } from 'react-router-dom';
import { getCommentsByGira } from '../../../firebase/firestoreGiras/comments/commentsGira';
import { useInfoUser } from '../../../zustand/user/user';
import { getReservationsByEmail } from '../../../firebase/firestoreGiras/reservations/reservations';
import { useGiras } from '../../../zustand/giras/giras';
import { getGira } from '../../../firebase/firestoreGiras/giras';

const CommentsGira = () => {
  const navigate = useNavigate();

  const {
    giras,
    giraSelected,
    viewGiraSelected,
    setGiraSelected,
    removeGiraSelected,
  } = useGiras();

  useEffect(() => {
    console.log(giraSelected.votes);
    console.log(giraSelected.dateInMilliseconds);
    if (giraSelected.id != undefined) return;
    // console.log(giraSelected.hourInformation.amORpm);

    console.log('sigio');
    if (giraSelected.id == undefined) {
      const f = async () => {
        console.log(giraSelected.id);
        console.warn('Buscando gira por Id');
        const gira = await getGira(giraCurrentId);
        console.log(gira);
        setGiraSelected(gira);
      };
      f();
    }
  }, []);

  const { girasComments, addGirasComments, orderComments } = useGirasComments();

  const { giraId, giraCurrentId } = useParams();

  useEffect(() => {
    console.log(giraSelected.votes);
    console.log(giraSelected.rate);
    console.log(giraId);
    // console.log(giraCurrentId);
    if (girasComments[giraId] != undefined) return;

    // console.log(giraId);
    const f = async () => {
      const res = await getCommentsByGira(giraId);
      console.log(giraId);
      console.log(res);
      if (res != false)
        addGirasComments(
          giraId,
          res.sort(
            (a, b) => b.dateCommentInMilliseconds - a.dateCommentInMilliseconds,
          ),
        );
    };
    f();
  }, [girasComments]);

  const handleChangeOrderBy = (e) => orderComments(giraId, e.target.value);
  const setRecienteOrderBy = () => orderComments(giraId, 'recientes');

  const {
    userLogged,
    haveUserInfo,
    id,
    setId,
    name,
    email,
    setEmail,
    setName,
    setNumber,
    name: oldName,
    number: oldNumber,
    moneySpent,
    setMoneySpent,
    pointsEarned,
    setPointsEarned,
    pointsSpent,
    setPointsSpent,
    badge,
    setBadge,
    calcBadge,

    // discount,
    // setDiscount,
    discountPercentWithPoints,
    setDiscountPercentWithPoints,
    discountPercentWithBadge,
    setDiscountPercentWithBadge,

    pointsHasToSpent,
    setPointsHasToSpent,

    discountInMoney,
    setDiscountInMoney,

    userAllReservations,
    userReservations,

    setUserReservations,
    setUserReservationsNotDone,
    setReservations,
  } = useInfoUser();

  useEffect(() => {
    if (email == '' || userAllReservations.length > 0) return;
    const f = async () => {
      console.log(email);
      const res = await getReservationsByEmail(email);
      setReservations(res);
      console.log(res);
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

  const click = () => {
    // console.log(girasComments[giraId]);
    girasComments[giraId].forEach((element) => {
      console.log(element);
    });
  };

  const btnForAddNewComment = () =>
    navigate(`/giras/${giraId}/${giraCurrentId}/add-comments`);

  return (
    <>
      <HeaderComments
        setRecienteOrderBy={setRecienteOrderBy}
        link={`/giras/${giraCurrentId}`}
      />
      <div style={{ paddingTop: 70 }}>
        <div className="d-flex align-items-center gap-2">
          <p className="fw-bold fs-5">{giraSelected.rate ?? 0}/5</p>
          <p className="fs-6 text-primary fw-normal">
            {giraSelected.votes != undefined
              ? giraSelected.votes == 0
                ? 'Sin reseñas'
                : giraSelected.votes == 1
                ? '1 reseña verificada'
                : `${giraSelected.votes} reseñas verificadas`
              : 'Cangando reseñas...'}
          </p>
        </div>

        <p className="m-0 fw-medium">Ordenar por</p>

        <div className="d-flex border-bottom- gap-4 mt-2" onClick={click}>
          <select
            className="w-100- bg-transparent text-black py-2 border-0 fw-medium"
            onChange={handleChangeOrderBy}
          >
            <option value="recientes">Recientes</option>
            <option value="positivos">Positivos</option>
            <option value="criticos">Criticos</option>
          </select>
        </div>

        <hr className="my-1" />

        {/* <div className="d-flex border-bottom gap-4" onClick={click}>
          <p className="m-0 border-bottom border-danger border-3 py-2">
            Recent
          </p>
          <p className="m-0 py-2">Recent</p>
          <p className="m-0 py-2">Recent</p>
        </div> */}

        {girasComments[giraId] != undefined ? (
          girasComments[giraId].map((comment, i) => (
            <Comment
              key={i}
              id={comment.commentId}
              giraId={giraId}
              currentId={giraCurrentId}
              rate={comment.rate}
              name={comment.name}
              userBadged={comment.userBadged}
              dateReview={comment.dateReview}
              comment={comment.comment}
              dateActivity={comment.dateActivity}
              userAllReservations={userAllReservations}
            />
          ))
        ) : (
          <></>
        )}
        {/* <Comment
          rate={4.8}
          name="Jay F"
          placeReview="Reviewed on Expedia"
          dateReview="Sep 14, 2023"
          countryPerson="canada"
          comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, nemo
          inventore autem, doloribus a neque laborum nobis exercitationem qui
          quia vel sapiente. Modi autem rem, cupiditate vitae molestiae vero
          eaque!"
          dateActivity="Set 13, 2023"
        /> */}

        {canComment ? (
          <div className="d-flex justify-content-center mt-5">
            <button
              className="bg-color border-0 rounded-3 p-2 fs-6 fw-medium"
              onClick={btnForAddNewComment}
            >
              Agregar comentario
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CommentsGira;
