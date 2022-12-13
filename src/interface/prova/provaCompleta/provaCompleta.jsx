import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { getProva, setProva, setRealizarProva } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ResolverProva from './resolverProva';
import { realizarProva } from '../../../infrastructure/requests/provaRequest';
import { useLocation } from 'react-router-dom';

export default function ProvaCompleta() {
  const location = useLocation();
  const idProva = location.state.idProva;
  console.log("idProva: " + idProva);
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProva({idProva: idProva}))
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
    let objIndex = questoesRespondidasDto.findIndex((obj => obj.idQuestao == idQuestao));
    console.log("Before update: ", questoesRespondidasDto[objIndex])
    questoesRespondidasDto[objIndex].respostaAluno = resp
    console.log("After update: ", questoesRespondidasDto[objIndex])
    dispatch(setRealizarProva({ ...prova, questoesRespondidasDto : questoesRespondidasDto}));
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
    </Grid>
    </div>
  )
}
