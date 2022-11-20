import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { getProva, getProvaPrivada, setProva, setRealizarProva } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ResolverProva from './resolverProva';
import { realizarProva } from '../../../infrastructure/requests/provaRequest';
import Counter from '../counter';


export default function ProvaCompletaPrivada() {
  const {idProva} = useParams();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvaPrivada({idProva: idProva}))
  }, [dispatch])
 
  const prova = useSelector((state) => state.provas.realizarProva);

  const finalizarProva = (e) => {
    console.log("1")
    dispatch(realizarProva({ ...prova})) 
    console.log("22")
    dispatch(setRealizarProva({ realizarProva: {nome: "", publica: true, conteudos: [],
    nomeConteudos: [], questoes:[], idsQuestoes:[],
    quantidadeQuestoes: 0, tempo: 0, questoesRespondidasDto:[]}})); 
    console.log("3")
  }
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (e) => {

    setOpen(true);
    let responderQuestoes = []
    prova.questoes.map(questao =>{
      let quest = {respostaAluno: "", idQuestao: questao.id};
      responderQuestoes.push(quest)
    })
    dispatch(setRealizarProva({ ...prova, questoesRespondidasDto : responderQuestoes})) 
  };
  let horas = prova.tempo >=60 ? (Math.ceil((prova.tempo)/60 )) : (0)

  const atualizarRespostaQuestao = (e, idQuestao) => {
    const resposta = e.target.value;
    const resp = resposta
    let questoesRespondidas = prova.questoesRespondidasDto;
    let questoesRespondidasDto = JSON.parse(JSON.stringify(questoesRespondidas));
    let objIndex = questoesRespondidasDto.findIndex((obj => obj.idQuestao == idQuestao));
    questoesRespondidasDto[objIndex].respostaAluno = resp
    dispatch(setRealizarProva({ ...prova, questoesRespondidasDto : questoesRespondidasDto}));
  }
  return (
       <div>
             {new Date().getTime() <= new Date(prova.dataFinal).getTime() && new Date().getTime() >= new Date(prova.dataInicial).getTime() ? ( <Grid
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
            {open ? (
              <div>
               <Typography variant="h5" color="text.secondary" sx={{textAlign: 'right', margin: '10px'}}>
                <Counter initialHour = {horas} initialMinute = {(prova.tempo)%60} initialSeconds = {0}/> 
             </Typography>
        <ResolverProva atualizarRespostaQuestao = {atualizarRespostaQuestao} finalizarProva = {finalizarProva}/>
        </div>
        ): (
          <CardActions style={{justifyContent: 'center'}}>
              <Button  variant="contained"  sx={{ width: "40%"}} onClick={handleClickOpen} >Iniciar</Button>
            </CardActions>
        )}     
                  </CardContent>
                  </Grid>
        </Card>
    </Grid>) :  (
      new Date().getTime() >= new Date(prova.dataFinal).getTime() ? 
      ( <div>
        Essa prova não pode mais ser realizada! Seu período de realização se encerrou em {new Date(prova.dataFinal).getDate}
        </div>) :
        (<div>
          Essa prova ainda não pode ser realizada! Seu início será: {prova.dataInicial}
          </div>)
     
    )}
       
    </div>
  )
}
