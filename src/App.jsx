import React from 'react'
import { useSelector } from "react-redux";
import ReactDom from 'react-dom'
import ListaDeProvas from './interface/prova/listaDeProvas/listaDeProvas'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import ListaConteudos from './interface/conteudo/listaConteudos/listaConteudos.jsx';
import CorrigirProva from './interface/prova/corrigir-prova/corrigirProva.jsx';
import ProvaCompleta from './interface/prova/provaCompleta/provaCompleta.jsx';
import Erro from './interface/erro/erro';
import Perfil from './interface/perfil/perfil';
import { Provider } from "react-redux";
import Login from "./interface/login/login";
import store from "./application/configureStore";
import PaginaInicial from  "./interface/pagina-inicial/PaginaInicial";
import Registrar from  "./interface/registrar/registrar";
import CriarProva from  "./interface/prova/criar-prova/criarProva";
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateFnsAdapter from '@material-ui/lab/AdapterDateFns';
import ProvasFeitas from './interface/prova/corrigir-prova/provasFeitas';
import ProvaFeita from './interface/prova/corrigir-prova/provaFeita';
import ProvasCriadas from './interface/perfil/provasCriadas';
import ProvaCriada from './interface/perfil/provaCriada';
import ProvasResolvidas from './interface/perfil/provasResolvidas';
import ProvaResolvida from './interface/perfil/provaResolvida';
import { useContext } from 'react';

import {AuthProvider} from './AuthContext';
import EscolherTipo from './interface/prova/escolherTipo';
import ProvaPrivada from './interface/prova/provaPrivada';
import ProvaCompletaPrivada from './interface/prova/provaCompleta/provaCompletaPrivada';
import Historico from './interface/prova/historico';
import './App.css';
import NavBar from './interface/nav-bar/NavBar';
import { ThemeContext } from './infrastructure/context';
import FiltroBuscar from './interface/filtroBuscar/FiltroBuscar';

function CustomRoute({ isPrivate, ...rest }) {
  const autenticacao = useSelector((state) => state.autenticacao);
  /* const perfil = useSelector((state) => state.perfil); */
  console.log("isprivate: "+ isPrivate)
  const token = localStorage.getItem('token');
  console.log("token:::: " + token.length)

   if (isPrivate && token.length == 4) {
    /* todo: ver se token esta expirado */
    console.log("deslogado")
    return <Redirect to="/login" />
  } 
  console.log("completo")
  return <Route {...rest} />;
}

const App = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <>

    <LocalizationProvider dateAdapter={DateFnsAdapter}>

        <Provider store = {store}>
        <AuthProvider>
        <div className="App" style={{
      background: darkMode ? "black" : "linear-gradient(rgba(206, 201, 201, 0.5), rgba(128, 125, 125, 0.4))",
      color: darkMode && "white",
      }}>
          <Router>
            <NavBar/>
            <Switch>
              <CustomRoute exact path="/login" children={<Login/>}/>
              <CustomRoute exact path="/escolherProvaPrivada" children={<ProvaPrivada/>}/>    
              <CustomRoute exact path="/realizarProvaPrivada/:idProva" children={<ProvaCompletaPrivada/>}/>  
              <CustomRoute isPrivate exact path="/historico" children={<Historico/>}/> 
              <CustomRoute isPrivate exact path="/perfil" children={<Perfil/>}/>
              <CustomRoute isPrivate exact path="/perfil/provas-resolvidas" children={<ProvasResolvidas/>}/>
              <CustomRoute isPrivate exact path="/perfil/provas-resolvidas/:idProva" children={<ProvaResolvida/>}/>
              <CustomRoute isPrivate exact path="/perfil/provas-criadas" children={<ProvasCriadas/>}/>
              <CustomRoute isPrivate exact path="/perfil/provas-criadas/:idProva" children={<ProvaCriada/>}/>
              <CustomRoute exact path="/registrar" children={<Registrar/>}/>
              <CustomRoute isPrivate exact path="/conteudos" children={<ListaConteudos/>}/>
              <CustomRoute isPrivate exact path="/criar" children={<CriarProva/>}/>
              <CustomRoute isPrivate exact path="/corrigir" children={<CorrigirProva/>}/>
              <CustomRoute isPrivate exact path="/corrigir/:idProva" children={<ProvasFeitas/>}/>
              <CustomRoute isPrivate exact path="/corrigir/:idProva/:idProvaFeita" children={<ProvaFeita/>}/>
              <CustomRoute exact path="/" children={<PaginaInicial/>}/>
              <CustomRoute exact path="/tipo-de-prova" children={<EscolherTipo/>}/>
              <CustomRoute exact path="/busc" children={<FiltroBuscar titulo={"Conteúdos"} opcoesFiltro={["Ordem Alfabética", "Número de Provas"]}/>}/>
              <CustomRoute isPrivate exact path="/:idConteudo/" children={<ListaDeProvas/>}/>
              <CustomRoute isPrivate exact path="/realizar-prova-publica/:idProva" children={<ProvaCompleta/>}/>
              <Route path='*'><Erro/></Route>
            </Switch>
          </Router>
                  </div>
          </AuthProvider>
        </Provider>

    </LocalizationProvider>
    </>
        );
}

export default App;
