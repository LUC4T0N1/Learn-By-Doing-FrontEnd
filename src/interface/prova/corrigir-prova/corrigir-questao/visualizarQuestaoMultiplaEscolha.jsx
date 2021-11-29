import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {withStyles} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

export default function VisualizarQuestaoMultiplaEscolha(props) {
  const styles = {
    border: '1px solid', 
};

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
          <Typography variant="h5" color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
            Questão {props.questao.numeroQuestao}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
            Valor: {props.questao.valor}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
            Nota: {props.questao.nota}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
          { props.questao.nota > 0 ? (<div>
                Correta
              </div>
        ): (
          <div>
          Inorreta
        </div>
        )  }
          </Typography>
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
