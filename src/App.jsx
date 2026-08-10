import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./componentes/Home";
import Admin from "./componentes/Admin";
import Info from "./componentes/Info";
import Install from "./componentes/Install";

import "./App.css";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
 
  // EVENTO PARA DETECTAR CUANDO EL NAVEGADOR PERMITE INSTALAR
  useEffect(() => {

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log("PWA disponible para instalar");
      setDeferredPrompt(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };

  }, []);
  
  // COMPROBAR SI LA APP YA ESTÁ INSTALADA
  const comprobarInstalacion = useCallback(() => {
    
    // ¿Está funcionando como PWA instalada?
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return {
        res: true,
        ios: false
      };

    }

    // ¿Es iOS?   
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream;

    return {
      res: false,
      ios: isIOS
    };

  }, []);


  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />

      <Route
        path="/info"
        element={<Info />}
      />

      <Route
        path="/install"
        element={
          <Install
            comprobarInstalacion={comprobarInstalacion}
            deferredPrompt={deferredPrompt}
            setDeferredPrompt={setDeferredPrompt}
          />
        }
      />

    </Routes>

  );
}

export default App;