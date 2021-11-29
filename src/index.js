import React from 'react'
import { useSelector } from "react-redux";
import ReactDom from 'react-dom'
import ListaDeProvas from './interface/prova/listaDeProvas/listaDeProvas'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import ListaConteudos from './interface/conteudo/listaConteudos/listaConteudos.jsx';
import CorrigirProva from './interface/prova/corrigir-prova/corrigirProva.jsx';
import ProvaCompleta from './interface/prova/provaCompleta/provaCompleta.jsx';
import Erro from './interface/erro/erro';
import Navbar from './interface/navbar/navbar';
import Perfil from './interface/perfil/perfil';
import { Provider } from "react-redux";
import Login from "./interface/login/login";
import store from "./application/configureStore";
import PaginaInicial from  "./interface/pagina-inicial/paginaInicial";
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

import {AuthProvider} from './AuthContext';

function CustomRoute({ isPrivate, ...rest }) {
  const autenticacao = useSelector((state) => state.autenticacao);
  console.log("isprivate: "+ isPrivate)
  if (isPrivate && autenticacao.token=="") {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />;
}

function App() {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      <div className="App">
        <Provider store = {store}>
        <AuthProvider>
          <Router>
            <Navbar/>
            <Switch>
              <CustomRoute exact path="/login" children={<Login/>}/>
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
              <CustomRoute isPrivate exact path="/:idConteudo/" children={<ListaDeProvas/>}/>
              <CustomRoute isPrivate exact path="/:idConteudo/:idProva/" children={<ProvaCompleta/>}/>
              <Route path='*'><Erro/></Route>
            </Switch>
          </Router>
          </AuthProvider>
        </Provider>
      </div>
    </LocalizationProvider>

        );
}

ReactDom.render(<App />, document.getElementById('root'))
