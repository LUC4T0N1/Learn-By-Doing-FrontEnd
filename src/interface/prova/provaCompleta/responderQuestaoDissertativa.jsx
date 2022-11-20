import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { getProva } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


export default function ResponderQuestaoDissertativa(props) {
  const styles = {
    border: '1px solid',
    width: '700px', 
    margin: '10px'
};
  return (
       <div style={styles}>
          <Typography  color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
            Questão {props.questao.numeroQuestao}
          </Typography>
          <Typography  color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
            Valor: {props.questao.valor}
          </Typography>
            <h1>Enunciado: {props.questao.enunciado}</h1>
          <TextField 
          id="fullWidth"
          label="Resposta"
          multiline
          rows={6}
          defaultValue=""
          style = {{width: 400, margin: 10, textAlign: 'center'}}
          onChange={(e)=>props.atualizarRespostaQuestao(e,props.questao.idQuestao)}
        />
    </div>
  )
}
