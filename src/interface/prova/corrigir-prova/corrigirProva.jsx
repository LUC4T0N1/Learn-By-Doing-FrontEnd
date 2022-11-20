import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import './corrigirProva.css'
import { CircularProgress } from '@material-ui/core'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import ProvaCard from '../listaDeProvas/provaCard'
import { useHistory } from 'react-router-dom';
import { getProvasCriadas, setCorrecaoProva } from '../../../application/provaSlice';

function CorrigirProva () {

 let pagina = 0;
 let history = useHistory();

 
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(getProvasCriadas({pagina: pagina}))
 }, [dispatch])

 const provas = useSelector((state) => state.provas.provasCriadas);

  return (
    <div>
           <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
       <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
    {provas ? (
    <div style = {{ display : "flex", flexWrap : "wrap"}}>
      {provas.map((prova) => (
       <div onClick={() => history.push(`/corrigir/${prova.id}`)}> 
        <ProvaCard key={prova.idProva} {...prova} />
       </div>
      ))}
    </div>
     ): (
       <CircularProgress />
    )}
    </List>
    </Grid>
    </div>
  );
}

export default CorrigirProva