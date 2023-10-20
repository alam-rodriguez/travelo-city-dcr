import { useEffect } from 'react';
import './App.css';

// React-Router-dom
import { Route, Routes } from 'react-router-dom';

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
// import ManejadorGiras from './components/admin-options/sub-admin-options/OpcionesGiras';

const routesForUser = [{ path: '/', component: Inicio }];

function App() {
  const { userLogged, setId, setEmail } = useInfoUser();
  const { giras, setGiras } = useGiras();

  const iniciarSesion = async () => {
    if (userLogged) return;

    const infoUser = await signInAutomatically();
    if (infoUser != false) {
      setEmail(infoUser.email);
      setId(infoUser.id);
    }
  };

  useEffect(() => {
    // const ff = async () => {
    iniciarSesion();
    // };
    // ff();
    if (giras.length == 0) {
      const f = async () => {
        const resGiras = await getGiras();
        // console.warn('Cargando giras de BD');
        setGiras(resGiras);
        console.log(resGiras);
      };
      f();
    }
  }, []);

  return (
    <div className="App">
      <main className="container pb-5">
        <Routes>
          {/* <RoutesForUser routess={routesForUser} /> */}
          {/* <RoutesForUser /> */}
          <Route path="/" Component={Inicio} />
          <Route path="/buscar" Component={Buscar} />
          <Route path="/mis-viajes" Component={MisViajes} />
          <Route path="/giras" Component={GirasPage} />
          <Route path="/giras/:currentId" Component={GiraSelected} />
          <Route path="/giras/reservar-gira" Component={ReservarGira} />
          <Route path="/sugerencia/:id" Component={Sugerencia} />
          {/* Components de admin */}
          <Route path="/admin-options" Component={AdminOptions} />
          <Route
            path="/admin-options/opciones-giras"
            Component={OpcionesGiras}
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
            path="/admin-options/opciones-estadisticas-giras"
            Component={OpcionesEstadisticasGiras}
          />
          <Route
            path="/admin-options/opciones-estadisticas-giras/estadisticas-usuarios"
            Component={EstadisticasUsers}
          />
          <Route
            path="/admin-options/opciones-estadisticas-giras/todas-las-estadisticas"
            Component={TodasLasEstadisticas}
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
            path="/admin-options/list-giras-for-reservations"
            Component={ListGirasForReservations}
          />
          <Route
            path="/admin-options/list-giras-done-for-reservations"
            Component={ListGirasDoneForReservations}
          />
          <Route
            path="/admin-options/list-giras-for-reservations/:currentId"
            Component={ReservationsOfGira}
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
            path="/admin-options/list-giras-archivadas/:currentId"
            Component={GiraArchivada}
          />
          <Route
            path="/admin-options/crear-sugerencia"
            Component={CrearSugerencia}
          />
          <Route
            path="/admin-options/editar-sugerencia"
            Component={CrearSugerencia}
          />
          <Route
            path="/admin-options/list-giras-for-stadisticas"
            Component={ListEstadisticasActivas}
          />
          <Route
            path="/admin-options/list-giras-for-stadisticas/:id"
            Component={EstadisticaGira}
          />
          {/* Components de admin */}
        </Routes>
        <AdminIcon />
        <ChatIcon />
        <NavBar />
      </main>
    </div>
  );
}

export default App;
