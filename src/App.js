import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListagemM from './ListagemM';
import CriarM from './CriarM';
import DetalhesM from './DetalhesM';
import EditarM from './EditarM';
import React from "react";
import MapPage from "./pages/MapPage.tsx";

export const REACT_APP_GOOGLE_API_KEY = "AIzaSyDYuGE9kn_CDvG1CkPWSOG7lPxVaDwiM60";

function App() {
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  return (
    <div className="App">
      <h1>CRUD Moradas</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListagemM />} />
          <Route path='/morada/criar' element={<CriarM />} />
          
          {/* Pass selectedLocation as a prop to ListagemM */}
          <Route path="/" element={<ListagemM selectedLocation={selectedLocation} />} />

          <Route path='/morada/detalhes/:mid' element={<DetalhesM />} />
          <Route path='/morada/editar/:mid' element={<EditarM />} />
        </Routes>
      </BrowserRouter>

      {/* Render MapPage conditionally based on selectedLocation */}
      {selectedLocation && <MapPage />}
    </div>
  );
}

export default App;
