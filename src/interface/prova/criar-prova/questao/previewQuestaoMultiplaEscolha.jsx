import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { useSelector, useDispatch } from "react-redux";
import { setProva } from '../../../../application/provaSlice';

export default function PreviewQuestaoMultiplaEscolha(props) {
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

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const GreenTextTypography = withStyles({
  root: {
    color: green[400]
  }
})(Typography);

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RedTextTypography = withStyles({
  root: {
    color: red[400]
  }
})(Typography);


  return (
       <div style={styles}>
          <Typography color="text.secondary" sx={{  justifyContent: 'right'}}>
            <h3>Questão {props.questao.numeroQuestao}</h3>
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
         <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup
            aria-label="Alternativas"
            name="radio-buttons-group"
          >
            {props.questao.alternativas.map((alternativa, index) => 
              alternativa.id == props.resposta ? 
              ( props.questao.nota > 0 ? 
                (
                  <FormControlLabel value={alternativa.id} control={<GreenRadio checked={true}/>} label={<GreenTextTypography>{alternativa.enunciado}</GreenTextTypography>} />
                )
                :
                (
                  <FormControlLabel value={alternativa.id} control={<RedRadio checked={true}/>} label={<RedTextTypography>{alternativa.enunciado}</RedTextTypography>} />
                )
              )
              : 
              ( alternativa.id == props.respostaCorreta ? 
                (
                  <FormControlLabel value={alternativa.id} control={<GreenRadio checked={true}/>} label={<GreenTextTypography>{alternativa.enunciado}</GreenTextTypography>} />
                )
                : 
                (
                  <FormControlLabel value={alternativa.id} control={<Radio />} label={alternativa.enunciado} />
                )
              )
            )}
          </RadioGroup>
        </FormControl> 
    </div>
  )
}
