import React from 'react';
import { motion } from 'framer-motion'

import './almanaque.css'

const Alamanaque = ({
  day,
  month,
  monthString,
  year,
  cantDiasMes,
  celdasVacias,
  handlePrev,
  handleNext,
  handleDay,
  toDay,
  modoTema
}) => {
  let days = []
  let cells = []
  let rows = []
  let diasDelMes = 0

  // crea un array con la cantidad de dias que tiene el mes actual.
  for(let i=1; i <= cantDiasMes; i++){
    days.push(i)
  }

  // agrega las celdas vacias
  for (let i=1; i <= celdasVacias; i++){
    cells.push(<td key={`vacias-${i}`} onClick={handleDay}></td>)
  }
  // Crea la primera fila con las vacias y las que tienen numero.
  for(let i=1; i<= 7-celdasVacias; i++){
    diasDelMes++
    day === diasDelMes ? cells.push(<td key={`day-${diasDelMes}`} style={{backgroundColor: "orange",borderRadius:"5px", cursor:"pointer"}} onClick={handleDay}>{diasDelMes}</td>) : cells.push(<td key={`day-${diasDelMes}`} onClick={handleDay} style={{cursor:"pointer"}}>{diasDelMes}</td>)
  }
    rows.push(<tr key={`row-1`}>{cells}</tr>)

  for(let filas = 1; filas <= 6; filas++){
    cells = []
      for(let celdas = 1; celdas <= 7; celdas++){
        if ( diasDelMes >= cantDiasMes){
          cells.push(<td key={`empty-${filas}-${celdas}`}></td>);
      }else{  
        diasDelMes++
        day === diasDelMes 
        ? 
        cells.push(<td key={`day-${diasDelMes}`} style={{backgroundColor: "orange",borderRadius:"5px", cursor:"pointer"}} onClick={handleDay}>{diasDelMes}</td>) 
        : 
        cells.push(<td key={`day-${diasDelMes}`} onClick={handleDay} style={{cursor:"pointer"}}>{diasDelMes}</td>)
      }
      }
      rows.push(<tr key={`row-${filas + 1}`}>{cells}</tr>)
  }

  return (
    <div className={`containerAlmanac ${modoTema ? "temaClaro" : "temaOscuro"}`}>
          <div className={`caption ${modoTema ? "textoClaro" : "textoOscuro"}`}>
  {month === 0 ? (
    <button
      className={`btn-mes btn-prev ${modoTema ? "btnMesClaro" : "btnMesOscuro"}`}
      onClick={handlePrev}
      style={{ display: "none" }}
      title="Mes anterior"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
      </svg>
    </button>
  ) : (
    <motion.button
      className={`btn-mes btn-prev ${modoTema ? "btnMesClaro" : "btnMesOscuro"}`}
      onClick={handlePrev}
      title="Mes anterior"
      whileHover={{
        x: [-1,-10,0]
      }}
      transition={{
        duration: 0.15,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
      </svg>
    </motion.button>
  )}

  {day} de {monthString} de {year}

  {month === 11 ? (
    <motion.button
      className={`btn-mes btn-next ${modoTema ? "btnMesClaro" : "btnMesOscuro"}`}
      onClick={handleNext}
      style={{ display: "none" }}
      title="Mes siguiente"   
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
      </svg>
    </motion.button>
  ) : (
    <motion.button
      className={`btn-mes btn-next ${modoTema ? "btnMesClaro" : "btnMesOscuro"}`}
      onClick={handleNext}
      title="Mes siguiente"      
      whileHover={{
        x: [1,10,0]
      }}
      transition={{
        duration: 0.15,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
      </svg>
    </motion.button>
  )}
</div>
      <button 
        className={`toDay ${modoTema ? "btnClaro" : "btnOscuro"}`} 
        onClick={toDay}>
          HOY
      </button>
      <table border="0" className={modoTema ? "tablaClaro" : "tablaOscuro"}>
        <thead>
        <tr>
          <th>Do</th>
          <th>Lu</th>
          <th>Ma</th>
          <th>Mi</th>
          <th>Ju</th>
          <th>Vi</th>
          <th>Sa</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
      </table>
      <div className="msj-hs">        
      </div>
    </div>
  );
}

export default Alamanaque;