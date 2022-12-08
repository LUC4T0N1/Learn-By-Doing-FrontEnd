import React, {useEffect, useState} from 'react'
import ProvaCard from './provaCard'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom';
import {  getProvasPorConteudo } from '../../../application/provaSlice';
import { Button, CircularProgress } from '@material-ui/core'
import { useSelector, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import './listaProvas.css'
import  List  from '@material-ui/core/List'
import  Grid  from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import Buscar from '../../filtroBuscar/Buscar';

function ListaDeProvas() {

 let history = useHistory();
 const [pagina, setPagina] = useState(0);
 const [ordenacao, setOrdenacao] = useState(1);
 const [nome, setNome] = useState("");
 
 const {idConteudo} = useParams();
 
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(getProvasPorConteudo({pagina: 0, nome: "", ordenacao: 1, idConteudo : parseInt(`${idConteudo}`)}))
 }, [dispatch])

 const provas = useSelector((state) => state.provas.provas);
 let quantidade = useSelector((state) => state.provas.quantidade);
 let totalPaginas = Math.ceil((quantidade)/5)
 var resultados = []

 const handleChange = (e, pag) => {
   if(pag!=null){
     if(pagina>0 && pag=="anterior"){
       console.log("OI")
       setPagina(pagina-1)
       dispatch(getProvasPorConteudo({pagina: pagina-1, nome: nome, ordenacao: ordenacao, idConteudo : parseInt(`${idConteudo}`)}))
     }else if(pagina+1< totalPaginas && pag=="proximo"){
       setPagina(pagina+1)
       console.log("THA")
       dispatch(getProvasPorConteudo({pagina: pagina+1, nome: nome, ordenacao: ordenacao, idConteudo : parseInt(`${idConteudo}`)}))
     }
   }else{
      if(e.target.name=="radio-buttons-group"){
       if(e.target.value =="1"){
         setOrdenacao(1)
         dispatch(getProvasPorConteudo({pagina: pagina, nome: nome, ordenacao: 1, idConteudo : parseInt(`${idConteudo}`)}))
       }else if(e.target.value =="2"){
         setOrdenacao(2)
         dispatch(getProvasPorConteudo({pagina: pagina, nome: nome, ordenacao: 2, idConteudo : parseInt(`${idConteudo}`)}))
       }else if(e.target.value =="3"){
        setOrdenacao(3)
        dispatch(getProvasPorConteudo({pagina: pagina, nome: nome, ordenacao: 3, idConteudo : parseInt(`${idConteudo}`)}))
      }
     }else{ 
       setNome(e.target.value)
       dispatch(getProvasPorConteudo({pagina: pagina, nome: e.target.value, ordenacao: ordenacao, idConteudo : parseInt(`${idConteudo}`)}))
      } 
   }
 }
 

  return (
    <Buscar titulo={"Prova"} opcoesFiltro={["Ordem Alfabética", "Popularidade", "Dificuldade", "Tamanho"]}/>);
  /*   <div>
    <Grid
         container
         spacing={0}
         direction="column"
         alignItems="center"
         justify="center"
         style={{ minHeight: '100vh' }}
       >
<List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
 <TextField 
 style = {{width: 400, margin: 8}}
  label="Buscar" onChange={(e)=>handleChange(e,null)} />
 <FormControl component="fieldset">
         <FormLabel component="legend"></FormLabel>
         <RadioGroup
           aria-label="Ordenar Por"
           defaultValue="1"
           onChange={(e)=>handleChange(e,null)}
           name="radio-buttons-group">
        <FormControlLabel value="1" control={<Radio />} label="Ordem Alfabética"/>
        <FormControlLabel value="2" control={<Radio />} label="Quantidade de Questões"/>
        <FormControlLabel value="3" control={<Radio />} label="Popularidade"/>
         </RadioGroup>
       </FormControl>
    {provas ? (
    <div style = {{ display : "flex", flexWrap : "wrap"}}>
      {provas.map((prova) => (
       <div onClick={() => history.push(`/realizar-prova-publica/${prova.id}`)}> 
        <ProvaCard key={prova.idProva} {...prova} />
       </div>
      ))}
    </div>
     ): (
       <CircularProgress />
    )}
 
    {nome != "" ? (
      <div>
      </div>
    ) : (
      <div>
    <Button variant="contained"  sx={{ width: "40%", margin: '3px'}} onClick={(e)=>handleChange(e,"anterior")} >Anterior</Button>
    <Button variant="contained"  sx={{ width: "40%", margin: '3px'}} onClick={(e)=>handleChange(e,"proximo")} >Próximo</Button>
    <span> Página:{pagina+1} de {totalPaginas}</span>
      </div>
    )}
       </List>
   
    </Grid>
    </div>
  ); */
}

export default ListaDeProvas
