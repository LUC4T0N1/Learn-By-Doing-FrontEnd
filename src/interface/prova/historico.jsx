import React from 'react'
import { Link } from 'react-router-dom'
import './paginaInicial.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Historico = () =>{

  return(

      <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
 >
   <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/perfil/provas-criadas">
       <Card className="card" sx={{   maxWidth: 800, minWidth: 800,
      textAlign: 'center',
      margin: '10px'}}
      >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom  component="div">
            <h1>Provas Criadas</h1>
          </Typography>
          <Typography >
            Veja todas as provas já criadas por você
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/perfil/provas-resolvidas">
       <Card className="card" sx={{   maxWidth: 800,  minWidth: 800,
      textAlign: 'center',
      margin: '10px'}}
      >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom  component="div">
            <h1>Provas Resolvidas</h1>
          </Typography>
          <Typography >
            Veja todas as provas já resolvidas por você
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    </Grid>
  )
}

export default Historico;