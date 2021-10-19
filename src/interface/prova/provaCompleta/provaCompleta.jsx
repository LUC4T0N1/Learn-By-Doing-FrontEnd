import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { getProva } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";


export default function ProvaCompleta() {
  const {idProva} = useParams();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProva({idProva: idProva}))
  }, [dispatch])
 
  const prova = useSelector((state) => state.provas.prova);

  return (
    <div>
        <p>{`Prova completa de id ${idProva}`}</p>
        <div style ={{ backgroundColor : "pink", margin: "10px", width: "200px"}}>
      <h4>nome: {prova.nome}</h4>
      <h4>popularidade: {prova.popularidade}</h4>
      <h4>mediaNotas: {prova.mediaNotas}</h4>
      <h4>quantidadeQuestoes: {prova.quantidadeQuestoes}</h4>
    </div>
    </div>
  )
}
