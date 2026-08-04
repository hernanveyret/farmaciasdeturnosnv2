import { Routes, Route } from "react-router-dom";
import Home from "./componentes/Home"
import Admin from "./componentes/Admin"
import Info from "./componentes/Info";
import "./App.css";

function App() {
  return (
    <div className="contenedor-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/info' element={<Info /> } />
      </Routes>
    </div>
  );
}

export default App;
