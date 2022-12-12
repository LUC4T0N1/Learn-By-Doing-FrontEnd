import React from 'react'
import "./Buscar.css"

function TrocarPagina({quantidade, paginaAtual, proximaPagina, paginaAnterior}) {
  const divisaoSimples = Math.floor(quantidade / 10) ;
  const resto = quantidade % 10;
  return (
    <div className='trocar-pagina'>
    <button className='botao-simples' onClick={paginaAnterior}>Pagina anterior</button>
    <p>{paginaAtual}/{resto == 0 ? divisaoSimples : divisaoSimples + 1}</p>
    <button className='botao-simples' onClick={proximaPagina}>Proxima Pagina</button>
  </div>
  )
}

export default TrocarPagina