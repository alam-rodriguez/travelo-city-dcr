import { useEffect } from 'react';
import './App.css';

// React-Router-dom
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

// Components de admin
import CreateGira from './components/admin-options/giras/CreateGira';
// import ListGiras from './components/admin-options/giras/ListGiras';
import EditGira from './components/admin-options/giras/EditGira';
import ListRelanzarGira from './components/admin-options/giras/lists/ListRelanzarGira';
import RelanzarGira from './components/admin-options/giras/RelanzarGira';
import ListEditarGiras from './components/admin-options/giras/lists/ListEditarGiras';

// Components
import Inicio from './components/Inicio';
import Buscar from './components/buscar-section/Buscar';
import MisViajes from './components/viajes-section/MisViajes';
import ChatIcon from './components/nav-var-footer/ChatIcon';
import NavBar from './components/nav-var-footer/NavBar';
import GirasPage from './components/options/giras-option/GirasPage';
import GiraSelected from './components/options/giras-option/gira-selected/GiraSelected';
import ReservarGira from './components/options/giras-option/reservar-gira/ReservarGira';

// Zustand
import { useGiras } from './zustand/giras/giras';

// Firebase
import { getGiras } from './firebase/firestoreGiras/giras';
import CommentsGira from './components/comments/giras-comments/CommentsGira';
import AdminIcon from './components/nav-var-footer/AdminIcon';
import AdminOptions from './components/admin-options/AdminOptions';
import { signInAutomatically } from './firebase/authentication/authWithGoogle';
import { useInfoUser } from './zustand/user/user';
import ListGirasForReservations from './components/admin-options/giras/giras-reservaciones/ListGirasForReservations';
import ReservationsOfGira from './components/admin-options/giras/giras-reservaciones/ReservationsOfGira';
import ListGirasDoneForReservations from './components/admin-options/giras/giras-reservaciones/ListGirasDoneForReservations';
import ListAllReservations from './components/admin-options/giras/giras-reservaciones/all-reservations/ListAllReservations';
import ListGirasArchivadas from './components/admin-options/giras/giras-archivadas/ListGirasArchivadas';
import GiraArchivada from './components/admin-options/giras/giras-archivadas/GiraArchivada';
import Sugerencia from './components/inicio/sugerencias/sugerencias-components/Sugerencia';
import CrearSugerencia from './components/admin-options/sugerencias/CrearSugerencia';
// import EstadisticasGiras from './components/admin-options/estadisticas/lists/ListEstadisticasActivas';
import ListEstadisticasActivas from './components/admin-options/estadisticas/lists/ListEstadisticasActivas';
import EstadisticaGira from './components/admin-options/estadisticas/EstadisticaGira';
import OpcionesGiras from './components/admin-options/sub-admin-options/OpcionesGiras';
import OpcionesReservacionesGiras from './components/admin-options/sub-admin-options/OpcionesReservacionesGiras';
import OpcionesEstadisticasGiras from './components/admin-options/sub-admin-options/OpcionesEstadisticasGiras';
import opcionesSugerencias from './components/admin-options/sub-admin-options/opcionesSugerencias';
import RoutesForUser from './routes/RoutesForUser';
import EstadisticasUsers from './components/admin-options/estadisticas/EstadisticasUsers';
import TodasLasEstadisticas from './components/admin-options/estadisticas/TodasLasEstadisticas';
import ListSugerencias from './components/admin-options/sugerencias/ListSugerencias';
import EditarSugerencia from './components/admin-options/sugerencias/EditarSugerencia';
import ListTodasLasGiras from './components/admin-options/giras/giras-todas/ListTodasLasGiras';
import ListGirasActivas from './components/admin-options/giras/giras-activas/ListGirasActivas';
import ListGirasRealizadas from './components/admin-options/giras/giras-realizadas/ListGirasRealizadas';
import ViewReservationSelected from './components/admin-options/giras/giras-reservaciones/ViewReservationSelected';
import ReservacionesCanceladasEnGirasActivas from './components/admin-options/giras/giras-reservaciones/cancelaciones/ReservacionesCanceladasEnGirasActivas';
import OpcionesApp from './components/admin-options/sub-admin-options/OpcionesApp';
// import PointsOptions from './components/admin-options/app-options/PointsOptions';
// import BadgesOptions from './components/admin-options/app-options/BadgesOptions';
import BadgesAndPointsOptions from './components/admin-options/app-options/BadgesOptions';
import AddCommentGira from './components/comments/giras-comments/AddCommentGira';
import Perfil from './components/perfil-section/Perfil';
import OpcionesCommentsGiras from './components/admin-options/giras/giras-comment/OpcionesCommentsGiras';
import MiGiraDetailed from './components/viajes-section/mis-giras/MiGiraDetailed';
import SignInLikeAdmin from './components/admin-options/signIn/SignInLikeAdmin';
import { getUserInfo } from './firebase/users/users';
import ChangeAppName from './components/admin-options/app-options/ChangeAppName';
import { getInfoApp } from './firebase/admin-option/app-options/appName';
import { useInfoApp } from './zustand/admin/app/app';
import SignInLikeSemiAdmin from './components/admin-options/signIn/SignInLikeSemiAdmin';
import MisGirasRealizadas from './components/viajes-section/mis-giras/MisGirasRealizadas';
import EditCommentGira from './components/comments/giras-comments/EditCommentGira';
import Profile from './components/perfil-section/perfil-options/Profile';
import Communications from './components/perfil-section/perfil-options/Communications';
import Payments from './components/perfil-section/perfil-options/Payments';
import Coupons from './components/perfil-section/perfil-options/Coupons';
import Credits from './components/perfil-section/perfil-options/Credits';
import Reviews from './components/perfil-section/perfil-options/Reviews';
import Settings from './components/perfil-section/perfil-options/Settings';
import HelpAndFeedback from './components/perfil-section/perfil-options/HelpAndFeedback';
import ActividadDeRecompensas from './components/perfil-section/perfil-options/ActividadDeRecompensas';
import ListGirasArchivadasForReservations from './components/admin-options/giras/giras-reservaciones/ListGirasArchivadasForReservations';
import EstadisticasGirasRealizadas from './components/admin-options/estadisticas/por-giras/EstadisticasGirasRealizadas';
import EstadisticasGirasArchivadas from './components/admin-options/estadisticas/por-giras/EstadisticasGirasArchivadas';
import EstadisticasAllGiras from './components/admin-options/estadisticas/por-giras/EstadisticasAllGiras';
import EstadisticaUsuario from './components/admin-options/estadisticas/usuarios/EstadisticaUsuario';
import GrupoDegirasList from './components/admin-options/estadisticas/por-grupos-de-giras/GrupoDegirasList';
import GrupoSeleccionado from './components/admin-options/estadisticas/por-grupos-de-giras/GrupoSeleccionado';
// import ChangeAppName from './components/admin-options/app-options/ChangeAppName';
// import ManejadorGiras from './components/admin-options/sub-admin-options/OpcionesGiras';

