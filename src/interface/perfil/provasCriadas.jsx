import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from '@material-ui/core'
import  List  from '@material-ui/core/List'
import  Grid  from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router'
import { getProvasCriadas } from '../../application/provaSlice';
import ProvaCard from '../prova/listaDeProvas/provaCard';
import './listaProvas.css'


function ProvasCriadas () {

 let pagina = 0;
 let history = useHistory();
 const {idProva} = useParams();
 
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(getProvasCriadas({pagina: pagina}))
 }, [dispatch])

 const provas = useSelector((state) => state.provas.provasCriadas);

  return (
    <div>
      {provas ?  
       ( <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>

   {provas ? (
      <div >
        {provas.map((prova) => (
        <div className="ProvaCard"  onClick={() => history.push(`/perfil/provas-criadas/${prova.id}`)}> 
          <ProvaCard  key={prova.idProva} {...prova} />
        </div>
        ))}
      </div>
      ): (
        <CircularProgress />
      )}
  </List>

          </Grid>
          ) : (<h2 sx={{  maxWidth: 360, bgcolor: 'background.paper' }}>
          Nenhuma Prova Foi Criada
        </h2>)
          }
            
        
    </div>
  );
}

export default ProvasCriadas