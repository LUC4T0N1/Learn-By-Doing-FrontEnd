import React from 'react'
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


function ProvaFeitaCard({nome, nomeAluno, notaAluno, totalmenteCorrigida}) {
  return (
    <>
    <ListItem alignItems="flex-start"   sx = {{width: 600, marginTop: 10}}>
    <ListItemText
      secondary={
        <React.Fragment>
          <Typography component="div" variant="h5">
      {nome}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" component="div">
    Realizada Por: {nomeAluno}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" component="div">
    Nota: {notaAluno}
    </Typography>

    <Typography variant="subtitle1" color="text.secondary" component="div">
      Corrigida Por Completo: {totalmenteCorrigida? (<span>sim</span>): (<span>nao</span>)}
    </Typography>
        </React.Fragment>
      }
    />
  </ListItem>
  <Divider variant="fullWidth" component="li" />
  </>
  )
}

export default ProvaFeitaCard
