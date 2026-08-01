import React from 'react';
import { motion } from 'framer-motion'
import './almanacDay.css';

const AlmanaqueDia = ({
  day,
  month,
  monthString,
  dayString,
  year,
  handlePrev,
  handleNext,
  handleChangeDayStringNext,
  handleChangeDayStringPrev,
  cardHeaderRef,
  toDay,
  modoTema
}) => {

  return (
    <div className={`containerAlmanac ${modoTema ? "temaClaro" : "temaOscuro"}`}>

      <div className={`cardAlmanac ${modoTema ? "cardClaro" : "cardOscuro"}`}>

        <div
          className={`monthInfo ${modoTema ? "monthClaro" : "monthOscuro"}`}
          ref={cardHeaderRef}
        >

          {month === 0 ? (
            <button
              className={`btn-mes btn-prev ${modoTema ? "btnMesClaro" : "btnMesOscuro"}`}
              onClick={handlePrev}
              style={{ display: "none" }}
              title="Mes anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
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
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
              </svg>
            </motion.button>
          )}

          <h3>{monthString}</h3>
          <p>{year}</p>

          {month === 11 ? (
            <button
              className={`btn-mes btn-next ${modoTema ? "btnMesClaro" : "btnMesOscuro"}`}
              onClick={handleNext}
              style={{ display: "none" }}
              title="Mes siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
              </svg>
            </button>
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
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
              </svg>
            </motion.button>
          )}

          <button
            className={`toDay ${modoTema ? "btnClaro" : "btnOscuro"}`}
            onClick={toDay}
          >
            HOY
          </button>

        </div>

        <div className={`dayInfo ${modoTema ? "dayClaro" : "dayOscuro"}`}>

          <p>{dayString[0].toUpperCase() + dayString.slice(1)}</p>

          <p>{day}</p>

          <motion.button
            className={`btn-day-left ${modoTema ? "btnMesClaro" : "btnMesOscuro"}`}
            onClick={handleChangeDayStringPrev}
            title="Día anterior"
            whileHover={{
              x: [-1,-10,0]
            }}
            transition={{
              duration: 0.15,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
            </svg>
          </motion.button>

          <motion.button
            className={`btn-day-rigth ${modoTema ? "btnMesClaro" : "btnMesOscuro"}`}
            onClick={handleChangeDayStringNext}
            title="Día siguiente"
            whileHover={{
              x: [1,10,0]
            }}
            transition={{
              duration: 0.15,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
            </svg>
          </motion.button>

        </div>

      </div>

      <div className="msj-hs"></div>

    </div>
  );
};

export default AlmanaqueDia;