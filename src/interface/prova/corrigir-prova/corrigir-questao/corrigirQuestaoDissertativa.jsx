import React  from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';




export default function CorrigirQuestaoDissertativa(props) {
  const styles = {
    border: '1px solid', 
};
  return (
       <div style={styles}>
          <Typography variant="h5" color="text.secondary" sx={{ width: "100%", justifyContent: 'right'}}>
            Questão {props.questao.numeroQuestao}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ width: "100%", justifyContent: 'right'}}>
            Valor: {props.questao.valor}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ width: "100%", justifyContent: 'right'}}>
            Nota: {props.questao.nota}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ width: "100%", justifyContent: 'right'}}>
          Enunciado: {props.questao.enunciado}
          </Typography>
          <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '10vh' }}
  >
            <TextField
            id="filled-read-only-input"
            InputProps={{
              readOnly: true,
            }}
            multiline
                rows={10}
            label="Resposta"
            name='resposta'
            value={props.resposta}
            style = {{width: 400, marginTop: 10, textAlign: 'center'}}
          />            
             <TextField
            id="outlined-password-input"
            label="Comentários"
            name="nome"
            onChange={(e)=>props.atualizarComentarioQuestao(e,props.questao.idQuestaoResolivda)}
            style = {{width: 400, marginTop: 10}}
          />
           
           <TextField
          id="outlined-number"
          label="Nota"
          type="number"
          min="0"
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputProps: { 
                 min: 0
            }}}    
            style = {{width: 400, margin: 10, textAlign: 'center'}}
          onChange={(e)=>props.atualizarNotaQuestao(e,props.questao.idQuestaoResolivda)}
          name="Nota"
        />
        </Grid>
           
    </div>
  )
}
