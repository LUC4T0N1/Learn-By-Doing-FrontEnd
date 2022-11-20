import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import '.././criarProva.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { setProva } from "../../../../application/provaSlice";
import {  getQuestoes, setQuestao } from '../../../../application/questaoSlice';
import Grid from '@material-ui/core/Grid';




export default function EscolherQuestao(conteudosObjetos) {
  let pagina = 0;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestoes({body: {}}))
  }, [dispatch])
  const prova = useSelector((state) => state.provas.prova);
  const questao = useSelector((state) => state.questoes.questao);
  const filtroQuestoes = useSelector((state) => state.questoes.filtroQuestoes);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value)
    dispatch(setQuestao(value));
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(questao.enunciado){
      dispatch(setProva({...prova, questoes: prova.questoes.concat(questao)}))
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
                minWidth: '100px',
                minHeight: '4vh'
                 }} onClick={handleClickOpen}>Buscar Nova Questão</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ m: 12, minWidth: 300 }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Buscar Questão"}
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
        <InputLabel
        style = {{width: 400, marginTop: 10}}
         id="demo-simple-select-autowidth-label">Questão</InputLabel>
        <Select
        style = {{width: 400, marginTop: 10}}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={questao}
          onChange={handleChange}
          autoWidth
          label="questão"
        >
            {filtroQuestoes.map((questao) => (
            <MenuItem
              key={questao.id}
              value={questao}
            >
              {questao.enunciado}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" sx={{ 
                backgroundColor: 'rgb(23, 109, 109)',
                margin: '10px',
                minWidth: '213px',
                minHeight: '4vh' }} onClick={handleSubmit}>Adicionar Questão</Button>
 </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
