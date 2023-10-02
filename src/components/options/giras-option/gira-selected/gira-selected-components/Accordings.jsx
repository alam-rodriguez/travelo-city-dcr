import React from 'react';

// Icons
import { BsCheck2 } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import { TbPointFilled } from 'react-icons/tb';

// Components
import AccordinSection from './AccordinSection';

const Accordings = ({ giraIncluye, giraNoIncluye, giraUtilInformation }) => {
  return (
    <div className="z-0">
      {giraIncluye.length > 0 ? (
        <AccordinSection
          id={1}
          title="Incluye"
          icon={<BsCheck2 className="text-success" />}
          content={giraIncluye}
        />
      ) : (
        <></>
      )}
      {giraNoIncluye.length > 0 ? (
        <AccordinSection
          id={2}
          title="No incluye"
          icon={<GrFormClose />}
          content={giraNoIncluye}
        />
      ) : (
        <></>
      )}
      {giraUtilInformation.length > 0 ? (
        <AccordinSection
          id={3}
          title="Informacion util para antes de reservar"
          icon={<TbPointFilled />}
          content={giraUtilInformation}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Accordings;
