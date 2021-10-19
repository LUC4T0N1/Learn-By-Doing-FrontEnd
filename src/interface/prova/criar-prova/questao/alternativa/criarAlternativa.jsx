import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import '../.././criarProva.css'
import { setQuestao } from '../../../../../application/questaoSlice';
import { setAlternativa } from '../../../../../application/alternativaSlice';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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
    <div>
        {criandoAlternativa ?
        (
        <div>
        <div>
          <label htmlFor='enunciado'>Enunciado: </label>
            <input
            type='text'
            id='enunciado'
            name='enunciado'
            value={alternativa.enunciado}
            onChange={handleChange}/>
        </div>
        <div className="campo">
            <InputLabel id="demo-simple-select-autowidth-label">Correta</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              name='correta'
              value={alternativa.correta}
              onChange={handleChange}
              autoWidth
              label="Correta">
              <MenuItem value={true}>Sim</MenuItem>
              <MenuItem value={false}>Não</MenuItem>
            </Select>
        </div>
          <button type='submit' onClick={(e) =>handleSubmit(e)}>
          add
          </button>
        </div>
         ): 
    (
      <button type='submit' onClick={() => setCriandoAlternativa(true)}>
       +
      </button>
    )}
      
    </div>
  );
}
