import React, {useState} from 'react'
import './login.css'
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase"
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login () {

let history = useHistory();

const autenticacao = useSelector((state) => state.autenticacao);

const logar = async () => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      login.email,
      login.senha
    );
    alert('sucesso')
    setOk(true); 
 } catch (error) {
   console.log(error.message);
   alert('erro: '+ error.message)
  }
};

function ToHome () {
  console.log("indo pro home")
  history.push(`/perfil`)
}  
  const [ok, setOk] =  useState(false);
  const [login, setLogin] =  useState({ senha : '', email: '' });

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setLogin({...login, email : value});
  }  
  const handleChangeSenha = (e) => {
    const value = e.target.value;
    setLogin({...login, senha: value});
  }  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(login.senha && login.email){
      logar();
/*       setLogin({ nome : '' }); */
  }else{
    alert('preencha senha e email');
  }

  }
  return (
    <div>
    {ok? (ToHome()) : (
      <div>
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
  <Typography gutterBottom  component="div">
     <h1 className="titulo">Fazer Login</h1>
   </Typography>
   <Grid
     container
     spacing={0}
     direction="column"
     alignItems="center"
     justify="center"
     marginTop="10px"
   >
 <TextField
   id="outlined-password-input"
   label="Email"
   value={login.email}
   onChange={handleChangeEmail}
   style = {{width: 400, marginTop: 10}}
 />
 <TextField
   id="outlined-password-input"
   label="Senha"
   type="password"
   autoComplete="current-password"
   value={login.senha}
   onChange={handleChangeSenha}
   style = {{width: 400, marginTop: 10}}
 />
 <Button variant="contained" sx={{ 
backgroundColor: 'black',
marginTop: '36px',
minWidth: '300px',
minHeight: '6vh' }} onClick={handleSubmit}>Entrar</Button>
</Grid>
</Card>
</Grid>
    
</div>
    
  ) }
    </div>
  );
}

export default Login