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

function App() {
  const { giras, setGiras } = useGiras();
  useEffect(() => {
    if (giras.length == 0) {
      const f = async () => {
        const resGiras = await getGiras();
        console.warn('Cargando giras de BD');
        setGiras(resGiras);
      };
      f();
    }
  }, []);

  return (
    <div className="App">
      <main className="container pt-4-">
        <Routes>
          <Route path="/" Component={Inicio} />
          <Route path="/buscar" Component={Buscar} />
          <Route path="/mis-viajes" Component={MisViajes} />
          <Route path="/giras" Component={GirasPage} />
          <Route path="/giras/:currentId" Component={GiraSelected} />
          <Route path="/giras/reservar-gira" Component={ReservarGira} />
          {/* Components de admin */}
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
          {/* Components de admin */}
        </Routes>
        <ChatIcon />
        <NavBar />
      </main>
    </div>
  );
}

export default App;
