import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import '../.././criarProva.css'
import { setQuestao } from '../../../../../application/questaoSlice';
import { setAlternativa } from '../../../../../application/alternativaSlice';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default function CriarAlternativa() {

  const dispatch = useDispatch();

  const questao = useSelector((state) => state.questoes.questao);
  const alternativa = useSelector((state) => state.alternativas.alternativa);
  const [criandoAlternativa, setCriandoAlternativa] = React.useState(false);


  const handleChange = (e) => {
    const nome = e.target.name;
    console.log(nome)
    const value = e.target.value;
    dispatch(setAlternativa({...alternativa, [nome]: value}));
  }  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(criandoAlternativa)
    if(alternativa.enunciado){
      dispatch(setQuestao({...questao, alternativas: questao.alternativas.concat(alternativa)}));
      setCriandoAlternativa(false)
    }else{
      alert('preencha todos os campos');
    }
  } 


  return (
    <>
        {criandoAlternativa ?
        (
        <>
        <TextField
            id="outlined-password-input"
            label="Enunciado"
            name='enunciado'
            value={alternativa.enunciado}
            onChange={handleChange}
            style = {{width: 400, marginTop: 10, textAlign: 'center'}}
          />

        <div className="campo">
            <InputLabel 
            style = {{width: 400, marginTop: 10}}
            id="demo-simple-select-autowidth-label">Correta</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              name='correta'
              value={alternativa.correta}
              onChange={handleChange}
              autoWidth
              label="Correta"
              style = {{width: 400, marginTop: 10}}>
              <MenuItem value={true}>Sim</MenuItem>
              <MenuItem value={false}>Não</MenuItem>
            </Select>
        </div>
        <Button variant="contained" sx={{ 
                backgroundColor: 'black',
                margin: '16px',
                minWidth: '100px',
                minHeight: '3vh' }} onClick={(e) =>handleSubmit(e)}>adicionar alternativa</Button>
        </>
         ): 
    (
      <Button variant="contained" sx={{ 
        backgroundColor: 'black',
        margin: '16px',
        minWidth: '40px',
        minHeight: '3vh' }} onClick={() => setCriandoAlternativa(true)}>+</Button>
    )}
      
    </>
  );
}
