import React, {useEffect} from 'react'
import { CircularProgress } from '@material-ui/core'
import ProvaCard from './provaCard'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom';
import { getProvas } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";

function ListaDeProvas() {

 let pagina = 0;
 let history = useHistory();
 
 const {idConteudo} = useParams();
 const body = { idConteudo : parseInt(`${idConteudo}`) , ordemAlfabetica: true, dificuldade: false, popularidade: false}
 
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(getProvas({pagina: pagina, body: body}))
 }, [dispatch])

 const provas = useSelector((state) => state.provas.provas);
 

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
