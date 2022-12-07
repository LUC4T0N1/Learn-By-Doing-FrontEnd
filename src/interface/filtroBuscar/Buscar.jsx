import React from 'react'
import "./Buscar.css"
import BuscarSelect from './BuscarSelect'
import Filtro from './Filtro'
import TrocarPagina from './TrocarPagina'
export default function Buscar({opcoesFiltro}) {
  return (
    <div className='filtro-busca-container'>
      <div className='filtro-busca-formulario'>
        <p className='busca-titulo'>Buscar Conteudo</p>
        <div className='busca-filtro'>
          <BuscarSelect multiplo={false}/>
          <div className='opcoes-filtro'>
            {opcoesFiltro.map((opcao) =>
            ( <Filtro nomeFiltro={opcao}/> 
            ))}
          </div>
        </div>
 {/*        <TrocarPagina/> */}
      </div>
    </div>
  )
}
