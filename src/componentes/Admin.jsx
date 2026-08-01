import React, { useState, useEffect }  from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { GiExitDoor } from "react-icons/gi";

import { loginConMail, cerrarSesion, getData, subirCalendario } from '../firebase/auth.js'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config.js'

import './admin.css';

const Admin = () => {
   const [ isLogin, setIsLogin ] = useState(true);
   const [ user, setUser ] = useState(null);
   const [ usuarioActual, setUsuarioActual ] = useState(null);
   const [ calendario, setCalendario ] = useState(null);
   const [ archivo, setArchivo ] = useState(null);

  useEffect(() => {
  const unsubscribe = getData((data) => {
    setCalendario(data);
  });

  return () => unsubscribe();
  }, []);

  useEffect(() => {
    if(calendario) console.log(calendario)
  },[calendario])
   
   useEffect(() => {
       onAuthStateChanged(auth, (user) => {
         if (user) {
           //setUsuario(user)
           setIsLogin(false);
           //setInitBtn(true)
           setUser(true)
           const currentUsuario = auth.currentUser
           setUsuarioActual(currentUsuario)
         } else {
           //console.log("⛔ No hay usuario logueado");
           setUser(false)
           setIsLogin(true)
         }
       });
     },[]);

  const FormularioLogin = () => {
    const [ mail, setMail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isVer, setIsVer ] = useState(false);

    useEffect(() => {
      if(mail) console.log(mail)
      if(password) console.log(password)
    },[mail,password])

    const login = async (e) => {
      e.preventDefault();
      // setIsLogin(!isLogin)
      const respuesta = await loginConMail(mail, password)
      if(respuesta){
        console.log(respuesta)
        setUser(respuesta);
      }
    }

    return (
      <div className="contenedor-formulario">
        <form
          className='formulario-admin'
          onSubmit={login}
        >
          <input type='email' placeholder='Ingrese su mail' onChange={(e) => { setMail(e.target.value)}}/>
          <div>
          <input type={ isVer ? 'text' : 'password'} placeholder='Ingrese su contraseña' onChange={(e) => { setPassword(e.target.value)}}/>
          <button type='button' onClick={() => { setIsVer(!isVer)}}>
            { isVer ? <FaRegEyeSlash /> : <IoEyeOutline /> }
          </button>
          </div>
          <button type='submit'>Entrar</button>
        </form>
      </div>
    )
  }

  const Administrados = () => {

    const logOut = async () => {
      await cerrarSesion()
    }

    const handleSeleccionarArchivo = (e) => {
      const file = e.target.files[0];

      if (file) {
        setArchivo(file);
      }
    };

    const handleSubir = () => {
      if (!archivo) return;

      const reader = new FileReader();

      reader.onload = async (e) => {
        const datos = JSON.parse(e.target.result);
      
        await subirCalendario(datos);
      };
    
      reader.readAsText(archivo);
    };

    return (
      <div className="contenedor-administrados">
        <header>
          <h1>Administrador</h1>
          <button 
            type='button' 
            className='btn-menu-admin'
            onClick={logOut}
            ><GiExitDoor /></button>
        </header>
        <main className='main-admin'>        
          <form
            className="form-subir"
            onSubmit={handleSubir}
          >
            <input
              id="archivo-json"
              className="input-json"
              type="file"
              accept=".json,application/json"
              onChange={handleSeleccionarArchivo}
            />
            <label
              htmlFor="archivo-json"
              className="btn-seleccionar"
            >
              Seleccionar JSON
            </label>
            {archivo && (
              <span className="nombre-archivo">
                {archivo.name}
              </span>
            )}          
            <button
              className="btn-subir"
              type="submit"
            >
              Subir calendario
            </button>
          </form>
        </main>
      </div>
    )
  }

  return (
    <div className="contenedor-admin">
      {
        isLogin ?
          <FormularioLogin />
          :
          <Administrados />
      }
    </div>
  )
}
export default Admin;