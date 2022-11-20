import React from 'react'
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';



function ProvaResolvidaCard({  nomeProva, conteudos, corrigida, publica, dataResolucao, nota}) {
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography component="div" variant="h5">
          {nomeProva}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {publica? <div>publica</div>: <div>privada</div>}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Resolvida em: {dataResolucao}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Nota: {nota}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Conteúdos:  
          {conteudos.map((conteudo) => (
             <Badge badgeContent={conteudo} color="primary" sx={{margin:"0px 30px 0px 30px"}}/>
      ))}
        </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </div>
  )
}

export default ProvaResolvidaCard
