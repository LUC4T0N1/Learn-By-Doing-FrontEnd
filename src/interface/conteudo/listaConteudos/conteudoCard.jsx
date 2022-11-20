import React from 'react'
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const ConteudoCard = ({ idConteudo, nome, numeroProvas }) => {
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
    Quantidade de Provas: {numeroProvas}
    </Typography>
        </React.Fragment>
      }
    />
  </ListItem>
  <Divider variant="fullWidth" component="li" />
    </div>
  );
}

export default ConteudoCard
