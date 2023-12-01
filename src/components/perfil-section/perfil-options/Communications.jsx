import React from 'react';
import HeaderOptions from '../perfil-components/HeaderOptions';
import LinkBtn from './LinkBtn';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { useInfoApp } from '../../../zustand/admin/app/app';

const Communications = () => {
  const { hasInfo, nameAppShort, nameAppLarge } = useInfoApp();

  return (
    <>
      <HeaderOptions text="Comunicacion" link="/perfil" />
      <div className="mt-5">
        <p>Controla cuales notificaciones vas a recibir.</p>
        <LinkBtn text={nameAppShort} />
        <p>
          Selecciona como notificar tu cuenta sobre actualizaciones de
          recompensas.
        </p>
        <LinkBtn text="Travelocity" />
        <LinkBtn text="Travelocity" />
      </div>
    </>
  );
};

export default Communications;
