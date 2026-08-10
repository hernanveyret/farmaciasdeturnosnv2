import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiCircleChevLeft } from "react-icons/ci";
import "./install.css";

const Install = ({
  comprobarInstalacion,
  deferredPrompt,
  setDeferredPrompt
}) => {

  const [isInstalada, setIsInstalada] = useState(null);
  const [esIOS, setEsIOS] = useState(false);
  const [instalando, setInstalando] = useState(false);

  // COMPROBAR SI LA APP YA ESTÁ INSTALADA
  useEffect(() => {
    if (!comprobarInstalacion) return;
    const instalacion = comprobarInstalacion();
    setIsInstalada(instalacion);
    setEsIOS(instalacion?.ios === true);
  }, [comprobarInstalacion]);

  // DETECTAR CUANDO LA PWA FUE INSTALADA
   useEffect(() => {

    const handleAppInstalled = () => {
      console.log("La PWA fue instalada");
      // La instalación terminó
      setInstalando(false);

      // Ahora sí mostramos que está instalada
      setIsInstalada({
        res: true,
        ios: false
      });

      setEsIOS(false);

      // El prompt ya fue utilizado
      if (setDeferredPrompt) {
        setDeferredPrompt(null);
      }
    };

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );

    };

  }, [setDeferredPrompt]);


  // INSTALAR LA PWA
  const handleInstalarAndroid = async () => {
    if (!deferredPrompt) {
      console.log(
        "El navegador todavía no tiene disponible el prompt."
      );
      return;
    }

    try {
      // Mostramos estado de instalación
      setInstalando(true);

      // Abrimos el prompt nativo
      deferredPrompt.prompt();

      // Esperamos la decisión del usuario
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        console.log("El usuario aceptó la instalación");

        // IMPORTANTE:
        // No ponemos isInstalada en true acá.
        //
        // Esperamos al evento "appinstalled".

      } else {

        console.log(
          "El usuario canceló la instalación"
        );

        // Si canceló, dejamos nuevamente
        // la pantalla preparada para instalar
        setInstalando(false);
      }

    } catch (error) {
      console.error(
        "Error al intentar instalar la PWA:",
        error
      );

      setInstalando(false);

    } finally {
      // El evento beforeinstallprompt
      // solamente puede utilizarse una vez
      if (setDeferredPrompt) {
        setDeferredPrompt(null);
      }
    }
  };

  return (

    <div className="contenedor-install">
      <div className="card-install">

        {/* =================================================
            CASO 1: YA ESTÁ INSTALADA
        ================================================= */}

        {isInstalada?.res && (
          <div className="card-contenido">
            <h2>
              ¡App Lista!
            </h2>
            <p>
              La aplicación se instaló correctamente
              en tu dispositivo.
            </p>
            <p>
              Ahora podés cerrar este navegador y
              buscar el ícono de la aplicación en tu
              dispositivo para abrirla.
            </p>
          </div>
        )}

        {/* =================================================
            CASO 2: INSTALANDO
        ================================================= */}

        {!isInstalada?.res && instalando && (
          <div className="card-contenido">
            <h2>
              Instalando aplicación...
            </h2>
            <p>
              Estamos instalando la aplicación
              en tu dispositivo.
            </p>
            <p>
              Esperá unos segundos.
            </p>
          </div>
        )}

        {/* =================================================
            CASO 3: IOS
        ================================================= */}

        {!isInstalada?.res && !instalando && esIOS && (
          <div className="card-contenido">
            <h2>
              Instalar en iPhone / iPad
            </h2>
            <p className="subtitulo">
              Sigue estos sencillos pasos en Safari:
            </p>
            <ol className="pasos-ios">
              <li>
                Toca el botón
                <strong> Compartir </strong>
                <span>⎋</span>
                (abajo en la barra del navegador).
              </li>
              <li>
                Desliza hacia abajo y selecciona
                <strong> "Agregar a inicio" </strong>
                <span>⊕</span>.
              </li>
              <li>
                Toca
                <strong> "Agregar" </strong>
                arriba a la derecha.
              </li>
            </ol>
          </div>
        )}

        {/* =================================================
            CASO 4: ANDROID / CHROME / PC
        ================================================= */}

        {!isInstalada?.res &&
          !instalando &&
          !esIOS && (
            <div className="card-contenido">
              <h2>
                Instalar Aplicación
              </h2>
              <p>
                Instalá la aplicación para acceder
                más rápidamente desde tu dispositivo.
              </p>

              {deferredPrompt ? (
                <button
                  className="btn-instalar"
                  onClick={handleInstalarAndroid}
                >
                  Instalar Ahora
                </button>
              ) : (
                <p className="mensaje-install">
                  La instalación no está disponible
                  en este momento desde este navegador.
                </p>
              )}
            </div>
          )}

        {/* =================================================
            VOLVER AL INICIO
        ================================================= */}

        <Link
          to="/"
          className="btn-volver"
        >
          <CiCircleChevLeft size={22} />
          <span>
            Volver al inicio
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Install;
