import React from 'react'
import { Link } from 'react-router-dom'
import './paginaInicial.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons' 
import Intro from './intro/intro';
import Items from './items/items';

const PaginaInicial = () =>{
  return(
    <>
    <Intro/>
    <Items/>
      {/* <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '50vh' }}
 >


      <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/tipo-de-prova">
       <Card className="card" sx={{   maxWidth: 800,
      textAlign: 'center',
      margin: '10px'}}
      >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom  component="div">
            <h1>Resolver Prova</h1>
          </Typography>
          <Typography className="descricao">
            Busque por provas públicas ou privadas, filtrando por conteúdo, tamanho e popularidade.
            Todas as provas públicas podem ser realizadas inúmeras vezes com o gabarito instantâneo
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/criar">
       <Card className="card" sx={{   maxWidth: 800,
      textAlign: 'center',
      margin: '10px'}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom  component="div">
            <h1>Criar Prova</h1>
          </Typography>
          <Typography className="descricao">
            Crie provas públicas para que todos possam resolver, ou crie uma prova privada.
            Utilize questões públicas feitas por outras pessoas ou crie suas próprias questões
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/corrigir">
       <Card className="card" sx={{   maxWidth: 800,
      textAlign: 'center',
      margin: '10px'}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom  component="div">
            <h1>Corrigir Prova</h1>
          </Typography>
          <Typography className="descricao">
            Corrija suuas provas resolvidas por outras pessoas. Questões de múltipla-escolha são corrigidas automáticamente.
            Faça um comentário sobre cada questão dissertativa corrigida 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/historico">
       <Card className="card" sx={{   maxWidth: 800,
      textAlign: 'center',
      margin: '10px'}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom  component="div">
            <h1>Histórico de Provas</h1>
          </Typography>
          <Typography className="descricao">
           Veja todas as provas ja criadas e resolvidas por você. Acompanhe seu progresso e suas notas. Veja as correções dos professores para suas provas realizadas.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    </Grid> */}
    </>
  )
}

export default PaginaInicial;