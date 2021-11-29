import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { getProva, realizarProva, setRealizarProva } from '../../../application/provaSlice';
import { useSelector, useDispatch } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ResponderQuestaoDissertativa from './responderQuestaoDissertativa';
import ResponderQuestaoMultiplaEscolha from './responderQuestaoMultiplaEscolha';


export default function ResolverProva(props) {


  const prova = useSelector((state) => state.provas.realizarProva);
  const dispatch = useDispatch();

  const finalizarProva = (e) => {
    e.preventDefault();
    dispatch(realizarProva({ ...prova})) 
    dispatch(setRealizarProva({ realizarProva: {nome: "", publica: true, conteudos: [],
    nomeConteudos: [], questoes:[], idsQuestoes:[],
    quantidadeQuestoes: 0, tempo: 0, questoesRespondidasDto:[]}
 } )); 
  }
  return (

       <div>
 

          <Typography variant="h5" color="text.secondary" sx={{ width: "20%", justifyContent: 'right'}}>
            Tempo: 2:00:00
          </Typography>
          {prova.questoes.map((questao, index) => 
              questao.multiplaEscolha ? (
              <ResponderQuestaoMultiplaEscolha key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id, alternativas: questao.alternativas}} atualizarRespostaQuestao = {props.atualizarRespostaQuestao}/>
              ): (
                <ResponderQuestaoDissertativa key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id}} atualizarRespostaQuestao = {props.atualizarRespostaQuestao}/>
              )
              )}
            <CardActions style={{justifyContent: 'center'}}>
              <Button  variant="contained"  sx={{ width: "40%"}}  onClick={finalizarProva}>Finalizar Prova</Button>
            </CardActions>
    </div>
  )
}
