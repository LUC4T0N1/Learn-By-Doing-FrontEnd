import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getProvaFeita } from '../../application/provaSlice';
import CorrigirQuestaoDissertativa from '../prova/corrigir-prova/corrigir-questao/corrigirQuestaoDissertativa';
import { useHistory } from 'react-router-dom';
import VisualizarQuestaoMultiplaEscolha from '../prova/corrigir-prova/corrigir-questao/visualizarQuestaoMultiplaEscolha';
import VisualizarQuestaoDissertativaCorrigida from './visualizarQuestaoDissertativaCorrigida';


export default function ProvaResolvida() {

  const {idProva} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvaFeita({id: idProva}))
  }, [dispatch])

  const prova = useSelector((state) => state.provas.corrigirProva);
  let history = useHistory(); 
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
         <CardContent>
          <Typography variant="h2" color="text.secondary" gutterBottom sx={{  textTransform: 'uppercase'  }}>
          {prova.nome}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Tempo de execução:  | Total de Questões : {prova.provaDto.quantidadeQuestoes}
          </Typography>
        </CardContent>
          <Typography variant="h5" color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
            Feita por: {prova.nomeAluno} 
          </Typography>
         <div>
            <Typography variant="h5" color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
              Nota: {prova.notaAluno} 
            </Typography>

            {prova.provaDto.questoes.map((questao, index) => 
                questao.multiplaEscolha ? (
                <VisualizarQuestaoMultiplaEscolha key={index} resposta={ questao.respostaAluno} respostaCorreta={ questao.resposta} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id, alternativas: questao.alternativas, valor: questao.valor, nota: questao.notaAluno}}/>
                ): (
                  <VisualizarQuestaoDissertativaCorrigida key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id, idQuestaoResolivda: questao.idQuestaoResolvida, valor: questao.valor, nota: questao.notaAluno, comentario: questao.comentario}} resposta={ questao.respostaAluno} />
                )
                )}
         <Button  variant="contained"  sx={{ width: "40%"}}  onClick={() => history.push(`/perfil/provas-resolvidas`)}>Voltar</Button>
              </div>       
        </Card>
    </Grid>      
    </div>
  )
}
