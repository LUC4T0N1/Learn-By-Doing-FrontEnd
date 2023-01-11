import React, {useEffect, useState} from 'react'
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
import { useLocation } from 'react-router-dom';
import InfosProva from '../prova/provaCompleta/InfosProva';
import ResponderQuestao from '../prova/criar-prova/questoes/responder-questao/ResponderQuestao';
import VisualizacaoQuestao from '../prova/criar-prova/questoes/VisualizacaoQuestao';
import VisualizarQuestoes from '../prova/criar-prova/questoes/visualizar-questoes/VisualizarQuestoes';


export default function ProvaResolvida() {
  const location = useLocation();
  const idProva = location.state.idProva;
  console.log("idProva: " + idProva);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvaFeita({id: idProva}))
  }, [dispatch])

  const prova = useSelector((state) => state.provas.corrigirProva).provaDto;
  let history = useHistory(); 

  return (
       <div className='criar-prova'>
        <div className='formulario-criar-prova'> 
          <p className='criar-prova-titulo'>{prova.nome}</p>
          <InfosProva prova={prova}/>
          {prova.questoes.map((questao, index) => 
         <VisualizarQuestoes key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, publica: questao.publica, multiplaEscolha: questao.multiplaEscolha, id: questao.id, valor: questao.valor, resposta: questao.resposta, alternativas: questao.alternativas, notaAluno: questao.notaAluno, respostaAluno: questao.respostaAluno, comentario: questao.comentario}} resposta={ questao.respostaAluno} />)}
         <button className='botao-simples' onClick={() => history.push("/perfil/provas-criadas")}>Voltar</button>
        </div>
  
{/*         <div>
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
          {prova.provaDto.nome}
          </Typography>

        </CardContent>

         <div>
            <Typography variant="h2" color="text.secondary" sx={{ width: "100%", justifyContent: 'right'}}>
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
    </div>  */}
        </div>
  )
}
