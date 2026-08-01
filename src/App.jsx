import { Routes, Route } from "react-router-dom";
import Home from "./componentes/Home"
import Admin from "./componentes/Admin"

import "./App.css";

function App() {
  return (
    <div className="contenedor-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
