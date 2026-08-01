import React, { useState } from 'react';
import { motion } from 'framer-motion'
import './qr.css';
const Qr = ({ setIsQr }) => {
  return (
    <div className="contenedor-qr">
      <div className="contenedor-imagen-qr">
        <img src='./qr.png' alt='Imagen del qr' />
        <motion.button
        type='button'
        onClick={() => { setIsQr(false)}}
        initial={{ backgroundColor: '#22c55e' }}
        whileHover={{ backgroundColor: '#15803d' }}
        transition={{ duration: 0.2 }}
        >
          CERRAR
        </motion.button>
      </div>
    </div>
  )
};
export default Qr;
