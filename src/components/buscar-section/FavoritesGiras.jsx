import React, { useEffect } from 'react';

// Zustans
import { useInfoUser } from '../../zustand/user/user';

// Hooks
import useUserInfoHook from '../../hooks/user/useUserInfoHook';
import FavoriteGira from './FavoriteGira';

const FavoritesGiras = () => {
  const {
    favoritesGirasId,
    userSawGiras,
    favoritesGiras,
    setFavoritesGirasOf,
  } = useInfoUser();

  const { getFavoritesGiras } = useUserInfoHook();

  const { getUserInfoFunc } = useUserInfoHook();

  const { id, haveUserInfo } = useInfoUser();

  useEffect(() => {
    getUserInfoFunc();
    console.log(haveUserInfo);
  }, [id]);

  useEffect(() => {
    console.log(favoritesGirasId);
    getFavoritesGiras();
  }, [favoritesGirasId]);
  useEffect(() => {
    console.log(favoritesGiras);
  }, [favoritesGiras]);

  if (favoritesGiras.length == 0) return <></>;

  return (
    <div>
      <p className="mt-5 fw-medium fs-3">Giras favoritas</p>
      {favoritesGiras.map((gira) => (
        <FavoriteGira
          key={gira.currentId}
          giraId={gira.id}
          currentId={gira.currentId}
          imgId={gira.coverImageId}
          title={gira.description}
          rate={gira.rate}
          votes={gira.votes}
          date={gira.date}
          dateInMilliseconds={gira.dateInMilliseconds}
        />
      ))}
    </div>
  );
};

export default FavoritesGiras;
