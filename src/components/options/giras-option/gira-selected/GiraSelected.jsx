import { useEffect } from 'react';

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

  const { giras, giraSelected, setGiraSelected, removeGiraSelected } =
    useGiras();

  const { viewDescription, setViewDescription } = useViewDescription();

  const { viewBtnSeleccionarEntrada: viewBtn } = useViewBtnSeleccionarEntrada();

  const { viewSeleccionarPersonas } = useViewSeleccionarPersonas();

  const { deteleLastAdultoName, deteleLastChildName, deteleLastBebeName } =
    useInfoPeople();

  useEffect(() => {
    // console.log(giraSelected);
    // console.log(giras);
    // console.log(giraId);
    // giras.forEach((gira) => {
    //   if (gira.id == giraId) {
    //     setGiraSelected(gira);
    //     return;
    //   }
    // });
  }, []);

  useEffect(() => {
    // console.log(giraSelected.id);
    if (giraSelected.id == undefined) {
      const f = async () => {
        console.log(giraSelected.id);
        console.warn('Buscando gira por Id');
        const gira = await getGira(currentId);
        // console.log(gira);
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

  if (giraSelected.id == undefined) return <></>;

  return (
    <div>
      <HeaderSelectedGira
        text={!viewDescription ? giraSelected.title : giraSelected.description}
        minLengthToShow={27}
        action={() => {
          navigate(-1);
          removeGiraSelected();
        }}
      />

      <ImagesViwer
        giraId={giraSelected.id}
        coverImageId={giraSelected.coverImageId}
        imagesIds={giraSelected.idsImages}
      />

      <GiraInfo1
        giraDescription={giraSelected.description}
        giraPrice={giraSelected.prices.adult}
      />

      <hr />

      <GiraInfo2
        giraOpinions={giraSelected.votes}
        giraRate={giraSelected.rate}
      />

      <hr />

      <GiraInfo3
        canCancelFree={giraSelected.canCancelFree}
        duration={giraSelected.duration}
        HasVoucherMovil={giraSelected.HasVoucherMovil}
        instandConformation={giraSelected.instandConformation}
      />

      <hr />

      <AboutActivity aboutActivity={giraSelected.aboutActivity} />

      <GeneralData generalData={giraSelected.generalData} />

      <Map GiraUrl={giraSelected.locationUrl} />

      <ActivityUbication giraUbication={giraSelected.location} />

      <MeetingPoint giraMeetingPoint={giraSelected.meetingPoint} />

      <Accordings
        giraIncluye={giraSelected.includes}
        giraNoIncluye={giraSelected.noIncludes}
        giraUtilInformation={giraSelected.utilInformation}
      />

      <CartForReserve
        giraDuration={giraSelected.giraDuration}
        priceAdulto={giraSelected.prices.adult}
        priceChild={giraSelected.prices.child}
        priceBebe={giraSelected.prices.baby}
        fecha={giraSelected.fecha}
        giraFecha={giraSelected.giraFecha}
        hora={`${giraSelected.hourInformation.hour}:${giraSelected.hourInformation.minute} ${giraSelected.hourInformation.amORpm}`}
        canCancelFree={giraSelected.canCancelFree}
        freeCancellationLimit={giraSelected.freeCancellationLimit}
        giraSelected={giraSelected}
      />

      <BtnSeleccionarEntradas />

      <SeleccionarPersonas
        viewSeleccionarPersonas={viewSeleccionarPersonas}
        priceAdulto={giraSelected.prices.adult}
        priceChild={giraSelected.prices.child}
        priceBebe={giraSelected.prices.baby}
        price={giraSelected.price}
        canGoAdulto={giraSelected.canGo.adults}
        canGoChildren={giraSelected.canGo.children}
        canGoBebes={giraSelected.canGo.babies}
        deteleLastAdultoName={deteleLastAdultoName}
        deteleLastChildName={deteleLastChildName}
        deteleLastBebeName={deteleLastBebeName}
      />
    </div>
  );
};

export default GiraSelected;
