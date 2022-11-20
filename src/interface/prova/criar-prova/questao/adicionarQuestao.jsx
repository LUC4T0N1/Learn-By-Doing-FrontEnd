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
import CriarQuestao from './criarQuestao';
import EscolherQuestao from './escolherQuestao';




export default function AdicionarQuestao(conteudosObjetos) {
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
       <Button variant="contained" sx={{ 
                backgroundColor: 'rgb(23, 109, 109)',
                minWidth: '100px',
                minHeight: '4vh' }} onClick={handleClickOpen}>Adicionar Questão</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Adicionar Questão"}
        </DialogTitle>
        <DialogContent>
          <CriarQuestao/>
        </DialogContent>
        <DialogContent>
          <EscolherQuestao/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
