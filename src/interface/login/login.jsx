import React, {useState} from 'react'
import './login.css'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { logar } from '../../application/autenticacaoSlice';
import { getPerfil } from '../../application/perfilSlice';


function Login () {

let history = useHistory();
const dispatch = useDispatch();

const logarFunction = async () => {
  try {
    await dispatch(logar({ ...login}))
    await delay(2000);
    await dispatch(getPerfil()) 
    await delay(1000);
    toHome();
 } catch (error) {
   console.log(error.message);
   alert('erro: '+ error.message)
  }
};

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function toHome () {
  console.log("indo pro home")
  history.push(`/perfil`)
}  
  const [login, setLogin] =  useState({ senha : '', email: '' });

  const handleChange = (e) => {
    const value = e.target.value;
    const nome = e.target.name
    setLogin({...login, [nome]: value});
    console.log("login: " + JSON.stringify(login))
  }  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(login.senha && login.email){
      await logarFunction();
  }else{
    alert('preencha senha e email!');
  }


  }
  return (
    <>
     <div className='login'>
      <div className='login-container'>
      <div className='login-mini-container'>
          <div className='login-title'>Login</div>
          <input type="email" name="email" className='input-texto-simples' placeholder="E-mail..." onChange={handleChange}></input>
          <input type="password" name="senha" className='input-texto-simples' placeholder="Senha..." onChange={handleChange}></input>
          <button className='botao-simples' onClick={handleSubmit}>Enviar</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login