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
import { Link } from 'react-router-dom'



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
        
        <Link 
          className='btn-menu-active'
          style={{
            textDecoration:'none',
             textAlign:'center',
              fontFamily: 'Lucida Sans'
            }}
          to='/info'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 64 64"
                fill="none">
                <circle cx="32" cy="32" r="30" fill="#00C853"/>    
                <circle cx="32" cy="18" r="3.5" fill="#FFFFFF"/>    
                <rect
                    x="29"
                    y="25"
                    width="6"
                    height="22"
                    rx="3"
                    fill="#FFFFFF"/>
            </svg>
            <p style={{ textDecoration:'none'}}>Informacion Importante</p>
          </Link>
      </motion.div>
   
  )
};
export default Menu;


/*
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

      */