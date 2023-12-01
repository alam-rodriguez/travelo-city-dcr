import React from 'react';
import HeaderOptions from '../perfil-components/HeaderOptions';
import LinkBtn from './LinkBtn';

// Icons
import { PiChatsFill } from 'react-icons/pi';
import { IoMdCall } from 'react-icons/io';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

const HelpAndFeedback = () => {
  return (
    <>
      <HeaderOptions text="" link="/perfil" />
      <div className="mt-5">
        <p>
          Tienes alguna pregunta o comentario para nosotros? te estamos
          escuchando.
        </p>

        <LinkBtn text="Chatear ahora" icon={<PiChatsFill className="fs-1" />} />
        <LinkBtn
          text="Visitar el centro de ayuda"
          icon={<BsFillQuestionCircleFill className="fs-1" />}
        />
        <LinkBtn
          text="Llamar a TraveloCity"
          icon={<IoMdCall className="fs-1" />}
        />
        <LinkBtn text="Comparte tu comentario" />
      </div>
    </>
  );
};

export default HelpAndFeedback;
