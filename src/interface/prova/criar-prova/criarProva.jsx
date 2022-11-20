import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import './criarProva.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { setProva, cadastrarNovaProva } from '../../../application/provaSlice';
import EscolherConteudosProva from './escolherConteudos';
import QuestaoCard from './questao/questaoCard';
import AdicionarQuestao from './questao/adicionarQuestao';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ResponderQuestaoMultiplaEscolha from '../provaCompleta/responderQuestaoMultiplaEscolha';
import ResponderQuestaoDissertativa from '../provaCompleta/responderQuestaoDissertativa';
import VisualizarQuestaoMultiplaEscolha from '../corrigir-prova/corrigir-questao/visualizarQuestaoMultiplaEscolha';
import VisualizarQuestaoDissertativaCorrigida from '../../perfil/visualizarQuestaoDissertativaCorrigida';
import PreviewQuestaoMultiplaEscolha from './questao/previewQuestaoMultiplaEscolha';
import PreviewQuestaoDissertativa from './questao/previewQuestaoDissertativa';




function CriarProva () {

  const [inicio, setInicio] = React.useState(new Date());
  const [fim, setFim] = React.useState(new Date());
  const dispatch = useDispatch();
  const prova = useSelector((state) => state.provas.prova);

  const handleChange = (e) => {
    const nome = e.target.name;
    console.log(nome)
    const value = e.target.value;
    dispatch(setProva({...prova, [nome]: value}));
  }  

  const handleChangeDataInicial = (data) => {
    console.log("data inicial: "+data)
    setInicio(data)
    dispatch(setProva({...prova, dataInicial: data}));
  } 

  const handleChangeDataFinal = (data) => {
    console.log("data final: "+data)
    setFim(data)
    dispatch(setProva({...prova, dataFinal: data}));
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(prova.nome){
      const idQuestoes = prova.questoes.map(quest => quest.id); 
      dispatch(cadastrarNovaProva({ ...prova, idsQuestoes : idQuestoes, quantidadeQuestoes: idQuestoes.length})) 
      /* dispatch(setProva({ prova :  {nome: "", publica: true, conteudos: [],
      nomeConteudos: [], questoes:[], idsQuestoes:[], 
      quantidadeQuestoes: 0, tempo: 0} }));  */
  }else{
    alert('preencha todos os campos');
  }
  }

  return (
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
          marginTop: '8px' }}>
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
            label="Nome"
            name="nome"
            value={prova.nome}
            onChange={handleChange}
            style = {{width: 400, marginTop: 10}}
          />
             <InputLabel  style = {{width: 400, marginTop: 10}} id="demo-simple-select-autowidth-label">Privacidade</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              name='publica'
              value={prova.publica}
              onChange={handleChange}
              autoWidth
              label="Privacidade"
              style = {{width: 400, marginTop: 10}}
            >
              <MenuItem value={true}>Publica</MenuItem>
              <MenuItem value={false}>Privada</MenuItem>
            </Select>
    
        {prova.publica ? (<span> </span>):
        (  
          <>  
             <TextField
          id="outlined-number"
          label="Duração da prova (minutos)"
          type="number"
          min="0"
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputProps: { 
                 min: 0
            }}}    
          style = {{width: 400, margin: 15}}
          value={prova.tempo}
          onChange={handleChange}
          name="tempo"
        />
        <div>
            <DateTimePicker
              label="Escolher Data de início"
              value={inicio}
              onChange={handleChangeDataInicial}
              renderInput={(params) => <TextField {...params} />}
           />
            <DateTimePicker
              label="Escolher Data de Fim"
              value={fim}
              onChange={handleChangeDataFinal}
              renderInput={(params) => <TextField {...params} />}
           />
            </div>
        </>  ) 
            
            }
      
                   
        <div>
        <EscolherConteudosProva/>
        </div>
        <div>
        {prova.questoes.length !==0 ? (
        <>
          {prova.questoes.map((questao, index) => 
              questao.multiplaEscolha ? (
                <PreviewQuestaoMultiplaEscolha key={index} resposta={ questao.respostaAluno} respostaCorreta={ questao.resposta} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, id: questao.id, alternativas: questao.alternativas, valor: questao.valor, nota: questao.notaAluno}}/>
                ): (
                  <PreviewQuestaoDissertativa key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, id: questao.id, idQuestaoResolivda: questao.idQuestaoResolvida, valor: questao.valor, resposta: questao.resposta, comentario: questao.comentario}} resposta={ questao.respostaAluno} />
              )
              )}
        </>
        ): (
          <h1> Nenhuma Questão Adicionada </h1>
        )}
        </div>
        <div className="campo">
          <AdicionarQuestao/>
        </div>
              <Button variant="contained" sx={{ 
                backgroundColor: 'black',
                margin: '16px',
                minWidth: '300px',
                minHeight: '6vh' }} onClick={handleSubmit}>Criar Prova</Button>
  
      </Grid>
        </Card>
        </Grid>
  );
}

export default CriarProva