import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import '.././criarProva.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { cadastrarNovaQuestao, setConteudosQuestao, setQuestao } from '../../../../application/questaoSlice';
import CriarAlternativa from './alternativa/criarAlternativa';
import EscolherConteudosQuestao from './escolherConteudos';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



export default function CriarQuestao(conteudosObjetos) {
  const dispatch = useDispatch();

  const prova = useSelector((state) => state.provas.prova);

  useEffect(() => {
    console.log("inicioy:" + prova)
    dispatch(setQuestao({...questao, conteudos: prova.conteudos}))
  }, [dispatch])

  const questao = useSelector((state) => state.questoes.questao);

  const handleChange = (e) => {
    console.log("inicioy:" + prova.conteudos)
    const nome = e.target.name;
    console.log(nome)
    const value = e.target.value;
    dispatch(setQuestao({...questao, [nome]: value}));
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(questao.enunciado){
      dispatch(cadastrarNovaQuestao({questao: questao, prova: prova}))
      dispatch(setQuestao({...questao,  enunciado: "", multiplaEscolha: false, resposta: "", valor: 0, alternativas: [] }));   
      setOpen(false);
    }else{
      alert('preencha todos os campos');
    }
  } 

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
       <Button variant="contained" sx={{ 
                backgroundColor: 'rgb(23, 109, 109)',
                minWidth: '213px',
                minHeight: '4vh' }} onClick={handleClickOpen}>Criar Nova Questão</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Criar Nova Questão"}
        </DialogTitle>
        <DialogContent>
        <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '10vh' }}
  >

      <TextField
            id="outlined-password-input"
            label="Enunciado"
            name='enunciado'
            value={questao.enunciado}
            onChange={handleChange}
            style = {{width: 400, marginTop: 10, textAlign: 'center'}}
          />
  
                
            <InputLabel
             style = {{width: 400, marginTop: 10}}
            id="demo-simple-select-autowidth-label">Privacidade</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              name='publica'
              value={questao.publica}
              onChange={handleChange}
              autoWidth
              label="Privacidade"
              style = {{width: 400, marginTop: 10}}
            >
              <MenuItem value={true}>Publica</MenuItem>
              <MenuItem value={false}>Privada</MenuItem>
            </Select>
 
             <EscolherConteudosQuestao />

            <InputLabel 
            style = {{width: 400, marginTop: 10}}
            id="demo-simple-select-autowidth-label">Tipo da questão</InputLabel>

            <Select
            style = {{width: 400, marginTop: 10}}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              name='multiplaEscolha'
              value={questao.multiplaEscolha}
              onChange={handleChange}
              autoWidth
              label="multiplaEscolha"
            >
              <MenuItem value={true}>Múltipla Escolha</MenuItem>
              <MenuItem value={false}>Dissertativa</MenuItem>
            </Select>

            {!questao.multiplaEscolha ? (
          <>
            <div>
            {questao.alternativas.length !==0 ? (
    <div style = {{ display : "block", flexWrap : "wrap"}}>
      {questao.alternativas.map((alt) => (
        
        <h3> {questao.alternativas.findIndex(a => a ===alt)+1}) {alt.enunciado} {alt.correta ? ('correta') : ('incorreta')} </h3>
      ))}
    </div>
     ): (
       <h3> Nenhuma Alternativa Por Enquanto </h3>
    )}
            </div>
            <CriarAlternativa/>
          </>
     ): (
      <TextField
      multiline
          rows={10}
      id="outlined-password-input"
      label="Resposta"
      name='resposta'
          value={questao.resposta}
          onChange={handleChange}
      style = {{width: 400, marginTop: 10, textAlign: 'center'}}
    />
    )}
                        <Button variant="contained" sx={{ 
                backgroundColor: 'rgb(23, 109, 109)',
                margin: '9px',
                minWidth: '50px',
                minHeight: '4vh' }} onClick={handleSubmit}>Criar Questão</Button>
      </Grid>
        </DialogContent>
      <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
