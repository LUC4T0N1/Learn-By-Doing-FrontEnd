import React from 'react'
import Card from '@material-ui/core/Card';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';



function ProvaCard({nome, quantidadeQuestoes, mediaNotas, popularidade}) {
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography component="div" variant="h5">
          {nome}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
        Média Das Notas: {mediaNotas}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Realizações: {popularidade}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Quantidade de Questões: {quantidadeQuestoes}
        </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </div>
  )
}

export default ProvaCard
