import React from 'react'
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';



function ProvaCard({nome, quantidadeQuestoes, publica, popularidade, idSecreto}) {
  return (
    <div>
      <ListItem alignItems="flex-start"   sx = {{width: 600, marginTop: 10}}>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography component="div" variant="h5">
          {nome}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Realizações: {popularidade}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Quantidade de Questões: {quantidadeQuestoes}
        </Typography>
        {publica? (<span></span>):
        ( 
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Id Secreto: {idSecreto}
        </Typography>)}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </div>
  )
}

export default ProvaCard
