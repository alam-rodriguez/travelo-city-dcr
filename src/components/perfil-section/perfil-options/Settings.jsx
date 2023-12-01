import React from 'react';

// Components
import HeaderOptions from '../perfil-components/HeaderOptions';
import TitleAndSubtitle from '../perfil-components/TitleAndSubtitle';
import LinkBtn from './LinkBtn';

// Icon
import { BsFillQuestionCircleFill } from 'react-icons/bs';

const Settings = () => {
  return (
    <>
      <HeaderOptions text="Ajustes" link="/perfil" />
      <div className="mt-5">
        <TitleAndSubtitle
          title="Inicio de sesion y seguridad"
          subTitle="Manten tu cuentasegura con una contraseña seguro y cerrando sesion en los dispositivos que no estas usando"
        />
        <LinkBtn text="Email" />
        <LinkBtn text="Cambiar contraseña" />
        <LinkBtn text="Dispositivos conectados" />
      </div>
    </>
  );
};

export default Settings;
