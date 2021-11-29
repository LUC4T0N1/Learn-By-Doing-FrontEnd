import React  from 'react'
import Typography from '@material-ui/core/Typography';

export default function CorrigirQuestaoDissertativa(props) {
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
            <div className="campo">
            <label htmlFor='Comentários'>Comentários: </label>
            <input
              type='text'
              id='nome'
              name='nome'
              /* defaultValue={props.questao.comentario} */
              onChange={(e)=>props.atualizarComentarioQuestao(e,props.questao.idQuestaoResolivda)}/>
            </div>
            <div className="campo">
              <label htmlFor='Nota'>Nota: </label>
              <input
                type='number'
                min="0"
                id='tentativas'
                name='tentativas'
               /*  defaultValue={props.questao.nota} */
                onChange={(e)=>props.atualizarNotaQuestao(e,props.questao.idQuestaoResolivda)}/>
            </div>
    </div>
  )
}
