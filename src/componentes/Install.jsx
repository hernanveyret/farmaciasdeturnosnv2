import React, { useState, useEffect } from 'react';
import './install.css';

const Install = ({
            isInstalar,
            setIsInstalar,
}) => { 

  return (
    <div className="contendor-instalar">
      <p>Instalar app <button onClick={() => { setIsInstalar(false)}}>X</button></p>
    </div>
  )
};
export default Install;