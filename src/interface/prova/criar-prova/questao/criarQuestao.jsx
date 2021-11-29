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
import { setProva } from '../../../../application/provaSlice';




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
    if(questao.enunciado && questao.valor){
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
      <Button variant="contained" onClick={handleClickOpen}>
        Criar Nova Questão
      </Button>
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
        <label htmlFor='enunciado'>Enunciado: </label>
            <input
              type='text'
              id='enunciado'
              name='enunciado'
              value={questao.enunciado}
              onChange={handleChange}/>
        </DialogContent>
        <DialogContent>
        <div className="campo">
            <InputLabel id="demo-simple-select-autowidth-label">Privacidade</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              name='publica'
              value={questao.publica}
              onChange={handleChange}
              autoWidth
              label="Privacidade"
            >
              <MenuItem value={true}>Publica</MenuItem>
              <MenuItem value={false}>Privada</MenuItem>
            </Select>
        </div>
        </DialogContent>
        <EscolherConteudosQuestao />
        <DialogContent>
        <div className="campo">
              <label htmlFor='tentativas'>Valor: </label>
              <input
                type='number'
                min="1"
                id='valor'
                name='valor'
                value={questao.valor}
                onChange={handleChange}/>
            </div>
            </DialogContent>
        <DialogContent>
        <div>
          <FormControl sx={{ m: 3, minWidth: 130 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Tipo da questão</InputLabel>
            <Select
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
          </FormControl>
        </div>
        </DialogContent>
        {questao.multiplaEscolha ? (
          <DialogContent>
            <div>
            {questao.alternativas.length !==0 ? (
    <div style = {{ display : "block", flexWrap : "wrap"}}>
      {questao.alternativas.map((alt) => (
        <p> {questao.alternativas.findIndex(a => a ===alt)+1}) {alt.enunciado} {alt.correta ? ('correta') : ('incorreta')} </p>
      ))}
    </div>
     ): (
       <p> Nenhuma Alternativa Por Enquanto </p>
    )}
            </div>
            <CriarAlternativa/>
          </DialogContent>
     ): (
      <DialogContent>
       <label htmlFor='enunciado'>Resposta: </label>
        <input
          type='text'
          id='resposta'
          name='resposta'
          value={questao.resposta}
          onChange={handleChange}/>
      </DialogContent>
    )}
      <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Criar
          </Button>
      </DialogActions>
      <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
