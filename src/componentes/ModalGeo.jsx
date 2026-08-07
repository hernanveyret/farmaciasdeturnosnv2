import React, { useState, useEffect } from 'react';
import "./modalGeo.css";

const ModalGeo = ({ 
      isGeo, 
      setIsGeo, 
      setIsModalGeo, 
      setUbication,
      ubication,
      modoTema
    }) => {

  return (
    <div className="contenedor-mdodal-geo">
      <div className="modal-geo" style={{borderColor: modoTema ? 'black' : 'white'}}>
        <div className="texto" style={{color: modoTema ? 'black' : 'white'}}>
          <p>¿Querés activar tu ubicación?</p>
          <p>Usamos tu localización solo para calcular la distancia a la farmacia más cercana. Tu información no se guarda ni se recopila en ningún lugar.</p>
        </div>
        <div className="modal-btn">
          <button
            type='button'
            onClick={() => {
              setIsGeo(true)
              setIsModalGeo(false)
            }}
          >Si</button>
          <button
            type='button'
            onClick={() => {
              setIsGeo(false)
              setIsModalGeo(false)
            }}
          >No</button>
        </div>
      </div>
    </div>
  )
};
export default ModalGeo;