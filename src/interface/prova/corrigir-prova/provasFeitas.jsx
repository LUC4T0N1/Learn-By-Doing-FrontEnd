import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import './corrigirProva.css'
import { CircularProgress } from '@material-ui/core'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom';
import { getProvasFeitas } from '../../../application/provaSlice';
import { useParams } from 'react-router'
import ProvaFeitaCard from './provaFeitaCard';


function ProvasFeitas () {

 let pagina = 0;
 let history = useHistory();
 const {idProva} = useParams();
 
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(getProvasFeitas({id: idProva}))
 }, [dispatch])

 const provas = useSelector((state) => state.provas.provasFeitas);
 console.log("provas     -> "+ JSON.parse(JSON.stringify(provas)))
 

  return (
    <>
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
       <div onClick={() => history.push(`/corrigir/${idProva}/${prova.id}`)}> 
        <ProvaFeitaCard key={prova.idProva} {...prova} />
       </div>
      ))}
    </div>
     ): (
       <CircularProgress />
    )}
    </List>
    </Grid>
    </>
  );
}

export default ProvasFeitas