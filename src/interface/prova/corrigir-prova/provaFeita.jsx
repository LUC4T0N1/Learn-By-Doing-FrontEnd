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


export default function ProvaFeita() {

  const {idProvaFeita} = useParams();
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
   console.log("nota: "+ e.target.value)
   console.log("id: "+ idQuestao)
   const nota = e.target.value;
   const notaQuestao = nota
   let questoesCorrigidas= correcao.questoes;
   let questoesCorrigidasDto = JSON.parse(JSON.stringify(questoesCorrigidas));
   let objIndex = questoesCorrigidasDto.findIndex((obj => obj.idQuestaoResolivda == idQuestao));
   console.log("Before update: ", questoesCorrigidasDto[objIndex])
   questoesCorrigidasDto[objIndex].notaQuestao = notaQuestao
   console.log("After update: ", questoesCorrigidasDto[objIndex])
   dispatch(setCorrecaoProva({ ...correcao, questoes : questoesCorrigidasDto}));
 }
 
 const atualizarComentarioQuestao = (e, idQuestao) => {
  console.log("nota: "+ e.target.value)
  console.log("id: "+ idQuestao)
  const comentario = e.target.value;
  const comentarioQuestao = comentario
  let questoesCorrigidas= correcao.questoes;
  let questoesCorrigidasDto = JSON.parse(JSON.stringify(questoesCorrigidas));
  let objIndex = questoesCorrigidasDto.findIndex((obj => obj.idQuestaoResolivda == idQuestao));
  console.log("Before update: ", questoesCorrigidasDto[objIndex])
  questoesCorrigidasDto[objIndex].comentarioProfessor = comentarioQuestao
  console.log("After update: ", questoesCorrigidasDto[objIndex])
  dispatch(setCorrecaoProva({ ...correcao, questoes : questoesCorrigidasDto}));
 }
 const [open, setOpen] = React.useState(false);
 const handleClickOpen = (e) => {

  setOpen(true);
/*   dispatch(corrigirQuestoesMultiplaEscolha({id: idProvaFeita})) */
  let correcaoProva = []
  prova.provaDto.questoes.map(questao =>{
    if(!questao.multiplaEscolha){
    let corr = {notaQuestao: 0, idQuestaoResolivda: questao.idQuestaoResolvida, comentarioProfessor: ""};
    correcaoProva.push(corr)
  }
  })
  dispatch(setCorrecaoProva({ ...correcao, questoes : correcaoProva, idProvaRealizada: prova.id })) 
};



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
    </Grid>      
    </div>
  )
}
