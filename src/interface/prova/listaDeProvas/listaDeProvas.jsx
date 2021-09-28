import React, {useState} from 'react'
import { CircularProgress } from '@material-ui/core'
import ProvaCard from './provaCard'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom';
import { BuscarProvasService }from '../../../teste-service';





function ListaDeProvas() {

 let pagina = 0;
 let history = useHistory();
 
 const {idConteudo} = useParams();
 const body = { idConteudo : parseInt(`${idConteudo}`) , ordemAlfabetica: true, dificuldade: false, popularidade: false}
 
 const provas = BuscarProvasService(pagina, body);
 

  return (
    <>
    {provas ? (
    <div style = {{ display : "flex", flexWrap : "wrap"}}>
      {provas.map((prova) => (
       <div onClick={() => history.push(`/${idConteudo}/${prova.id}`)}> 
        <ProvaCard key={prova.idProva} {...prova} />
       </div>
      ))}
    </div>
     ): (
       <CircularProgress />
    )}
    </>
  );
}

export default ListaDeProvas
