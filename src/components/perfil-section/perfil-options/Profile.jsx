import React, { useEffect } from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Components
import HeaderOptions from '../perfil-components/HeaderOptions';
import TitleAndSubtitle from '../perfil-components/TitleAndSubtitle';
import TitleAndSubtitleLittle from '../perfil-components/TitleAndSubtitleLittle';

// Zustand
import { useInfoUser } from '../../../zustand/user/user';

const Profile = () => {
  const navigate = useNavigate();

  const {
    userLogged,
    haveUserInfo,
    id,
    setId,
    name,
    email,
    setEmail,
    setName,
    number,
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
  } = useInfoUser();

  useEffect(() => {
    if (!haveUserInfo) navigate('/perfil');
  }, []);

  return (
    <>
      <HeaderOptions text={name} link="/perfil" />
      <div>
        <div className="mt-4">
          <div className="mb-5">
            <TitleAndSubtitle
              title="Informacion basica"
              subTitle="Debes estar seguro de que esta informacion encaja contigo, como tu pasaporte y licencia."
            />

            <div className="my-3">
              <TitleAndSubtitleLittle keyValue="Nombre" value={name} />
              <TitleAndSubtitleLittle
                keyValue="Biografia"
                value="No provisto"
              />
              <TitleAndSubtitleLittle
                keyValue="Fecha de nacimiento"
                value="No provisto"
              />
              <TitleAndSubtitleLittle keyValue="Genero" value="No provisto" />
              <TitleAndSubtitleLittle
                keyValue="Necesidades de accesibilidad"
                value="No provisto"
              />
            </div>
          </div>

          <div className="mb-5">
            <TitleAndSubtitle
              title="Contacto"
              subTitle="Reciba alertas de actividad de la cuenta y actualizaciones de viajes compartiendo esta información."
            />

            <div className="my-3">
              <TitleAndSubtitleLittle keyValue="Numero mobil" value={number} />
              <TitleAndSubtitleLittle keyValue="Email" value={email} />
              <TitleAndSubtitleLittle
                keyValue="Contacto de emergencia"
                value="No provisto"
              />
              <TitleAndSubtitleLittle
                keyValue="Direccion"
                value="No provisto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
