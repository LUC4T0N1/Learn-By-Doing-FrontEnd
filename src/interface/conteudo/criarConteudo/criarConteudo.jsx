import React from 'react'
import { criarConteudo, setConteudo } from '../../../application/conteudoSlice';
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function CriarConteudo () {

  const dispatch = useDispatch();

  const conteudo = useSelector((state) => state.conteudos.conteudo);

  const handleChange = (e) => {
    const nome = e.target.name;
    const value = e.target.value;
    dispatch(setConteudo({...conteudo, [nome]: value}));

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(conteudo.nome){
      dispatch(criarConteudo({conteudo: conteudo}))
      dispatch(setConteudo({ nome : '' }));
  }else{
    alert('preencha nome conteudo');
  }

  }
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '10vh' }}
  >

      <TextField
            id="outlined-password-input"
            label="Nome"
            name='nome'
            value={conteudo.nome}
            onChange={handleChange}
            style = {{width: 400, marginTop: 10, textAlign: 'center'}}
          />
        <Button variant="contained" sx={{ 
                backgroundColor: 'rgb(23, 109, 109)',
                margin: '9px',
                minWidth: '50px',
                minHeight: '4vh' }} onClick={handleSubmit}>Criar Conteúdo</Button>
      </Grid>
  );
}

export default CriarConteudo