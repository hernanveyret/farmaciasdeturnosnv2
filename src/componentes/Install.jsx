import React, { useState, useEffect } from 'react';
import './install.css';

const Install = ({
            isInstalar,
            setIsInstalar,
            comprobarInstalacio,
}) => { 
  const [ isInstalada, setIsInstalada ] = useState(false)

  useEffect(() => {
    setIsInstalada(comprobarInstalacio())
  },[])

  return (
    <div className="contendor-instalar">
      <button onClick={() => { setIsInstalar(false)}}>X</button>
      { 
        isInstalada.res 
        ? 
        <p>La app ya esta instalada</p> 
        :
        <p>hay que instalar la app</p>
      }

      {
        isInstalada.ios 
        ? 
        <p>Es ios</p>
        :
        <p>No es ios</p>
      }
    </div>
  )
};
export default Install;