import React, { useEffect } from 'react';

// Components
import GiraItem from './GiraItem';
import GirasHeader from './GirasHeader';
import AdminBtns from './btn-from-admin/AdminBtns';

// Zustand
import { useGiras, useImages } from '../../../zustand/giras/giras';

// Firebase
import { getGiras } from '../../../firebase/firestoreGiras/giras';
import { useInfoUser } from '../../../zustand/user/user';

const GirasPage = () => {
  const { giras, setGiras } = useGiras();

  const { images, addImage } = useImages();

  const { userSawGiras, setTrueUserSawGiras } = useInfoUser();

  useEffect(() => {
    const dateInMilliseconds = new Date().getTime();
    giras.map((gira) => {
      if (gira.dateInMilliseconds < dateInMilliseconds)
        alert('Ya esta gira paso');
    });
  }, [giras]);

  // Para quitar animaciones de view de giras
  useEffect(() => {
    if (userSawGiras == true || giras.length == 0) return;
    setTimeout(setTrueUserSawGiras, 1000);
  }, [giras]);

  // useEffect(() => {
  //   if (giras.length == 0) {
  //     const f = async () => {
  //       const resGiras = await getGiras();
  //       // console.log(resGiras);
  //       console.warn('Cargando giras de BD');
  //       setGiras(resGiras);
  //     };
  //     f();
  //   }
  // }, []);

  return (
    <div className="mb-3">
      <GirasHeader images={images} />

      {giras.length > 0 ? (
        <p className="text-center" style={{ fontSize: 13, marginTop: 95 }}>
          {giras.length} giras de TraveloCity
        </p>
      ) : (
        <p className="text-center" style={{ fontSize: 13, marginTop: 95 }}>
          Cargando giras...
        </p>
      )}

      <section className="d-flex flex-wrap justify-content-between">
        {giras.map((gira) => (
          <GiraItem
            // userSawGiras={userSawGiras}
            key={gira.currentId}
            giraId={gira.id}
            currentId={gira.currentId}
            imgId={gira.coverImageId}
            imgPath={`giras/${gira.id}/${gira.coverImageId}`}
            title={gira.title}
            duration={gira.duration}
            hasVotes={gira.hasVotes}
            rate={gira.rate}
            votes={gira.votes}
            canCancel={gira.canCancelFree}
            price={gira.prices.adult}
            gira={gira}
          />
        ))}
      </section>

      <AdminBtns />
    </div>
  );
};

export default GirasPage;
