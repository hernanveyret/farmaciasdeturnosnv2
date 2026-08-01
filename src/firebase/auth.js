import { GoogleAuthProvider,
         onAuthStateChanged,
         signInWithPopup,
         signOut,
         signInWithEmailAndPassword,
         createUserWithEmailAndPassword } from "firebase/auth";

import { collection,
         onSnapshot, 
         addDoc,
         deleteDoc,
         doc, 
         setDoc,
         updateDoc, 
         getDocs,
         arrayUnion, 
         arrayRemove,
        } from "firebase/firestore";

import { 
        updatePassword, 
        EmailAuthProvider, 
        reauthenticateWithCredential 
        } from "firebase/auth";

import { 
        updateEmail, 
       
        
      } from "firebase/auth";

import { auth, db } from "./config.js";

const provider = new GoogleAuthProvider();



// Login con mail y contraseña
export const loginConMail = async(mail, password) => {
  try {
    const userLogin = await signInWithEmailAndPassword( auth, mail, password );
    return userLogin.user
  } catch (error) {
    console.log(error.code)
    return { ok: false, error: error.code }  
}
}
// Cerrar sesion
export const cerrarSesion = async () => {
  signOut(auth).then(() => {
    //console.log('Sesion finalizada')
  })
}


//Escuchar en tiempo real para ver la base de datos cronograma
export const getData = (onSuccess, onError) => {
  const referencia = doc(db, "farmaciasDb", "calendario-farmacias");

  return onSnapshot(
    referencia,
    (snapshot) => {
      if (snapshot.exists()) {
        onSuccess({
          id: snapshot.id,
          ...snapshot.data(),
        });
      } else {
        onSuccess(null);
      }
    },
    (error) => {
      console.error(error);
      if (onError) onError(error);
    }
  );
};

// Subir calendario completo
export const subirCalendario = async (calendario) => {
  try {
    await setDoc(
      doc(db, "farmaciasDb", "calendario-farmacias"),
      calendario
    );

    return {
      ok: true,
      mensaje: "Calendario cargado correctamente."
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      mensaje: "Error al cargar el calendario."
    };
  }
};

export const subirDatosFarmacias = async ( userUID, actualizacion ) => {
  // 1. Verificación de UID
  if(!userUID){
    console.error('Error: Se necesita el UID para actualizar productos');
    return;
  }

  // 2. PROTECCIÓN CRÍTICA: Bloquea el borrado accidental
  // Si 'actualizacion' no es un array o está vacío, aborta la operación.
  if (!actualizacion || !Array.isArray(actualizacion) || actualizacion.length === 0) {
    console.error('OPERACIÓN ABORTADA: Se intentó enviar un array de productos vacío o inválido.');
    return; 
  }

  const docRef = doc(db, 'kioscos', userUID);
  try {    
    // updateDoc es más seguro aquí porque solo modifica el campo 'productos'
    // y fallará si el documento del usuario no existe, en lugar de crearlo vacío.
    await updateDoc(docRef, {
        productos: actualizacion
    });
    
    console.log('Productos actualizados con éxito en la base de datos');
    return { ok: true }
  } catch (error) {
    console.error('No se pudo actualizar productos en Firestore:', error);
    return { of: false, error: error.message }
  }
};

export const subirCronogramaFarmacias = async ( userUID, actualizacion ) => {
  // 1. Verificación de UID
  if(!userUID){
    console.error('Error: Se necesita el UID para actualizar productos');
    return;
  }

  // 2. PROTECCIÓN CRÍTICA: Bloquea el borrado accidental
  // Si 'actualizacion' no es un array o está vacío, aborta la operación.
  if (!actualizacion || !Array.isArray(actualizacion) || actualizacion.length === 0) {
    console.error('OPERACIÓN ABORTADA: Se intentó enviar un array de productos vacío o inválido.');
    return; 
  }

  const docRef = doc(db, 'kioscos', userUID);
  try {    
    // updateDoc es más seguro aquí porque solo modifica el campo 'productos'
    // y fallará si el documento del usuario no existe, en lugar de crearlo vacío.
    await updateDoc(docRef, {
        productos: actualizacion
    });
    
    console.log('Productos actualizados con éxito en la base de datos');
    return { ok: true }
  } catch (error) {
    console.error('No se pudo actualizar productos en Firestore:', error);
    return { of: false, error: error.message }
  }
};






// Escucha si hay un usuario autenticado
/*
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ UID del admin:", user.uid);
  } else {
    console.log("⛔ No hay usuario logueado");
  }
});
*/