import React, { useEffect } from 'react';

// Components
import HeaderComments from '../comments-components/HeaderComments';
import Comment from '../comments-components/Comment';
import { useGirasComments } from '../../../zustand/comments/commentsGiras';
import { useNavigate, useParams } from 'react-router-dom';

const CommentsGira = () => {
  const navigate = useNavigate();

  const { girasComments, addGirasComments } = useGirasComments();

  const { giraId } = useParams();

  useEffect(() => {
    console.log(giraId);

    addGirasComments(giraId, [
      {
        rate: 4.8,
        name: 'Alam Rodriguez',
        dateReview: 'Sep 14, 2023',
        comment:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, nemoinventore autem, doloribus a neque laborum nobis exercitationem quiquia vel sapiente. Modi autem rem, cupiditate vitae molestiae veroeaque!',
        dateActivity: 'Set 13, 2023',
      },
    ]);
  }, []);

  const click = () => {
    // console.log(girasComments[giraId]);
    girasComments[giraId].forEach((element) => {
      console.log(element);
    });
  };

  const btnForAddNewComment = () => navigate(`/giras/${giraId}/add-comments`);

  return (
    <>
      <HeaderComments />
      <div style={{ paddingTop: 70 }}>
        <div className="d-flex align-items-center gap-2">
          <p className="fw-bold fs-5">4.8/5</p>
          <p className="fs-6 text-primary fw-normal">1,333 verified reviews</p>
        </div>

        <p className="m-0 fw-medium">Sort reviews by</p>

        <div className="d-flex border-bottom gap-4" onClick={click}>
          <p className="m-0 border-bottom border-danger border-3 py-2">
            Recent
          </p>
          <p className="m-0 py-2">Recent</p>
          <p className="m-0 py-2">Recent</p>
        </div>

        {girasComments[giraId] != undefined ? (
          girasComments[giraId].map((comment, i) => (
            <Comment
              key={i}
              rate={comment.rate}
              name={comment.name}
              dateReview={comment.dateReview}
              comment={comment.comment}
              dateActivity={comment.dateActivity}
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

        <div className="d-flex justify-content-center mt-5">
          <button
            className="bg-color border-0 rounded-3 p-2 fs-6 fw-medium"
            onClick={btnForAddNewComment}
          >
            Agregar comentario
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentsGira;
