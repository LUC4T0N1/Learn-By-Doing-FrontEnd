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
  

  const dispatch = useDispatch();
  const prova = useSelector((state) => state.provas.realizarProva);
  const finalizarProva = (e) => {
    console.log("1")
    dispatch(realizarProva({ ...prova})) 
    console.log("22")
    dispatch(setRealizarProva({ realizarProva: {nome: "", publica: true, conteudos: [],
    nomeConteudos: [], questoes:[], idsQuestoes:[],
    quantidadeQuestoes: 0, tempo: 0, questoesRespondidasDto:[]}})); 
    console.log("3")
  }

  return (

       <div>
          {prova.questoes.map((questao, index) => 
              questao.multiplaEscolha ? (
              <ResponderQuestaoMultiplaEscolha key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id, alternativas: questao.alternativas, valor: questao.valor}} atualizarRespostaQuestao = {props.atualizarRespostaQuestao}/>
              ): (
                <ResponderQuestaoDissertativa key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, idQuestao: questao.id, valor: questao.valor}} atualizarRespostaQuestao = {props.atualizarRespostaQuestao}/>
              )
              )}
            <CardActions style={{justifyContent: 'center'}}>
              <Button  variant="contained"  sx={{ width: "40%"}}  onClick={finalizarProva}>Finalizar Prova</Button>
            </CardActions>
    </div>
  )
}
