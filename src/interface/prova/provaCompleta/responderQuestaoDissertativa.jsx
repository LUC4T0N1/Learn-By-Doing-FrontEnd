import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { getProva } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


export default function ResponderQuestaoDissertativa(props) {
  return (
       <div>
          <Typography variant="h5" color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
            Questão {props.questao.numeroQuestao}
          </Typography>
            <h3>Enunciado: {props.questao.enunciado}</h3>
          <TextField 
          id="fullWidth"
          label="Resposta"
          multiline
          rows={6}
          defaultValue=""
          onChange={(e)=>props.atualizarRespostaQuestao(e,props.questao.idQuestao)}
        />
    </div>
  )
}
