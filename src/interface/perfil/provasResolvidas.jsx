import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from '@material-ui/core'
import  Grid  from '@material-ui/core/Grid'
import  List  from '@material-ui/core/List'
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router'
import {  getProvasRealizadas } from '../../application/provaSlice';
import ProvaResolvidaCard from './provaResolvidaCard';
import './listaProvas.css'


function ProvasResolvidas () {

 let pagina = 0;
 let history = useHistory();
 const {idProva} = useParams();
 
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(getProvasRealizadas({id: idProva}))
 }, [dispatch])

 const provas = useSelector((state) => state.provas.provasFeitas);
 console.log("provas     -> "+ JSON.parse(JSON.stringify(provas)))
 

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
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {provas ? (
    <div >
      {provas.map((prova) => (
       <div className="ProvaCard"  onClick={() => history.push(`/perfil/provas-resolvidas/${prova.id}`)}> 
        <ProvaResolvidaCard key={prova.id} {...prova} />
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

export default ProvasResolvidas