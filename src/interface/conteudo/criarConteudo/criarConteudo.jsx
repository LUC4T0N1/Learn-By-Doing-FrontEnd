import React from 'react'
import { criarConteudo, setConteudo } from '../../../application/conteudoSlice';
import { useSelector, useDispatch } from "react-redux";


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