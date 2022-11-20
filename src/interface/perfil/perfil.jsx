import React from 'react'
import './perfil.css'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { completarPerfil, setPerfil } from '../../application/perfilSlice';
import { useSelector, useDispatch } from "react-redux";

function Perfil() {
  const dispatch = useDispatch();

  const perfil = useSelector((state) => state.perfil);


  const handleSubmit = (e) => {
    e.preventDefault();
    if(perfil.nome != null){
      dispatch(completarPerfil({ body : perfil })); 
  }else{
    alert('preencha todos os campos');
  }
  if(!perfil.completo){
    window.location.reload();
  }
  }

  const handleChange = (e) => {
    const nome = e.target.name;
    console.log(nome)
    const value = e.target.value;
    dispatch(setPerfil({...perfil, nome: value}));
  }  

  return (
    <div className="perfil">
       <Grid
     container
     spacing={0}
     direction="column"
     alignItems="center"
     justify="center"
     style={{ minHeight: '100vh' }}
   >
   <Card  sx={{ width: "70%",  textAlign: 'center',
justifyContent: 'center',
alignContent: 'center',
backgroundColor: '#dddddf',
minHeight: '70vh',
marginTop: '80px' }}>
  
   <Grid
     container
     spacing={0}
     direction="column"
     alignItems="center"
     justify="center"
     marginTop="10px"
   >
      <Typography gutterBottom  component="div">
     <h1 className="titulo">{perfil.nome}</h1>
   </Typography>
        
        {perfil.completo? (
           <TextField
           id="filled-read-only-input"
           label="Email"
           value={perfil.email}
           InputProps={{
             readOnly: true,
           }}
           style = {{width: 400, marginTop: 10}}
         />
        ) :(
          <span></span>
          
      )}
         {perfil.completo? (
          
             <TextField
          id="filled-required"
          label="Alterar Nome"
          defaultValue={perfil.nome}
          onChange={handleChange}
          style = {{width: 400, marginTop: 10}}
        />
        ) :(
            <TextField
            error
            id="outlined-error"
            label="Preencha seu nome"
            defaultValue=""
            onChange={handleChange}
            style = {{width: 400, marginTop: 10}}
          />
          
      )}
       <Button variant="contained" sx={{ 
              backgroundColor: 'black',
              marginTop: '16px',
              minWidth: '300px',
              minHeight: '6vh' }}
              onClick={handleSubmit} >Alterar Nome</Button>
</Grid>
</Card>
</Grid>
  </div>
  )
}

export default Perfil