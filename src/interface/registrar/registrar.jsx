import React, {useState} from 'react'
import './registrar.css'
import {
  createUserWithEmailAndPassword, 
  signOut
} from "firebase/auth";
import { auth } from "../../firebase"
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';





function Registrar () {
  let history = useHistory();


  const logout = async () => {
    await signOut(auth);
  };


  const registrar = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
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

  const [login, setLogin] =  useState({ senha : '', email: '' });
  const [ok, setOk] =  useState(false);
  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setLogin({...login, email: value});
  }  
  const handleChangeSenha = (e) => {
    const value = e.target.value;
    setLogin({...login, senha: value});
  }  

  function ToLogin () {
    console.log("indo pro login")
    history.push(`/login`)
  }  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(login.senha && login.email){
      console.log("vou registrar ein")
      await registrar();
      await logout();
  }else{
    alert('preencha senha e email');
  }

  }


  return (

<>

<div className='login'>
      <div className='login-container'>
      <div className='login-mini-container'>
          <div className='login-title'>Criar Conta</div>
          <input type="email" name="nome-prova" className='input-texto-simples' placeholder="E-mail..."></input>
          <input type="password" name="nome-prova" className='input-texto-simples' placeholder="Senha..."></input>
          <button className='botao-simples' onClick={handleSubmit}>Registrar</button>
        </div>
      </div>
    </div>
      {/* {ok? ( ToLogin()):(
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
            <h1 className="titulo">Criar Nova Conta</h1>
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
      minHeight: '6vh' }} onClick={handleSubmit}>Criar</Button>
      </Grid>
      </Card>
      </Grid>)} */}
      </>

  );
}

export default Registrar