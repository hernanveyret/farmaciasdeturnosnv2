import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { LiaMapSolid } from "react-icons/lia";
import { SiGooglemaps } from "react-icons/si";
import { FaMapLocationDot } from "react-icons/fa6";
import { LiaCoffeeSolid } from "react-icons/lia";
import { MdOutlineLocalPhone } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";
import { MdOutlineLocationOn } from "react-icons/md";

import Alamanaque from "./Almanaque.jsx"
import AlmanaqueDia from './AlmanaqueDia';
import MapaUbicaciones from './MapaUbicaciones';
import Menu from './Menu.jsx';
import Loader from "./Loader.jsx"
import ModalGeo from './ModalGeo.jsx';
import SharedConfirm from './ShareConfirm.jsx';
import Qr from './Qr.jsx';
import ApoyarProyecto from './ApoyarProyecto.jsx';

import { getData } from "../firebase/auth.js"

import './home.css';

const Home = () => {
  const meses = [
  {id: 0, mes: "Enero"},
  {id: 1, mes: "Febrero"},
  {id: 2, mes: "Marzo"},
  {id: 3, mes: "Abril"},
  {id: 4, mes: "Mayo"},
  {id: 5, mes: "Junio"},
  {id: 6, mes: "Julio"},
  {id: 7, mes: "Agosto"},
  {id: 8, mes: "Septiembre"},
  {id: 9, mes: "Octubre"},
  {id: 10, mes: "Noviembre"},
  {id: 11, mes: "Diciembre"},
]

  let localConfig = localStorage.getItem('settingsFarmaciaV2');

  const [ config, setConfig ] = useState(localConfig ? JSON.parse(localConfig) : {
          tema: true,
          tipoAlmanaque: true,
          geo: false,
          modalGeo: true,
          otrosBanner: false,
  })
  const fecha = new Date();
  const year = fecha.getFullYear(); // año
  const [day, setDay] = useState(fecha.getDate()); // dia en numero.
  const [dayString, setDayString] = useState(fecha.toLocaleString('es-ES', {weekday: 'long'}));
  const [month, setMonth] = useState(fecha.getMonth()); // mes en numero.
  //const [ monthString, setMonthString ] = useState(fecha.toLocaleString('es-ES', { month: 'long' }))
  const [monthString, setMonthString] = useState(meses.find(m => m.id === month).mes)
  const [cantDiasMes, setCantDiasMes] = useState(new Date(year, month + 1, 0).getDate()); // Ultimo dia del mes anterior
  const [celdasVacias, setCeldasVacias] = useState(new Date(year, month, 1).getDay()) // Posicion del primer dia del mes, del 0 al 6, dom-lun...
  const [lat1, setLat1] = useState(null)
  const [lon1, setLon1] = useState(null);
  const [ubication, setUbication] = useState(false)
  const [error, setError] = useState(false);
  const [array, setArray] = useState([]);
  const [letra, setLetra] = useState("");
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [isLoader, setIsLoader] = useState(true);


  // false para Almanaque normal - true para almanaque por dias
  const [ isTipoDeAlmanaque, setIsTipoDeAlmanaque ] = useState(config && config.tipoAlmanaque); 
  // true modo claro - false modo oscuro
  const [ modoTema, setModoTema ] = useState(config && config.tema);
  const [ isModalGeo, setIsModalGeo ] = useState(config && config.modalGeo)
  const [ isGeo, setIsGeo ] = useState(config && config.geo);
  const [ isOtrosbanner, setIsOtrosBanner ] = useState(config && config.otrosBanner)
 
  
  const [ calendario, setCalendario ] = useState(null); 
  const [ isMenu, setIsMenu ] = useState(false);
  const [ isCopyLink, setIsCopyLink ] = useState(false)
  const [ isQr, setIsQr ] = useState(false);
  const [ isApoyar, setIsApoyar ] = useState(false)

  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const cardHeaderRef = useRef(null);
  const menuRef = useRef(null)

  let hs = fecha.getHours();
  let mn = fecha.getMinutes();
  let ss = fecha.getSeconds()
  const [hora, setHora] = useState(mn < 9 ? `${hs}:0${mn}:0${ss}` : `${hs}:${mn}:${ss}`);

  useEffect(() => {
  document.documentElement.classList.toggle("modoOscuroMain", modoTema === false);
}, [modoTema]);
  
  useEffect(() => {
    const cerrarMenu = (e) => {
      if(menuRef.current && !menuRef.current.contains(e.target)){

        setIsMenu(false)
      }      
    };
    document.addEventListener('mousedown', cerrarMenu)
      return () => {
        document.removeEventListener('mousedown', cerrarMenu)
      }
  },[isMenu])

// Guarda los cambios en localStorage
useEffect(() => {
  setConfig(prev => ({
    ...prev,
    geo: isGeo,
    modalGeo: isModalGeo,
    otrosBanner : isOtrosbanner,
    tema:  modoTema,
    tipoAlmanaque: isTipoDeAlmanaque,
  }))
  let localConfig = {
    geo: isGeo,
    modalGeo: isModalGeo,
    otrosBanner : isOtrosbanner,
    tema:  modoTema,
    tipoAlmanaque: isTipoDeAlmanaque,
  }
  if(isGeo){
    geo();
  }else{
    setLat1(-33.342029696632295)
    setLon1(-60.22818151413121)
    setUbication(false)
  }
  localStorage.setItem('settingsFarmaciaV2', JSON.stringify(localConfig)); 
},[isGeo, isModalGeo, modoTema, isTipoDeAlmanaque])

useEffect(() => {
  setIsLoader(true);

  const unsubscribe = getData(
    (data) => {
      setCalendario(data);
      setIsLoader(false);
    },
    (error) => {
      console.error(error);
      setIsLoader(false);
    }
  );

  if(isGeo){
    geo();
  }else{
    setLat1(-33.342029696632295)
    setLon1(-60.22818151413121)
    setUbication(false)
  }

  return () => unsubscribe();
}, []);
 
   // Mes anterior
  const handlePrev = () => {
    month === 0 ? setMonth(0) : setMonth(month - 1);
    setDay(new Date(year, month, 0).getDate());
  }
  //Mes siguiente
  const handleNext = () => {
    console.log('mes siguiente', month)
    month === 11 ? setMonth(11) : setMonth(month + 1);
    setDay(1)
  }
   const toDay = () => {
    setDay(fecha.getDate())
    setMonth(fecha.getMonth())
  }

  // Dia  anterior
  const handleChangeDayStringPrev = () => {   
    if( day === 1 && month === 0) {
      return
    }else if( day === 1 ){
      setDay(new Date(year, month, 0).getDate())
      setMonth(prevMonth => prevMonth - 1)
      return
    }else{    
      setDay(day - 1)
    }
  };

  // Dia siguiente
  const handleChangeDayStringNext = () => {
    if ( day === 31 && month === 11 ){
      return
    }else if (day === cantDiasMes) {
      setDay(1)
      handleNext()
      return
    }else{
    setDay(day + 1)
    }
  }
// cambia dayString segun el dia
  useEffect(() => {
    let algo = new Date(year, month, day)
    let diaDeLaSemana = algo.toLocaleString('es-ES', {weekday: 'long'})
    setDayString(diaDeLaSemana)
  }, [day, month]);

  // Cambia el mes en string
    useEffect(() => {
      setCantDiasMes(new Date(year, month + 1, 0).getDate())
      setCeldasVacias(new Date(year, month, 1).getDay())
    setMonthString(meses.find(m => m.id === month).mes)
  }, [month, year, meses])

   // Selecciona el dia en el almanaque por mes.
  // el metodo trim() elimina los espacios vacios de lo que traiga el target
  const handleDay = (e) => {
    let textContent = e.currentTarget.textContent.trim();
    if (textContent !== '') {
      textContent = parseInt(textContent)
      setDay(textContent)
    }
  };

  // Sila geolocalizacion del dispositivo esta activada detecta la ubicacion del usuario
  function geo() {
    if (!'geolocation' in navigator) {
      console.log('la geolocalizacion esta desactivada')
      
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat1(position.coords.latitude);
        setLon1(position.coords.longitude);
        setUbication(true)
      },
      (err) => {
        setUbication(false)
        setError(true)
        console.log('codigo de error: ', err.code)
        console.log('mensaje: ', err.message)
        
      },
      {
        enableHighAccuracy: true,
        // timeout: 5000,
        maximumAge: 0
      }
    )
  }

   // Convierte la hora en texto de string a una hora real
  const convertToTime = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return new Date(2024, 0, 1, hours, minutes, seconds).getTime();
  };
