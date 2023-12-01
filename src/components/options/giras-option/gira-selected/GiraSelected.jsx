import { useEffect, useState } from 'react';

// React-router-om
import { Link, useNavigate, useParams } from 'react-router-dom';

// Zustand
import {
  useGiras,
  useViewDescription,
  useViewBtnSeleccionarEntrada,
  useViewSeleccionarPersonas,
  useInfoPeople,
} from '../../../../zustand/giras/giras';

// Components
import HeaderSelectedGira from './gira-selected-components/HeaderSelectedGira';

// Icons
import { BiImages, BiMobile } from 'react-icons/bi';
import {
  BsCheck2,
  BsChevronRight,
  BsFillLightningFill,
  BsPersonFill,
} from 'react-icons/bs';
import { TbClockHour5, TbPointFilled } from 'react-icons/tb';
import { GrFormClose } from 'react-icons/gr';
import { FaImages } from 'react-icons/fa';
import { RiInformationLine } from 'react-icons/ri';

import ImagesViwer from './gira-selected-components/ImagesViwer';
import FirstInfo from './gira-selected-components/GiraDetailds';
import AccordinSection from './gira-selected-components/AccordinSection';
import CartForReserve from './gira-selected-components/cart-fort-reserve/CartForReserve';
import SeleccionarPersonas from './seleccionar-personas/SeleccionarPersonas';
import GiraInfo1 from './gira-selected-components/GiraInfo1';
import GiraInfo2 from './gira-selected-components/GiraInfo2';
import GiraDetailds from './gira-selected-components/GiraDetailds';
import GiraInfo3 from './gira-selected-components/GiraInfo3';
import AboutActivity from './gira-selected-components/AboutActivity';
import GeneralData from './gira-selected-components/GeneralData';
import Map from './gira-selected-components/Map';
import ActivityUbication from './gira-selected-components/ActivityUbication';
import MeetingPoint from './gira-selected-components/MeetingPoint';
import Accordings from './gira-selected-components/Accordings';
import BtnSeleccionarEntradas from './gira-selected-components/BtnSeleccionarEntradas';
import { getGira } from '../../../../firebase/firestoreGiras/giras';

const GiraSelected = () => {
  const { currentId } = useParams();
  const navigate = useNavigate();

  const {
    giras,
    giraSelected,
    viewGiraSelected,
    setGiraSelected,
    removeGiraSelected,
  } = useGiras();

  const { viewDescription, setViewDescription } = useViewDescription();

  const { viewBtnSeleccionarEntrada: viewBtn } = useViewBtnSeleccionarEntrada();

  const { viewSeleccionarPersonas } = useViewSeleccionarPersonas();

  const { deteleLastAdultoName, deteleLastChildName, deteleLastBebeName } =
    useInfoPeople();

  useEffect(() => {
    console.log(giraSelected.dateInMilliseconds);
    if (giraSelected.id != undefined) return;
    // console.log(giraSelected.hourInformation.amORpm);

    console.log('sigio');
    if (giraSelected.id == undefined) {
      const f = async () => {
        console.log(giraSelected.id);
        console.warn('Buscando gira por Id');
        const gira = await getGira(currentId);
        setGiraSelected(gira);
      };
      f();
    }
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 233) setViewDescription(true);
    else setViewDescription(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (giraSelected.id == undefined) return <div>Cargando...</div>;

  return (
    <div className="scale-up-center-" onClick={() => console.log(giraSelected)}>
      <HeaderSelectedGira
        text={
          !viewDescription
            ? giraSelected.title ?? ''
            : giraSelected.description ?? ''
        }
        minLengthToShow={27}
        action={() => navigate('/giras')}
      />

      <ImagesViwer
        giraId={giraSelected.id ?? 0}
        coverImageId={giraSelected.coverImageId ?? null}
        imagesIds={giraSelected.idsImages ?? []}
      />

      <GiraInfo1
        giraDescription={giraSelected.description ?? ''}
        giraPrice={giraSelected.prices.adult ?? 0}
      />

      <hr />

      <GiraInfo2
        giraId={giraSelected.id ?? 0}
        giraCurrentId={giraSelected.currentId}
        giraOpinions={giraSelected.votes ?? 0}
        giraRate={giraSelected.rate ?? 0}
      />

      <hr />

      <GiraInfo3
        canCancelFree={giraSelected.canCancelFree ?? true}
        duration={giraSelected.duration ?? 0}
        HasVoucherMovil={giraSelected.HasVoucherMovil ?? true}
        instandConformation={giraSelected.instandConformation ?? true}
      />

      <hr />

      <AboutActivity aboutActivity={giraSelected.aboutActivity ?? ''} />

      <GeneralData generalData={giraSelected.generalData ?? []} />

      <Map GiraUrl={giraSelected.locationUrl} />

      <ActivityUbication giraUbication={giraSelected.location ?? ''} />

      <MeetingPoint giraMeetingPoint={giraSelected.meetingPoint ?? ''} />

      <Accordings
        giraIncluye={giraSelected.includes ?? []}
        giraNoIncluye={giraSelected.noIncludes ?? []}
        giraUtilInformation={giraSelected.utilInformation ?? []}
      />

      <CartForReserve
        giraDuration={giraSelected.giraDuration ?? 0}
        priceAdulto={giraSelected.prices.adult ?? 0}
        priceChild={giraSelected.prices.child ?? 0}
        priceBebe={giraSelected.prices.baby ?? 0}
        fecha={giraSelected.date ?? ''}
        giraFecha={giraSelected.giraFecha ?? ''}
        hora={`${giraSelected.hourInformation.hour ?? 0}:${
          giraSelected.hourInformation.minute ?? 0
        } ${giraSelected.hourInformation.amORpm ?? 'a.m'}`}
        canCancelFree={giraSelected.canCancelFree ?? true}
        freeCancellationLimit={giraSelected.freeCancellationLimit ?? 0}
        dateLimitForCancel={giraSelected.dateLimitForCancel ?? ''}
        giraSelected={giraSelected ?? {}}
      />

      <BtnSeleccionarEntradas />

      <SeleccionarPersonas
        viewSeleccionarPersonas={viewSeleccionarPersonas ?? false}
        priceAdulto={giraSelected.prices.adult ?? 0}
        priceChild={giraSelected.prices.child ?? 0}
        priceBebe={giraSelected.prices.baby ?? 0}
        price={giraSelected.price ?? 0}
        canGoAdulto={giraSelected.canGo.adults ?? true}
        canGoChildren={giraSelected.canGo.children ?? true}
        canGoBebes={giraSelected.canGo.babies ?? true}
        deteleLastAdultoName={deteleLastAdultoName}
        deteleLastChildName={deteleLastChildName}
        deteleLastBebeName={deteleLastBebeName}
      />
    </div>
  );
};

export default GiraSelected;
