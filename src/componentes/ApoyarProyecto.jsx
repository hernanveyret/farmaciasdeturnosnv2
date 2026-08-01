import { useState } from "react";
import './apoyarProyecto.css'
const  ApoyarProyecto = ({setIsApoyar}) => {
  
  const [copiado, setCopiado] = useState(false);
 
  const alias = "hernanveyret.mp";
  const mpLink = "https://link.mercadopago.com.ar/farmaciasdeturnosn";



  const copiarAlias = async () => {
    await navigator.clipboard.writeText(alias);
    setCopiado(true);
    setTimeout(() => {
      setCopiado(false)
      setOpenModal(false)
    }, 3000);
  };

  return (
    <div className="contenedor-modal">      
        <h3>Apoyar este proyecto</h3>

        <p>
          Esta web es un proyecto independiente, gratuito y sin publicidad
          invasiva. Si te fue útil, podés colaborar para mantenerla online y
          seguir mejorándola.
        </p>

        <div className="alias-box">
          <span>{alias}</span>
          <button 
            className="btn-apoyar"
            onClick={copiarAlias}>
            {copiado ? "¡Copiado!" : "Copiar alias"}
          </button>
        </div>

        <a
          href={mpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mp-link"
        >
          Ir a Mercado Pago
        </a>

        <button 
          className="cerrar-modal" 
          onClick={() => setIsApoyar(false)}>
          Cerrar
        </button>
    </div>
  );
}
export default ApoyarProyecto;