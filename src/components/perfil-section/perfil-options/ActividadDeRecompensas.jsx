import React, { useEffect } from 'react';

// Icons
import { RiInformationLine } from 'react-icons/ri';
import { PiChatsFill } from 'react-icons/pi';

// Components
import HeaderOptions from '../perfil-components/HeaderOptions';
import TitleAndSubtitle from '../perfil-components/TitleAndSubtitle';
import LinkBtn from './LinkBtn';

// Zustand
import { useInfoUser } from '../../../zustand/user/user';
import { useNavigate } from 'react-router-dom';

const ActividadDeRecompensas = () => {
  const navigate = useNavigate();

  const { haveUserInfo, pointsEarned, pointsSpent, badge } = useInfoUser();

  useEffect(() => {
    if (!haveUserInfo) navigate('/perfil');
  }, []);

  return (
    <>
      <HeaderOptions text="Tus recompensas" link="/perfil" />
      <div className="mt-5">
        <div className=" text-center">
          <p
            className="m-0 d-inline-block fw-medium text-white p-1 px-2 rounded-3 "
            style={{ fontSize: 13, background: '#193082' }}
          >
            {badge.badge}
          </p>
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <p className="m-0" style={{ fontSize: 15 }}>
              Puntos DCR
            </p>
            <RiInformationLine className="" />
          </div>
          <p className="m-0 fw-medium">${pointsEarned - pointsSpent}</p>
        </div>

        {/* <TitleAndSubtitle
          title="Informacion basica"
          subTitle="Make sure this information matches your travel ID, like your passport or license."
        /> */}

        <p className="fw-medium fs-5 mt-5">Tus recompensas por activades</p>

        <LinkBtn
          text="Ordenado por travelocity"
          icon={<PiChatsFill className="fs-1" />}
        />

        <div className="p-1 border rounded-4">
          <p className="text-center fs-3 fw-bold">No recent activity</p>

          <p className="m-0 text-center">
            Tus proximas reservacines que dan recompensas estaran aqui
          </p>
        </div>

        <p className="fw-medium fs-5 mt-5">Aprende mas sobre los dcr points</p>
        <LinkBtn
          text="Los miembros obtienen mas"
          icon={<PiChatsFill className="fs-1" />}
        />
        <LinkBtn
          text="Preguntas frecuentes"
          icon={<PiChatsFill className="fs-1" />}
        />
      </div>
    </>
  );
};

export default ActividadDeRecompensas;
