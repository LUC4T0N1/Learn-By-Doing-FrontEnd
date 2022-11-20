import React from 'react'
import { Link } from 'react-router-dom'
import './paginaInicial.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const EscolherTipo = () =>{
  return(
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
   >
     <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/escolherProvaPrivada">
         <Card className="card" sx={{   maxWidth: 800, minWidth: 800,
        textAlign: 'center',
        margin: '10px'}}
        >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom  component="div">
              <h1>Prova Privada</h1>
            </Typography>
            <Typography >
              Realizar uma prova privada a partir de um id secretp
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
      <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/conteudos">
         <Card className="card" sx={{   maxWidth: 800,  minWidth: 800,
        textAlign: 'center',
        margin: '10px'}}
        >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom  component="div">
              <h1>Prova Pública</h1>
            </Typography>
            <Typography >
              Escolher uma prova pública por conteúdo, tamanho ou popularidade
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
      </Grid>
  )
}

export default EscolherTipo;
