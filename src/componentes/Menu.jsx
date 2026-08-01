import React, { useState, useEffect } from 'react';
import { IoMoonOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { FiLink } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { MdHeight, MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineLocationOff } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

import { motion } from 'framer-motion'

import './menu.css';

const Menu = ({
  isMenu,
  setIsMenu,
  modoTema,
  setModoTema,
  isTipoDeAlmanaque,
  setIsTipoDeAlmanaque,
  isGeo,
  setIsGeo,
  setUbication,
  ubication,
  menuRef,
  setIsCopyLink,
  setIsQr
}) => {

   const copiarLink = () => {
    navigator.clipboard.writeText('https://www.farmaciasdeturnosn.com.ar/') // copia el texto en el portapapeles del dispositivo
    .then(() => {
      setIsCopyLink(true)
      setTimeout(() => {
       setIsCopyLink(false)
      }, 3000);
    })
    .catch(()=> {
      console.log('Error al compiar el link al portapapeles')
    })
  }

 
  return (     
    
      <motion.div 
        className={`menu ${modoTema ? 'menu-light' : 'menu-dark'}`}
        ref={menuRef}
        animate={{ x: isMenu ? 0 : -300 }}        
        drag = "x"        
        dragConstraints={{
          left: -300,
          right: 0
        }}
        dragElastic={0}
        onDrag={(event, info ) => {
          setIsMenu(false)
        }}
        >
        <button
          type='button'
          className='btn-close-menu'
          onClick={() => { setIsMenu(!isMenu)}}         
        >
          <AiOutlineClose />
        </button>

        <button
          type='button'
          className='btn-menu-active'
          onClick={() => { setModoTema(!modoTema)}}
        >
          { modoTema ? <IoMoonOutline /> : <GoSun /> }
          <p>Tema</p>
        </button>

        <button
          type='buton'
          className='btn-menu-active'
          onClick={() => { setIsTipoDeAlmanaque(!isTipoDeAlmanaque)}}
        >
          { isTipoDeAlmanaque ? <CiCalendarDate /> : <IoCalendarOutline /> }
          <p>Tipo de almanaque</p>
        </button>
        <button
          type='button'
          className='btn-menu-active'
          onClick={() => { 
            setIsGeo(!isGeo)
            setUbication(!ubication)
          }}
        >
          { isGeo ? <MdOutlineLocationOff /> : <MdOutlineLocationOn /> }
          <p>Geolocalizacion</p>
        </button>
        <button
          type='button'
          className='btn-menu-active'
          onClick={() => copiarLink()}
        >
          <FiLink />
          <p>Conpartir link</p>
        </button>

        <button
          type='button'
          className='btn-menu-active'
          
          onClick={() => {
            setIsMenu(false)
            setIsQr(true)
          }}
        >
          <BsQrCode />
          <p>Conpartir QR</p>
        </button>
      </motion.div>
   
  )
};
export default Menu;