import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import './criarProva.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { setProva, cadastrarNovaProva } from '../../../application/provaSlice';
import { getConteudos } from '../../../application/conteudoSlice';
import ResponsiveDialog from './questao/criarQuestao';
import EscolherConteudosProva from './escolherConteudos';
import CriarQuestao from './questao/criarQuestao';
import QuestaoCard from './questao/questaoCard';
import EscolherQuestao from './questao/escolherQuestao';
import AdicionarQuestao from './questao/adicionarQuestao';



function CriarProva () {


  const dispatch = useDispatch();

  const prova = useSelector((state) => state.provas.prova);
  useEffect(() => {
    dispatch(getConteudos({pagina: 0}))
  }, [dispatch])

  const handleChange = (e) => {
    const nome = e.target.name;
    console.log(nome)
    const value = e.target.value;
    dispatch(setProva({...prova, [nome]: value}));
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(prova.nome){
      const idQuestoes = prova.questoes.map(quest => quest.id); 
      dispatch(cadastrarNovaProva({ ...prova, idsQuestoes : idQuestoes, quantidadeQuestoes: idQuestoes.length})) 
      dispatch(setProva({ prova : {} })); 
  }else{
    alert('preencha todos os campos');
  }
  }
  
  return (
    <article className="provaForm">
      <form className='form'>
        <div className='form-control'>
          <div className="campo">
            <label htmlFor='nome'>Nome: </label>
            <input
              type='text'
              id='nome'
              name='nome'
              value={prova.nome}
              onChange={handleChange}/>
            </div>
            <div className="campo">
              <label htmlFor='tentativas'>Tentativas permitidas: </label>
              <input
                type='number'
                min="1"
                id='tentativas'
                name='tentativas'
                value={prova.tentativas}
                onChange={handleChange}/>
            </div>
            <div className="campo">   
              <label htmlFor='tentativas'>Duração da prova (minutos): </label>
              <input
                type='number'
                min="0"
                id='tempo'
                name='tempo'
                value={prova.tempo}
                onChange={handleChange}/>
            </div>    
                    </div>
        <div className="campo">
            <InputLabel id="demo-simple-select-autowidth-label">Privacidade</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              name='publica'
              value={prova.publica}
              onChange={handleChange}
              autoWidth
              label="Privacidade"
            >
              <MenuItem value={true}>Publica</MenuItem>
              <MenuItem value={false}>Privada</MenuItem>
            </Select>
        </div>
        <div>
        {/*   <BasicDateRangePicker/> */}
        <EscolherConteudosProva/>
        </div>
        <div>
        {prova.questoes.length !==0 ? (
        <div style = {{ display : "block", flexWrap : "wrap"}} >
          {prova.questoes.map((questao) => (
            <QuestaoCard className="campo" key={questao.idProva} {...questao} />
          ))}
        </div>
        ): (
          <p> Nenhuma Questão Ainda </p>
        )}
        </div>
        <div className="campo">
          <AdicionarQuestao/>
        </div>
        <button type='submit' onClick={handleSubmit}>
          CRIAR PROVA
        </button>
      </form>
    </article>
  );
}

export default CriarProva