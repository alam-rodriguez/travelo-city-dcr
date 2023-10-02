import React from 'react';

// Icons
import { BiMobile } from 'react-icons/bi';
import { BsCheck2, BsFillLightningFill } from 'react-icons/bs';
import { TbClockHour5 } from 'react-icons/tb';

// Component
import GiraDetailds from './GiraDetailds';
import { FaRegHourglassHalf } from 'react-icons/fa6';

const GiraInfo3 = ({
  canCancelFree,
  duration,
  HasVoucherMovil,
  instandConformation,
}) => {
  return (
    <div>
      {canCancelFree ? (
        <GiraDetailds
          icon={<BsCheck2 />}
          text="cancelacion gratuita disponible"
          className="text-success fw-medium"
        />
      ) : (
        <></>
      )}

      <GiraDetailds icon={<FaRegHourglassHalf />} text={duration} />

      {HasVoucherMovil ? (
        <GiraDetailds icon={<BiMobile />} text="Voucher movil" />
      ) : (
        <></>
      )}

      {instandConformation ? (
        <GiraDetailds
          icon={<BsFillLightningFill />}
          text="Confirmacion instantanea"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default GiraInfo3;
