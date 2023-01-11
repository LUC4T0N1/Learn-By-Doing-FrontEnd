import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import {  corrigirProva, getProvaFeita, setCorrecaoProva } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CorrigirQuestaoDissertativa from './corrigir-questao/corrigirQuestaoDissertativa';
import VisualizarQuestaoMultiplaEscolha from './corrigir-questao/visualizarQuestaoMultiplaEscolha';
import { useLocation, useHistory } from 'react-router-dom';
import InfosProva from '../provaCompleta/InfosProva';
import VisualizarQuestoes from '../criar-prova/questoes/visualizar-questoes/VisualizarQuestoes';
import CorrigirQuestao from '../criar-prova/questoes/corrigirQuestao/CorrigirQuestao';

export default function ProvaFeita() {

  const location = useLocation();
  const idProvaFeita = location.state.idProva;
  console.log("idProva: " + idProvaFeita);
  let history = useHistory(); 

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvaFeita({id: idProvaFeita}))
  }, [dispatch])

  const prova = useSelector((state) => state.provas.corrigirProva);
  const correcao = useSelector((state) => state.provas.provaCorrigida);

  const finalizarCorrecao = (e) => {
    e.preventDefault();
    dispatch(corrigirProva({ body: correcao})) 
 } 

  const atualizarNotaQuestao = (e, idQuestao) => {
   const nota = e.target.value;
   const notaQuestao = nota
   let questoesCorrigidas= correcao.questoes;
   let questoesCorrigidasDto = JSON.parse(JSON.stringify(questoesCorrigidas));
   if(questoesCorrigidasDto.length == 0){
    console.log("oi")
  prova.provaDto.questoes.map(questao =>{
    if(!questao.multiplaEscolha){
    let corr = {notaQuestao: 0, idQuestaoResolvida: questao.idQuestaoResolvida, comentarioProfessor: ""};
    questoesCorrigidasDto.push(corr)
  }
  })
}
   let objIndex = questoesCorrigidasDto.findIndex((obj => obj.idQuestaoResolvida == idQuestao));
   questoesCorrigidasDto[objIndex].notaQuestao = notaQuestao
   dispatch(setCorrecaoProva({ ...correcao, questoes : questoesCorrigidasDto}));
 }
 
 const atualizarComentarioQuestao = (e, idQuestao) => {
  console.log("id: "+idQuestao)
  const comentario = e.target.value;
  const comentarioQuestao = comentario
  console.log("comentario: "+comentario)
  let questoesCorrigidas = correcao.questoes;
  console.log("tamanho: "+questoesCorrigidas.length)
  let questoesCorrigidasDto = JSON.parse(JSON.stringify(questoesCorrigidas));
  if(questoesCorrigidasDto.length == 0){
    console.log("oi")
  prova.provaDto.questoes.map(questao =>{
    if(!questao.multiplaEscolha){
    let corr = {notaQuestao: 0, idQuestaoResolvida: questao.idQuestaoResolvida, comentarioProfessor: ""};
    questoesCorrigidasDto.push(corr)
  }
  })
}
  let objIndex = questoesCorrigidasDto.findIndex((obj => obj.idQuestaoResolvida == idQuestao));
  questoesCorrigidasDto[objIndex].comentarioProfessor = comentarioQuestao
  dispatch(setCorrecaoProva({ ...correcao, questoes : questoesCorrigidasDto}));
 }
 




  return (
    <div className='criar-prova'>
    <div className='formulario-criar-prova'> 
      <p className='criar-prova-titulo'>{prova.nome}</p>
      <InfosProva prova={prova.provaDto}/>
      {prova.provaDto.questoes.map((questao, index) => 
     <CorrigirQuestao key={index} questao={{idQuestaoResolvida:questao.idQuestaoResolvida, numeroQuestao: index+1, enunciado: questao.enunciado, publica: questao.publica, multiplaEscolha: questao.multiplaEscolha, id: questao.id, valor: questao.valor, resposta: questao.resposta, respostaAluno: questao.respostaAluno, notaAluno : questao.notaAluno, alternativas: questao.alternativas}} atualizarComentarioQuestao={atualizarComentarioQuestao} atualizarNotaQuestao={atualizarNotaQuestao}/>)}
     <button className='botao-simples' onClick={() => history.push("/perfil/provas-criadas")}>Voltar</button>
     <button className='botao-simples' onClick={finalizarCorrecao}>Finalizar Correção</button>
    </div>
       {/* <div>
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
          <Typography variant="h5" color="text.secondary" sx={{ width: "100%", justifyContent: 'right'}}>
            Feita por: {prova.nomeAluno} 
          </Typography>
         { open ? (<div>
            <Typography variant="h5" color="text.secondary" sx={{ width: "100%", justifyContent: 'right'}}>
              Nota: {prova.notaAluno} 
            </Typography>

            {prova.provaDto.questoes.map((questao, index) => 
                questao.multiplaEscolha ? (
                <VisualizarQuestaoMultiplaEscolha key={index} resposta={ questao.respostaAluno} respostaCorreta={ questao.resposta} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id, alternativas: questao.alternativas, valor: questao.valor, nota: questao.notaAluno}}/>
                ): (
                  <CorrigirQuestaoDissertativa key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id, idQuestaoResolivda: questao.idQuestaoResolvida, valor: questao.valor, nota: questao.notaAluno, comentario: questao.comentario}} resposta={ questao.respostaAluno} atualizarNotaQuestao = {atualizarNotaQuestao} atualizarComentarioQuestao = {atualizarComentarioQuestao}/>
                )
                )}

           <CardActions style={{justifyContent: 'center'}}>
              <Button  variant="contained"  sx={{ width: "40%"}}  onClick={finalizarCorrecao}>Corrigir Prova</Button>
            </CardActions>
              </div>
        ): (
          <CardActions style={{justifyContent: 'center'}}>
              <Button  variant="contained"  sx={{ width: "40%"}} onClick={handleClickOpen} >Iniciar</Button>
            </CardActions>
        )  }
         
        </Card>
    </Grid>       */}
    </div>
  )
}
