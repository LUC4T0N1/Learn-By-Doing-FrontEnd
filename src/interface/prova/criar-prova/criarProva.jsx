import React, {useState} from 'react'
import './criarProva.css'

function CriarProva () {
  const [prova, setProva] =  useState({ nome : '', nota: '' });
  const handleChangeNome = (e) => {
    const nome = e.target.email;
    const value = e.target.value;
    setProva({...prova, [nome]: value});
  }  
  const handleChangeNota = (e) => {
    const nota = e.target.senha;
    const value = e.target.value;
    setProva({...prova, [nota]: value});
  }  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(prova.nota && prova.email){
      setProva({ nome : '' });
  }else{
    alert('preencha nome e nota');
  }

  }
  return (
    <article className="provaForm">
      <form className='form'>
        <div className='form-control'>
          <label htmlFor='nome'>Nome: </label>
          <input
            type='text'
            id='nome'
            name='nome'
            value={prova.nome}
            onChange={handleChangeNome}/>
        </div>
        <div className='form-control'>
          <label htmlFor='nota'>Nota Maxima: </label>
          <input
            type='text'
            id='nota'
            name='nota'
            value={prova.nota}
            onChange={handleChangeNota}/>
        </div>
        <button type='submit' onClick={handleSubmit}>
          CRIAR
        </button>
      </form>
    </article>
  );
}

export default CriarProva