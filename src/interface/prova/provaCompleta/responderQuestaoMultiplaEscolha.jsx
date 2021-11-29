import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { getProva } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';


export default function ResponderQuestaoMultiplaEscolha(props) {
  return (
       <div>
          <Typography variant="h5" color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
            Questão {props.questao.numeroQuestao}
          </Typography>
            <h3>Enunciado: {props.questao.enunciado}</h3>
         <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup
            aria-label="Alternativas"
            onChange={(e)=>props.atualizarRespostaQuestao(e,props.questao.idQuestao)}
            name="radio-buttons-group"
            
          >
            {props.questao.alternativas.map((alternativa, index) => 
            <FormControlLabel value={alternativa.id.toString()} control={<Radio />} label={alternativa.enunciado} />
            )}
          </RadioGroup>
        </FormControl>
    </div>
  )
}
