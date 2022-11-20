import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import {getProva} from '../../application/provaSlice';
import ResponderQuestaoMultiplaEscolha from '../prova/provaCompleta/responderQuestaoMultiplaEscolha';
import ResponderQuestaoDissertativa from '../prova/provaCompleta/responderQuestaoDissertativa';



export default function ProvaCriada() {
  const {idProva} = useParams();
  let history = useHistory();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProva({idProva: idProva}))
  }, [dispatch])
 
  const prova = useSelector((state) => state.provas.realizarProva);

  const atualizarRespostaQuestao = (e, idQuestao) => {
   return
  }

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
        <Card sx={{ width: "70%",  textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#dddddd' }}>
         <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              marginTop="10px"
            >
         <CardContent>
          <Typography variant="h2" color="text.secondary" gutterBottom sx={{  textTransform: 'uppercase'  }}>
          {prova.nome}
          </Typography>   
          <div>
          {prova.questoes.map((questao, index) => 
              questao.multiplaEscolha ? (
              <ResponderQuestaoMultiplaEscolha key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id, alternativas: questao.alternativas}} atualizarRespostaQuestao = {atualizarRespostaQuestao}/>
              ): (
                <ResponderQuestaoDissertativa key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id}} atualizarRespostaQuestao = {atualizarRespostaQuestao}/>
              )
              )}
         <Button  variant="contained"  sx={{ width: "40%"}}  onClick={() => history.push(`/perfil/provas-criadas`)}>Voltar</Button>
    </div>  
    </CardContent>  
    </Grid>
        </Card>
    </Grid>
    </div>
  )
}
