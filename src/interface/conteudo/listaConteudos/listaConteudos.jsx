import React, {useState, useEffect} from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import ConteudoCard from './conteudoCard';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { filtrarConteudos } from '../../../application/conteudoSlice';
import TextField from '@material-ui/core/TextField';
import './listaConteudos.css'
import  List  from '@material-ui/core/List'
import  Grid  from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';

export default function ListaConteudos() {
  
  const [pagina, setPagina] = useState(0);
  const [ordenacao, setOrdenacao] = useState(false);
  const [nome, setNome] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filtrarConteudos({nome: "", pagina: 0, ordenacao: true}))
  }, [dispatch])

  const conteudos = useSelector((state) => state.conteudos.conteudos);
  const quantidade = useSelector((state) => state.conteudos.quantidade);
  let totalPaginas = Math.ceil((quantidade)/7)
  var resultados = []

  const handleChange = (e, pag) => {
    console.log("Nome: "+ e.target.name)
    if(pag!=null){
      console.log("pag: "+ pag)
      if(pagina>0 && pag=="anterior"){
        setPagina(pagina-1)
        dispatch(filtrarConteudos({nome: nome, pagina: pagina-1, ordenacao: true}));
      }else if(pagina+1< totalPaginas && pag=="proximo"){
        console.log("Nome: "+ nome)
        setPagina(pagina+1)
        dispatch(filtrarConteudos({nome: nome, pagina: pagina+1, ordenacao: true}));
        console.log("Nome: "+ nome)
      }
    }else{
      if(e.target.name=="radio-buttons-group"){
        if(e.target.value =="true"){
          setOrdenacao(true)
          dispatch(filtrarConteudos({nome: nome, pagina: 0, ordenacao: true}));
        }else if(e.target.value =="false"){
          setOrdenacao(false)
          dispatch(filtrarConteudos({nome: nome, pagina: 0, ordenacao: false}));
        }

      }else{
        setNome(e.target.value)
        dispatch(filtrarConteudos({nome: e.target.value, pagina: 0, ordenacao: ordenacao}));
      }
    }
    resultados = JSON.stringify(conteudos)
    console.log("resultados: "+ resultados)
  }
  
  return (
    <div>
      {conteudos? ( <Grid
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
            defaultValue="true"
            onChange={(e)=>handleChange(e,null)}
            name="radio-buttons-group">
         <FormControlLabel value="true" control={<Radio />} label="Ordem Alfabética"/>
         <FormControlLabel value="false" control={<Radio />} label="Número de Provas"/>
          </RadioGroup>
        </FormControl>
        {conteudos ? (
    <div >
      {conteudos.map((conteudo) => (
       <div className="ItemLista"  onClick={() => history.push(`/${conteudo.idConteudo}`)}> 
        <ConteudoCard key={conteudo.idConteudo} {...conteudo} />
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
    <Button variant="contained"  sx={{ width: "40%", textAlign: 'left', justifyContent: 'left', margin: '3px'}} onClick={(e)=>handleChange(e,"anterior")} >Anterior</Button>
    <Button variant="contained"  sx={{ width: "40%", textAlign: 'right', justifyContent: 'right', margin: '3px'}} onClick={(e)=>handleChange(e,"proximo")} >Próximo</Button>
    <span  sx={{ width: "40%", textAlign: 'center', justifyContent: 'center', margin: '3px'}}> Página:{pagina+1} de {totalPaginas}</span>
      </div>
    )}
       </List>
    </Grid>) : 
    (<h2 sx={{  maxWidth: 360, bgcolor: 'background.paper' }}>
          Nenhum Conteúdo Foi Criado
        </h2>)
          }
    
    </div>
  );
};
