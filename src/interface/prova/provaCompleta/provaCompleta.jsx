import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { getProva, getProvaFazer, setProva, setRealizarProva, realizarProva } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ResolverProva from './resolverProva';
import { useLocation } from 'react-router-dom';
import '../criar-prova/criarProva.css'
import InfosProva from './InfosProva';
import ResponderQuestao from '../criar-prova/questoes/responder-questao/ResponderQuestao';

export default function ProvaCompleta() {
  const location = useLocation();
  const idProva = location.state.idProva;
  console.log("idProva: " + idProva);

  const [comecou, setComecou] = useState(false);
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvaFazer({idProva: idProva}))
  }, [dispatch])
 
  const prova = useSelector((state) => state.provas.realizarProva);

  const [open, setOpen] = React.useState(false);

  const finalizarProva = (e) => {
    console.log("1")
    dispatch(realizarProva({ ...prova, fodase: ""})) 
    console.log("22")
    dispatch(setRealizarProva({ realizarProva: {nome: "", publica: true, conteudos: [],
    nomeConteudos: [], questoes:[], idsQuestoes:[],
    quantidadeQuestoes: 0, tempo: 0, questoesRespondidasDto:[]}})); 
    console.log("3")
  }
  const handleClickOpen = (e) => {

    setOpen(true);
    let responderQuestoes = []
    prova.questoes.map(questao =>{
      let quest = {respostaAluno: "", idQuestao: questao.id};
      responderQuestoes.push(quest)
    })
    dispatch(setRealizarProva({ ...prova, questoesRespondidasDto : responderQuestoes})) 
  };

  const atualizarRespostaQuestao = (e, idQuestao) => {
    const resposta = e.target.value;
    const resp = resposta
    console.log("respossta: "+ resposta)
    let questoesRespondidas = prova.questoesRespondidasDto;
    let questoesRespondidasDto = JSON.parse(JSON.stringify(questoesRespondidas));
    if(questoesRespondidasDto.length == 0){
      prova.questoes.map(q => {
        questoesRespondidasDto.push({ idQuestao: q.id, respostaAluno: ""})
      })
    }
    let objIndex = questoesRespondidasDto.findIndex((obj => obj.idQuestao == idQuestao));
    console.log("aaa: "+ idQuestao)
    console.log("aaa: "+ objIndex)
    console.log("Before update: ", questoesRespondidasDto)
    console.log("Before update: ", questoesRespondidasDto[objIndex])
    questoesRespondidasDto[objIndex].respostaAluno = resp
    console.log("After update: ", JSON.stringify(questoesRespondidasDto))
    console.log("After update: ", JSON.stringify(questoesRespondidasDto[objIndex]))
    console.log("After update tt: ", objIndex)
    dispatch(setRealizarProva({ ...prova, questoesRespondidasDto : questoesRespondidasDto}));
  }



  const comecarProva = () =>{
    setComecou(true);
  }
  return (
       <div className='criar-prova'>
        <div className='formulario-criar-prova'>
          <p className='criar-prova-titulo'>{prova.nome}</p>
          <InfosProva prova={prova}/>
          {comecou ? 
            (<>
              {prova.questoes.map(questao =>
              <ResponderQuestao questao={questao} atualizarRespostaQuestao={atualizarRespostaQuestao}/>)}
              <button className='botao-simples' onClick={finalizarProva}>Finalizar Prova</button>
              </>
              )
          :
          (<>
            <button className='botao-simples' onClick={comecarProva}>Começar Prova</button>
          </>)
          }
        </div>
       {/*  <Grid
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
          </CardContent>
            {open ? (
        <ResolverProva atualizarRespostaQuestao = {atualizarRespostaQuestao} finalizarProva = {finalizarProva}/>
        ): (
          <CardActions style={{justifyContent: 'center'}}>
              <Button  variant="contained"  sx={{ width: "40%"}} onClick={handleClickOpen} >Iniciar</Button>
            </CardActions>
        )}    
        </Grid> 
        </Card>
    </Grid> */}
    </div>
  )
}
