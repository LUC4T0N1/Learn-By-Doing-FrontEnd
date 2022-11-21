import React, {useState} from 'react'
import "./InfosBasicas.css"

export default function InfosBasicas() {
  const [inicio, setInicio] = useState(new Date());
  const [publica, setPublica] = useState(true);

 
  const mudarPrivacidade = (e) => {
    if(e.target.value === "true"){
      setPublica(true);
    }else{
      setPublica(false)
    }
  }  

  return (
    <div className='infos-basicas'>
      <div className='primeira-linha'>
        <input type="text" name="nome-prova" className='input-texto-simples' placeholder="Título da Prova..."></input>
        <select name="privacidade" id="privacidade" className='select-simples' onChange={mudarPrivacidade}>
          <option value={true}>Pública</option>
          <option value={false}>Privada</option>
        </select>
      </div>
      {publica ?
      (<></>)
      :
       (<>
          <input type="number" name="nome-prova" className='input-numero-simples' placeholder="Duração (minutos)..."></input>
          <div className='datas-prova'>
            <label>Data permitida para fazer a prova: </label>
            <input className='input-data' type="date" id="start" name="trip-start"></input>
            <input className='input-data' type="date" id="start" name="trip-start"></input>
          </div>
       </>) 
       }
    </div>
  )
}
