import React from 'react';

// Components
import HeaderComments from '../comments-components/HeaderComments';
import Comment from '../comments-components/Comment';

const CommentsGira = () => {
  return (
    <>
      <HeaderComments />
      <div style={{ paddingTop: 70 }}>
        <div className="d-flex align-items-center gap-2">
          <p className="fw-bold fs-5">4.8/5</p>
          <p className="fs-6 text-primary fw-normal">1,333 verified reviews</p>
        </div>

        <p className="m-0 fw-medium">Sort reviews by</p>
        <div className="d-flex border-bottom gap-4">
          <p className="m-0 border-bottom border-danger border-3 py-2">
            Recent
          </p>
          <p className="m-0 py-2">Recent</p>
          <p className="m-0 py-2">Recent</p>
        </div>

        <Comment
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
        />
        <Comment
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
        />
        <Comment
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
        />
        <Comment
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
        />
      </div>
    </>
  );
};

export default CommentsGira;
