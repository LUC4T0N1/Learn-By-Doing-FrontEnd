import React, {useState} from 'react'
import './registrar.css'

function Registrar () {
  const [conteudo, setConteudo] =  useState({ senha : '', email: '' });
  const handleChangeEmail = (e) => {
    const email = e.target.email;
    const value = e.target.value;
    setConteudo({...conteudo, [email]: value});
  }  
  const handleChangeSenha = (e) => {
    const senha = e.target.senha;
    const value = e.target.value;
    setConteudo({...conteudo, [senha]: value});
  }  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(conteudo.senha && conteudo.email){
      setConteudo({ nome : '' });
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
            value={conteudo.email}
            onChange={handleChangeEmail}/>
        </div>
        <div className='form-control'>
          <label htmlFor='senha'>Senha: </label>
          <input
            type='text'
            id='senha'
            name='senha'
            value={conteudo.senha}
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