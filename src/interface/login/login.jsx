import React, {useState, useEffect, useContext} from 'react'
import './login.css'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../../firebase"
import { useSelector } from "react-redux";
import { setToken, setUid } from '../../application/autenticacaoSlice';
import { useDispatch } from "react-redux";


function Login () {

 const autenticacao = useSelector((state) => state.autenticacao);

const logar = async () => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      login.email,
      login.senha
    );
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

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
      setLogin({ nome : '' });
  }else{
    alert('preencha senha e email');
  }

  }
  return (
    <article className="loginForm">
      <form className='form'>
        <div className='form-control'>
          <label htmlFor='email'>Email: </label>
          <input
            type='text'
            id='email'
            name='email'
            value={login.email}
            onChange={handleChangeEmail}/>
        </div>
        <div className='form-control'>
          <label htmlFor='senha'>Senha: </label>
          <input
            type='text'
            id='senha'
            name='senha'
            value={login.senha}
            onChange={handleChangeSenha}/>
        </div>
        <button type='submit' onClick={handleSubmit}>
          Entrar
        </button>
      </form>
      <h4> User Logged In: </h4>
      {autenticacao.token}
    </article>
  );
}

export default Login