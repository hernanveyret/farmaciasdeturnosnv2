import React from 'react';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { GrLocationPin } from "react-icons/gr";
import { TiInfoOutline } from "react-icons/ti";
import { LuHandshake } from "react-icons/lu";
import { CiCircleChevLeft } from "react-icons/ci";

import { Link } from 'react-router-dom'
import './info.css';


const Info = () => {
  return (
    <div className="container-info">
      <Link to='/'><CiCircleChevLeft />Volver</Link>
      <section>
        <div className="titulo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="25" height="25">
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
            <h4>¿Qué es Farmacias de Turno SN?</h4>
        </div>
        <div className="informacion">
          <p>
            Farmacias de Turno SN es una webApp gratuita que te permite consultar de forma rápida 
            qué farmacias se encuentran de turno en San Nicolás de los Arroyos. 
            Su objetivo es facilitar el acceso a la información cuando necesitás una farmacia, 
            especialmente fuera del horario comercial.
          </p>
        </div>
      </section>

      <section>
        <div className="titulo">
          <IoPhonePortraitOutline />
          <h4>¿Cómo funciona?</h4>
        </div>
        <div className="informacion">
          <p>
            La aplicación muestra el listado de farmacias de turno correspondiente al día seleccionado. 
            Además, podés ver su dirección y ordenarlas para encontrar más fácilmente la que necesitás.
          </p>
        </div>
      </section>

      <section>
        <div className="titulo">
          <GrLocationPin />
          <h4>¿Para qué se utiliza la geolocalización?</h4>
        </div>
        <div className="informacion">
          <p>
            Si autorizás el acceso a tu ubicación, 
            la aplicación calculará la distancia entre tu posición y cada farmacia para mostrarlas ordenadas desde 
            la más cercana hasta la más lejana.
          </p>
          <p>
            <b>Importante:</b> Tu ubicación se utiliza únicamente para calcular las distancias en tu dispositivo. No se almacena ni se comparte con terceros.
            </p>
        </div>
      </section>

      <section>
        <div className="titulo">
          <TiInfoOutline />
          <h4>Información importante</h4>
        </div>
        <div className="informacion">
          <p>
            Los turnos publicados en esta aplicación son informados por el Colegio de Farmacéuticos de San Nicolás. 
            Aunque procuramos mantener la información actualizada, pueden producirse cambios o errores ajenos a la aplicación. 
            Si encontrás alguna información incorrecta, 
            escribinos a hernanveyret@hotmail.com para que podamos verificarla y actualizarla lo antes posible.
          </p>
        </div>
      </section>
    </div>
  )
}
export default Info;