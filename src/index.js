import React from 'react'
import ReactDom from 'react-dom'
import ListaDeProvas from './interface/prova/listaDeProvas/listaDeProvas'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import ListaConteudos from './interface/conteudo/listaConteudos/listaConteudos.jsx';
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


function App() {
  return (
  <div className="App">
    <Provider store = {store}>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/login" children={<Login/>}/>
          <Route exact path="/perfil" children={<Perfil/>}/>
          <Route exact path="/registrar" children={<Registrar/>}/>
          <Route exact path="/conteudos" children={<ListaConteudos/>}/>
          <Route exact path="/criar" children={<CriarProva/>}/>
          <Route exact path="/" children={<PaginaInicial/>}/>
          <Route exact path="/:idConteudo/" children={<ListaDeProvas/>}/>
          <Route exact path="/:idConteudo/:idProva/" children={<ProvaCompleta/>}/>
          <Route path='*'><Erro/></Route>
        </Switch>
      </Router>
    </Provider>
  </div>
        );
}

ReactDom.render(<App />, document.getElementById('root'))
