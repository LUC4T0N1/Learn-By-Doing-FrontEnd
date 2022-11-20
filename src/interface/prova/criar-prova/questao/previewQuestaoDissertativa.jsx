import React  from 'react'

import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import { useSelector, useDispatch } from "react-redux";
import { setProva } from '../../../../application/provaSlice';

export default function PreviewQuestaoDissertativa(props) {
  const styles = {
    border: '1px solid',
    width: '700px', 
    margin: '10px'
};
const dispatch = useDispatch();
const prova = useSelector((state) => state.provas.prova);
const questao = prova.questoes.filter(q => q.id == props.questao.id)[0]
console.log("id: "+ props.questao.id+"questao: "+ JSON.stringify(questao))

const handleChange = (e) => {
  const valor = e.target.value;
  const val = valor
  console.log("valor: "+ val)
  let questoes = prova.questoes;
  let questoesDto = JSON.parse(JSON.stringify(questoes));
  let objIndex = questoesDto.findIndex(q => q.id == props.questao.id);
  console.log("Before update: ", questoesDto[objIndex])
  questoesDto[objIndex].valor = val
  console.log("After update: ", questoesDto[objIndex])
  dispatch(setProva({ ...prova, questoes : questoesDto}));
}  

  return (
       <div style={styles}>,
          <Typography variant="h5" color="text.secondary" sx={{ justifyContent: 'right'}}>
            Questão {props.questao.numeroQuestao}
          </Typography>
          <TextField
          id="outlined-number"
          label="Valor"
          type="number"
          min="0"
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputProps: { 
                 min: 0
            }}}    
          style = {{width: 70, margin: 15, alignContent: 'left'}}
          onChange={handleChange}
          name="tempo"
        />  
            <h3>Enunciado: {props.questao.enunciado}</h3>
            <TextField
            id="filled-read-only-input"
            InputProps={{
              readOnly: true,
            }}
      multiline
          rows={10}
      label="Resposta"
      name='resposta'
          value={props.questao.resposta}
      style = {{width: 400, marginTop: 10, textAlign: 'center'}}
    />
    </div>
  )
}
