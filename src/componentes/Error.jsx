import React, { useState, useEffect } from 'react';
import './error.css'

const Error = () => {

  return (
    <div className="container-error">
      <div className="card-error">
        <div className="error-content">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            width="50"
            height="50"
            stroke="currentColor" 
            strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <h4>Sin conexión con el servidor</h4>
            <p>Reinicie o vuelva a intentar mas tarde.</p>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="btn-retry">
          Reintentar
        </button>
      </div>
    </div>
  );
}
export default Error;