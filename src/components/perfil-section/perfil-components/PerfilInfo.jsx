import React from 'react';

// Icons
import { RiInformationLine } from 'react-icons/ri';
import { GrFormNext } from 'react-icons/gr';
import { SiZcash } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

const PerfilInfo = ({ name, email, points, badge }) => {
  const navigate = useNavigate();

  const goToRewardsActivies = () => navigate('/perfil/rewards');

  return (
    <div
      className="bg-white rounded-4  p-3 shadow-sm  position-relative"
      onClick={() => console.log(badge)}
    >
      <div className="mb-3">
        <p className="m-0 fw-medium">Hola, {name}</p>
        <p className="m-0" style={{ fontSize: 13 }}>
          {email}
        </p>
      </div>

      <div className="d-flex align-items-center gap-2">
        <p className="m-0" style={{ fontSize: 15 }}>
          Puntos DCR
        </p>
        <RiInformationLine className="" />
      </div>
      <p className="m-0 fw-medium">${points}</p>

      <div
        className="d-flex justify-content-between align-items-center mt-3"
        onClick={goToRewardsActivies}
      >
        <div className="d-flex gap-3 align-items-center">
          <SiZcash className="fs-2" />
          <p className="m-0 color-1" style={{ color: '#193082' }}>
            ver actividad de recompensas
          </p>
        </div>
        <GrFormNext className="fs-4" />
      </div>

      <p
        className="m-0 d-inline-block position-absolute top-0 end-0 fw-medium text-white p-1 px-2 m-3 rounded-3"
        style={{ fontSize: 13, background: '#193082' }}
      >
        {badge}
      </p>
    </div>
  );
};

export default PerfilInfo;
