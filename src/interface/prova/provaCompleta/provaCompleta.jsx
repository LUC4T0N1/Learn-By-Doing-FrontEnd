import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

export default function ProvaCompleta() {
  const [prova, setProva] = useState();
  const {idProva} = useParams();
   
   useEffect(() => {
     axios.get(`http://localhost:8080/api/prova/buscarID?id=${idProva}`).then((res) => {
       const responseProva = res.data;
       setProva(responseProva);
       console.log(responseProva);
     });
   }, []);

  
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