const routesForUser = [{ path: '/', component: Inicio }];

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isAdmin,
    userLogged,
    haveUserInfo,
    id,
    setId,
    email,
    setEmail,
    setName,
    setNumber,
    setMoneySpent,
    setPointsEarned,
    setPointsSpent,
    type,
    setType,
  } = useInfoUser();

  useEffect(() => {
    if (
      location.pathname.split('/')[1] == 'admin-options' &&
      ((haveUserInfo && type == 'customer') || type == 'anonymous')
    )
      navigate('/');
  }, [location, type]);

  // const { haveUserInfo, type } = useInfoUser();
  // useEffect(() => {
  //   if ((haveUserInfo && type == 'customer') || type == 'anonymous')
  //     navigate('/');
  // }, [type]);

  const iniciarSesion = async () => {
    if (userLogged) return;

    try {
      const infoUser = await signInAutomatically();
      setEmail(infoUser.email);
      setId(infoUser.id);
      setType('customer');
    } catch (e) {
      console.log(e);
      setType('anonymous');
    }
    // console.log('first');
    // console.log(infoUser);
    // console.warn('-----------------');
    //  else {
    //   console.log('first');

    // }
    // console.warn('-----------------');
  };

  const {
    hasInfo,
    setSettingsBadgesAndPoints,
    nameAppShort,
    nameAppLarge,
    setNamesApp,
    adminsEmails,
    semiAdminsEmails,
    setEmailsAdmins,
  } = useInfoApp();

  const { giras, setGiras } = useGiras();

  const getInfoAppFunc = async () => {
    if (hasInfo) return;
    const res = await getInfoApp();
    console.log(res);
    setNamesApp(res.appNames);
    setEmailsAdmins(res.admins);
    setSettingsBadgesAndPoints(res.settignsPoints);
  };

  useEffect(() => {
    // const ff = async () => {
    console.log('first');
    iniciarSesion();
    getInfoAppFunc();
    // };
    // ff();
    if (giras.length == 0) {
      const f = async () => {
        const resGiras = await getGiras();
        if (resGiras != false) setGiras(resGiras);
        // console.warn('Cargando giras de BD');
        console.log(resGiras);
      };
      f();
    }
  }, []);

  useEffect(() => {
    if (!hasInfo) return;
    adminsEmails.forEach((emailAdmin) => {
      if (emailAdmin == email) setType('admin');
    });
    semiAdminsEmails.forEach((emailSemiAdmin) => {
      if (emailSemiAdmin == email) setType('semi-admin');
    });
  }, [hasInfo]);

  // useEffect(() => {
  //   if (haveUserInfo || id == '') return;

  //   const f = async () => {
  //     console.log('obteniendo user de BD');
  //     // if (id == '') return;
  //     const res = await getUserInfo(id);
  //     console.log(res);
  //     if (res != false) {
  //       setName(res.name);
  //       setEmail(res.email);
  //       setNumber(res.number);
  //       setMoneySpent(res.moneySpent);
  //       setPointsEarned(res.pointsEarned);
  //       setPointsSpent(res.pointsSpent);
  //       setType(res.type);
  //       console.log(res.type);
  //     }
  //     console.warn(res);
  //   };
  //   f();
  // }, [id]);

  return (
    <div className="App bg-light">
      <main
        className="container pb-5- pt-5- pb-4 bg-light"
        style={{ marginTop: 0 }}
      >
        <Routes>
          {/* <RoutesForUser routess={routesForUser} /> */}
          {/* <RoutesForUser /> */}
          <Route path="/" Component={Inicio} />
          <Route path="/buscar" Component={Buscar} />
          <Route path="/mis-giras" Component={MisViajes} />
          <Route
            path="/mis-giras/giras-pasadas"
            Component={MisGirasRealizadas}
          />
          <Route path="/mis-giras/:reservationId" Component={MiGiraDetailed} />
          <Route path="/giras" Component={GirasPage} />
          <Route path="/giras/:currentId" Component={GiraSelected} />
          <Route path="/giras/reservar-gira" Component={ReservarGira} />
          <Route
            path="giras/:giraId/:giraCurrentId/comments"
            Component={CommentsGira}
          />
          <Route
            path="giras/:giraId/:giraCurrentId/add-comments"
            Component={AddCommentGira}
          />
          <Route
            path="giras/:giraId/:giraCurrentId/comments/edit-comments"
            Component={EditCommentGira}
          />
          <Route path="/sugerencia/:id" Component={Sugerencia} />
          <Route path="/perfil" Component={Perfil} />
          <Route path="/perfil/rewards" Component={ActividadDeRecompensas} />
          <Route path="/perfil/profile" Component={Profile} />
          <Route path="/perfil/communications" Component={Communications} />
          <Route path="/perfil/Payments" Component={Payments} />
          <Route path="/perfil/coupons" Component={Coupons} />
          <Route path="/perfil/credits" Component={Credits} />
          <Route path="/perfil/reviews" Component={Reviews} />
          <Route path="/perfil/settings" Component={Settings} />
          <Route path="/perfil/help-and-feedback" Component={HelpAndFeedback} />
          {/* Components de admin */}
          <Route path="/admin-options" Component={AdminOptions} />
          <Route path="/admin-options/opciones-app" Component={OpcionesApp} />
          <Route
            path="/admin-options/opciones-app/change-name-app"
            Component={ChangeAppName}
          />
          {/* <Route
            path="/admin-options/opciones-app/opciones-puntos"
            Component={PointsOptions}
          /> */}
          <Route
            path="/admin-options/opciones-app/opciones-insignias-y-puntos"
            Component={BadgesAndPointsOptions}
          />
          <Route
            path="/admin-options/opciones-giras"
            Component={OpcionesGiras}
          />
          <Route path="/admin-options/create-gira" Component={CreateGira} />
          <Route
            path="/admin-options/giras-editar"
            Component={ListEditarGiras}
          />
          <Route
            path="/admin-options/giras-editar/:currentId"
            Component={EditGira}
          />
          <Route
            path="/admin-options/giras-relanzar"
            Component={ListRelanzarGira}
          />
          <Route
            path="/admin-options/giras-relanzar/:currentId"
            Component={RelanzarGira}
          />
          <Route
            path="/admin-options/opciones-reservaciones-giras"
            Component={OpcionesReservacionesGiras}
          />
          <Route
            path="/admin-options/opciones-sugerencias"
            Component={opcionesSugerencias}
          />
          <Route
            path="/admin-options/opciones-comentarios-giras"
            Component={OpcionesCommentsGiras}
          />
          <Route
            path="/admin-options/opciones-estadisticas-giras"
            Component={OpcionesEstadisticasGiras}
          />
          <Route
            path="/admin-options/opciones-estadisticas-giras/estadisticas-usuarios"
            Component={EstadisticasUsers}
          />
          <Route
            path="/admin-options/opciones-estadisticas-giras/estadisticas-usuarios/:id"
            Component={EstadisticaUsuario}
          />
          <Route
            path="/admin-options/opciones-estadisticas-giras/todas-las-estadisticas"
            Component={TodasLasEstadisticas}
          />
          <Route
            path="/admin-options/opciones-estadisticas-giras/giras-por-grupos"
            Component={GrupoDegirasList}
          />
          <Route
            path="/admin-options/opciones-estadisticas-giras/giras-por-grupos/group-selected"
            Component={GrupoSeleccionado}
          />

          <Route
            path="/admin-options/list-giras-for-reservations"
            Component={ListGirasForReservations}
          />
          <Route
            path="/admin-options/list-reservaciones-canceladas-giras-activas"
            Component={ReservacionesCanceladasEnGirasActivas}
          />
          <Route
            path="/admin-options/list-giras-done-for-reservations"
            Component={ListGirasDoneForReservations}
          />
          <Route
            path="/admin-options/list-giras-archivadas-for-reservations"
            Component={ListGirasArchivadasForReservations}
          />
          <Route
            path="/admin-options/list-giras-for-reservations/:currentId"
            Component={ReservationsOfGira}
          />
          <Route
            path="/admin-options/list-giras-for-reservations/:currentId/:id"
            Component={ViewReservationSelected}
          />
          <Route
            path="/admin-options/list-all-giras-reservations"
            Component={ListAllReservations}
          />
          <Route
            path="/admin-options/list-giras-archivadas"
            Component={ListGirasArchivadas}
          />
          <Route
            path="/admin-options/list-giras-activas"
            Component={ListGirasActivas}
          />
          <Route
            path="/admin-options/list-giras-realizadas"
            Component={ListGirasRealizadas}
          />
          <Route
            path="/admin-options/list-giras-archivadas/:currentId"
            Component={GiraArchivada}
          />
          <Route
            path="/admin-options/list-all-giras"
            Component={ListTodasLasGiras}
          />
          <Route
            path="/admin-options/crear-sugerencia"
            Component={CrearSugerencia}
          />
          <Route
            path="/admin-options/list-sugerencias"
            Component={ListSugerencias}
          />
          <Route
            path="/admin-options/list-sugerencias/:id"
            Component={EditarSugerencia}
          />
          <Route
            path="/admin-options/list-giras-for-stadisticas"
            Component={ListEstadisticasActivas}
          />
          <Route
            path="/admin-options/estadisticas-giras-realizadas"
            Component={EstadisticasGirasRealizadas}
          />
          <Route
            path="/admin-options/estadisticas-giras-archivadas"
            Component={EstadisticasGirasArchivadas}
          />
          <Route
            path="/admin-options/estadisticas-all-giras"
            Component={EstadisticasAllGiras}
          />
          <Route
            path="/admin-options/list-giras-for-stadisticas/:id"
            Component={EstadisticaGira}
          />
          <Route path="/signIn-like-admin" Component={SignInLikeAdmin} />
          <Route
            path="/signIn-like-semi-admin"
            Component={SignInLikeSemiAdmin}
          />
          {/* Components de admin */}
        </Routes>
        {type == 'admin' || type == 'semi-admin' ? <AdminIcon /> : <></>}

        <ChatIcon />
        <NavBar />
      </main>
    </div>
  );
}

export default App;
