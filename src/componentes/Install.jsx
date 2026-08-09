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
      <p>Instalar app <button onClick={() => { setIsInstalar(false)}}>X</button></p>
      { isInstalada ? <p>La app ya esta instalada</p> : <p>hay que instalar la app</p>}
    </div>
  )
};
export default Install;