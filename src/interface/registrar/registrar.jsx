import React, {useState} from 'react'
import './registrar.css'
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../firebase"

function Registrar () {

  const registrar = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
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
    setLogin({...login, email: value});
  }  
  const handleChangeSenha = (e) => {
    const value = e.target.value;
    setLogin({...login, senha: value});
  }  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(login.senha && login.email){
      registrar();
      setLogin({ nome : '' });
  }else{
    alert('preencha senha e email');
  }

  }
  return (
    <article className="regitrarForm">
      <h1>CRIAR NOVA CONTA</h1>
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
          CRIAR
        </button>
      </form>
    </article>
  );
}

export default Registrar