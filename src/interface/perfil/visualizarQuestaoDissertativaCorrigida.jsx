import React  from 'react'
import Typography from '@material-ui/core/Typography';

export default function VisualizarQuestaoDissertativaCorrigida(props) {
  const styles = {
    border: '1px solid', 
};
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
          
            <h3>Enunciado: {props.questao.enunciado}</h3>
            <span>Resposta: {props.resposta}</span>
            <span>Comentário do Avaliador: {props.questao.comentario}</span>
    </div>
  )
}
