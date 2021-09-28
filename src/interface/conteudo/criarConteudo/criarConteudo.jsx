import React, {useState} from 'react'
import { CriarConteudoService } from '../../../teste-service';

function CriarConteudo () {
  const [conteudo, setConteudo] =  useState({ nome : '' });
  const handleChange = (e) => {
    const nome = e.target.name;
    const value = e.target.value;
    setConteudo({...conteudo, [nome]: value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(conteudo.nome){
      CriarConteudoService(conteudo);
      setConteudo({ nome : '' });
  }else{
    alert('preencha nome conteudo');
  }

  }
  return (
    <article>
      <form className='form'>
        <div className='form-control'>
          <label htmlFor='nome'>Nome do Conteudo: </label>
          <input
            type='text'
            id='nome'
            name='nome'
            value={conteudo.nome}
            onChange={handleChange}/>
        </div>
        <button type='submit' onClick={handleSubmit}>
          CRIAR
        </button>
      </form>
    </article>
  );
}

export default CriarConteudo