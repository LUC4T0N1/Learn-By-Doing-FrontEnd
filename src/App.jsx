import DateFnsAdapter from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import React, { useContext } from "react";
import { Provider, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import store from "./application/configureStore";
import ListaConteudos from "./interface/conteudo/listaConteudos/listaConteudos.jsx";
import Erro from "./interface/erro/erro";
import Login from "./interface/login/login";
import PaginaInicial from "./interface/pagina-inicial/PaginaInicial";
import Perfil from "./interface/perfil/perfil";
import ProvaCriada from "./interface/perfil/provaCriada";
import ProvaResolvida from "./interface/perfil/provaResolvida";
import ProvasCriadas from "./interface/perfil/provasCriadas";
import ProvasResolvidas from "./interface/perfil/provasResolvidas";
import CorrigirProva from "./interface/prova/corrigir-prova/corrigirProva.jsx";
import ProvaFeita from "./interface/prova/corrigir-prova/provaFeita";
import ProvasFeitas from "./interface/prova/corrigir-prova/provasFeitas";
import CriarProva from "./interface/prova/criar-prova/criarProva";
import ListaDeProvas from "./interface/prova/listaDeProvas/listaDeProvas";
import ProvaCompleta from "./interface/prova/provaCompleta/provaCompleta.jsx";
import Registrar from "./interface/registrar/registrar";

import "./App.css";
import { AuthProvider } from "./AuthContext";
import { ThemeContext } from "./infrastructure/context";
import NavBar from "./interface/nav-bar/NavBar";
import EscolherTipo from "./interface/prova/escolherTipo";
import Historico from "./interface/prova/historico";
import ProvaPrivada from "./interface/prova/provaPrivada";

function CustomRoute({ isPrivate, ...rest }) {
  const autenticacao = useSelector((state) => state.autenticacao);
  const token = localStorage.getItem("token");

  if (isPrivate && (token == null || token.length == 4)) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} />;
}

const App = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <>
      <LocalizationProvider dateAdapter={DateFnsAdapter}>
        <Provider store={store}>
          <AuthProvider>
            <div
              className="App"
              style={{
                background: darkMode
                  ? "black"
                  : "linear-gradient(rgba(206, 201, 201, 0.5), rgba(128, 125, 125, 0.4))",
                color: darkMode && "white",
              }}
            >
              <Router>
                <NavBar />
                <Switch>
                  <CustomRoute exact path="/login" children={<Login />} />
                  <CustomRoute
                    exact
                    path="/choosePrivateTest"
                    children={<ProvaPrivada />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/record"
                    children={<Historico />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/profile"
                    children={<Perfil />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/profile/solvedTests"
                    children={<ProvasResolvidas />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/profile/solvedTest"
                    children={<ProvaResolvida />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/profile/createdTests"
                    children={<ProvasCriadas />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/profile/createdTest"
                    children={<ProvaCriada />}
                  />
                  <CustomRoute
                    exact
                    path="/register"
                    children={<Registrar />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/searchSubjects"
                    children={<ListaConteudos />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/createTest"
                    children={<CriarProva />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/toCorrect/searchTest"
                    children={<CorrigirProva />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/toCorrect/searchSolvedTest"
                    children={<ProvasFeitas />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/toCorrect"
                    children={<ProvaFeita />}
                  />
                  <CustomRoute exact path="/" children={<PaginaInicial />} />
                  <CustomRoute
                    exact
                    path="/chooseType"
                    children={<EscolherTipo />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/searchTests"
                    children={<ListaDeProvas />}
                  />
                  <CustomRoute
                    isPrivate
                    exact
                    path="/solveTest"
                    children={<ProvaCompleta />}
                  />
                  <Route path="*">
                    <Erro />
                  </Route>
                </Switch>
              </Router>
            </div>
          </AuthProvider>
        </Provider>
      </LocalizationProvider>
    </>
  );
};

export default App;
