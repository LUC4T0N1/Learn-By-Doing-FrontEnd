import React from 'react'

function TrocarPagina({quantidade, paginaAtual, proximaPagina, paginaAnterior}) {
  const calcularTotalPaginas = () => {
    const divisaoSimples = Math.floor(quantidade / 10) ;
    const resto = quantidade % 10;
    let totalPaginas = 1;
    if(quantidade != 0){
      if(resto == 0){
        totalPaginas = divisaoSimples
      }else{
        totalPaginas = divisaoSimples + 1
      }
    }
    return totalPaginas;
  }
  return (
    <div className='trocar-pagina'>
    <button className='botao-simples' onClick={paginaAnterior}>Pagina anterior</button>
    <p>{paginaAtual}/{calcularTotalPaginas()}</p>
    <button className='botao-simples' onClick={proximaPagina}>Proxima Pagina</button>
  </div>
  )
}

export default TrocarPagina