// Función auxiliar para pasar "HH:MM:SS" a minutos transcurridos en el día

 
  const horaActual = convertToTime(hora);
  //const inicio = convertToTime("08:00:00");
  const inicio = convertToTime("00:00:00");
  const fin = convertToTime("07:59:59");

  //  Ajuste para turnos que cruzan medianoche
  const isEarlyMorning = (horaActual >= inicio && horaActual <= fin);

    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 
    useEffect(() => {
    if (!calendario) return;
    const lastDay = new Date(year, month, 0).getDate();
    const targetDay = isEarlyMorning ? day - 1 : day;   

    const pharmaciesData = (day === 1 && month + 1 === 1 && isEarlyMorning === true) 
      ?
        calendario[year - 1]?.[11][12][30] 
      :
      isEarlyMorning && day === 1 
        ?      
          calendario[year]?.[month-1]?.[month]?.[lastDay - 1] 
        :
        calendario[year]?.[month]?.[month + 1]?.[targetDay - 1];

    if (!pharmaciesData) {
      setArray([]);
      return;
    }

    const pharmacies = pharmaciesData.pharmacies.map((pharmacy) => {
      if (ubication) {
        pharmacy.distance = calcularDistancia(lat1, lon1, pharmacy.lat, pharmacy.lon);
        if (pharmacy.distance > 7000.0) {
          pharmacy.distance = null;
        } else if (pharmacy.distance < 99) {
          pharmacy.distance = parseFloat(pharmacy.distance.toFixed(1));
        } else {
          pharmacy.distance = Math.round(pharmacy.distance);
        }
      }
      return pharmacy;      
    });

    if (ubication) {
      pharmacies.sort((a, b) => a.distance - b.distance);
    }    
      setArray(pharmacies);
    
    setLetra(pharmaciesData.dateShift.toUpperCase());
  }, [calendario, day, month, year, horaActual, ubication, lat1, lon1, isEarlyMorning]);

    if (error) {
      console.log("Error geo, pero sigo mostrando la app");
  }

  if (!calendario) {
    return <Loader />;
  }
    const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} Mt.`
    }

    return `${distance} Km.`;
  };  

  return (
    <div className="contendor-home">
      {
        isLoader && <Loader />
      }
      { isCopyLink && <SharedConfirm /> }
      { isQr && <Qr setIsQr={setIsQr}/> }
      { isApoyar && <ApoyarProyecto setIsApoyar={setIsApoyar}/> }
      {
        isModalGeo && 
          <ModalGeo 
            setIsModalGeo={setIsModalGeo}
            setIsGeo={setIsGeo}
            isGeo={isGeo}
            setUbication={setUbication}
            ubication={ubication}
            modoTema={modoTema}
          />
      }     
      {        
          <Menu 
          isMenu={isMenu}
          setIsMenu={setIsMenu}
          modoTema={modoTema}
          setModoTema={setModoTema}
          isTipoDeAlmanaque={isTipoDeAlmanaque}
          setIsTipoDeAlmanaque={setIsTipoDeAlmanaque}
          isGeo={isGeo}
          setIsGeo={setIsGeo}
          setUbication={setUbication}
          ubication={ubication}
          menuRef={menuRef}
          setIsCopyLink={setIsCopyLink}
          setIsQr={setIsQr}
          />
      }
      <header
        className={ modoTema ? 'modoClaroHeader' : 'modoOscuroHeader' }
      >
        <img src='./iconoCruzFarmaciaBlanca.png' alt='Imagen logo' />
        <h1>Farmacias de tuno SN</h1>

        <motion.button          
          type='button'          
           animate={{
            rotate: isMenu ? 90 : 0,
          }}
          transition={{
            duration: .25
          }}
          whileHover={{
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            duration: .35,
          }}
          className='btn-menu-principal'
          onClick={() => { setIsMenu(!isMenu)}}
          >
          { !isMenu ? <MdMenu /> : <IoMdClose />}
        </motion.button>
        <motion.button
          title='Apoya este proyecto'
          type='button'
          onClick={() => { setIsApoyar(!isApoyar)}}
          className='btn-cafecito'
          whileHover={{
            rotate: -50  
          } }
          >
            <LiaCoffeeSolid />
        </motion.button>
      </header>
      <main
         className={ modoTema ? 'modoClaroMain' : 'modoOscuroMain' }
      >
        <aside className="aside-izquierdo">
          { isTipoDeAlmanaque ? 
            <Alamanaque
              day={day}
              month={month}
              monthString={monthString}
              year={year}
              cantDiasMes={cantDiasMes}
              celdasVacias={celdasVacias}
              handlePrev={handlePrev}
              handleNext={handleNext}
              handleDay={handleDay}
              toDay={toDay}
              modoTema={modoTema}
            />
            :
            <AlmanaqueDia 
              day={day}
              month={month}
              monthString={monthString}
              year={year}
              dayString={dayString}
              handlePrev={handlePrev}
              handleNext={handleNext}
              handleChangeDayStringPrev={handleChangeDayStringPrev}
              handleChangeDayStringNext={handleChangeDayStringNext}
              cardHeaderRef={cardHeaderRef}
              toDay={toDay}
              modoTema={modoTema}
            />
          }
        </aside>
        <aside className="aside-derecho">
  <div className="contenedor-farmacias">

    <div className="header-farmacias">
      <h3 style={{textAlign:'center'}}>Lista de farmacias</h3>
        {letra && (
      <p className="letra-turno"
        style={{textAlign:'center'}}
      >
        Letra: <span
          style={{fontWeight:'bold'}}
        >{letra}</span>
      </p>
    )}

      <button
        className="btn-show-map"
        onClick={() => setMostrarMapa(!mostrarMapa)}
        title="Mostrar / Ocultar mapa"
      >
        {mostrarMapa ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28"
            viewBox="0 -960 960 960"
            width="28"
            fill= {modoTema ? "red" : 'white'}
          >
            <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
          </svg>
        ) : (
          
          <FaMapLocationDot size={28} style={{color: modoTema ? 'black' : 'white'}}/>
        )}
      </button>
    </div>  

    {array && !mostrarMapa && (
      <>
        { array.map((pharmacy, index) => (
          <div
            className="card-farmacia"
            key={index}
          >
            <div className="card-body">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="15" height="15">
                    <circle cx="250" cy="250" r="230" fill="none" stroke="#009A3B" strokeWidth="20" />  
                    <path fill="#009A3B" d="
                      M 200,60 
                      L 300,60 
                      L 300,200 
                      L 440,200 
                      L 440,300 
                      L 300,300 
                      L 300,440 
                      L 200,440 
                      L 200,300 
                      L 60,300 
                      L 60,200 
                      L 200,200 
                      Z
                    " />
                </svg>
                { /*<div className="ciculo"></div>*/}
              <h4>{pharmacy.name}</h4>
              </span>

              <a
                className="btn-maps"
                href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir en Google Maps"
              >
                <SiGooglemaps size={24}/>
              </a>

              <span><MdOutlineLocationOn /><p>{pharmacy.address}</p></span>

              {ubication && (
                <span>
                  <GrLocationPin className='pin'/>
                <p>                  
                  {pharmacy.distance !== null
                    ? formatDistance(pharmacy.distance)
                    : "Calculando..."}
                </p>
                </span>
              )}

              { pharmacy.tel && <span><MdOutlineLocalPhone /><p>{pharmacy.tel}</p></span> }

            </div>
          </div>
        ))}
      </>
    )}


    {!array && (
      <p className="sin-farmacias">
        No se encontraron farmacias para mostrar.
      </p>
    )}

    {array && mostrarMapa && (
      <div className="contenedor-mapa">
        <MapaUbicaciones
          puntos={array}
          ubication={ubication}
          actual={
            lat1 && lon1
              ? {
                  lat: lat1,
                  lng: lon1,
                }
              : null
          }
        />
      </div>
    )}

  </div>
</aside>
      </main>
      <footer
         className={ modoTema ? 'modoClaroHeader' : 'modoOscuroHeader' }
      >
        <section className='footer-info'>
        <p>Diseñado por Hernán Luis Veyret - Dino Studio Web Development - 2024 - Version 2 - hernanveyret@hotmail.com</p>
        </section>
        <div className="logo">
          <img src='./logo.png' alt='Imagen logo' />
        </div>
      </footer>
    </div>
  )
};
export default Home;