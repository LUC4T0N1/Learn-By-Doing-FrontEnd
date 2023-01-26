import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completarPerfil,
  getPerfil,
  setPerfil,
} from "../../application/perfilSlice";
import "./perfil.css";

function Perfil() {
  const dispatch = useDispatch();

  const perfil = useSelector((state) => state.perfil);

  useEffect(() => {
    dispatch(getPerfil());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (perfil.nome != null) {
      dispatch(completarPerfil({ body: perfil }));
    } else {
      alert("preencha todos os campos");
    }
    if (!perfil.completo) {
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    const nome = e.target.name;
    console.log(nome);
    const value = e.target.value;
    dispatch(setPerfil({ ...perfil, nome: value }));
  };

  return (
    <div className="perfil">
      <div className="perfil-esquerda">
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Nome: </p>
          <p className="perfil-campo-valor">{perfil.nome}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Email: </p>
          <p className="perfil-campo-valor">{perfil.email}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Data de Criação do Perfil: </p>
          <p className="perfil-campo-valor">{perfil.dataCriacao}</p>
        </div>
      </div>
      <div className="perfil-direita">
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Provas Criadas: </p>
          <p className="perfil-campo-valor">{perfil.provasCriadas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Provas Resolvidas: </p>
          <p className="perfil-campo-valor">{perfil.provasResolvidas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Resolucoes das suas provas: </p>
          <p className="perfil-campo-valor">{perfil.provasCorrigidas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Questões Criadas: </p>
          <p className="perfil-campo-valor">{perfil.questoesCriadas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Questões Resolvidas: </p>
          <p className="perfil-campo-valor">{perfil.questoesResolvidas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Conteudos Criados: </p>
          <p className="perfil-campo-valor">{perfil.conteudosCriados}</p>
        </div>
      </div>

      {/*        <Grid
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
marginTop: '80px' }}>
  
   <Grid
     container
     spacing={0}
     direction="column"
     alignItems="center"
     justify="center"
     marginTop="10px"
   >
      <Typography gutterBottom  component="div">
     <h1 className="titulo">{perfil.nome}</h1>
   </Typography>
        
        {perfil.completo? (
           <TextField
           id="filled-read-only-input"
           label="Email"
           value={perfil.email}
           InputProps={{
             readOnly: true,
           }}
           style = {{width: 400, marginTop: 10}}
         />
        ) :(
          <span></span>
          
      )}
         {perfil.completo? (
          
             <TextField
          id="filled-required"
          label="Alterar Nome"
          defaultValue={perfil.nome}
          onChange={handleChange}
          style = {{width: 400, marginTop: 10}}
        />
        ) :(
            <TextField
            error
            id="outlined-error"
            label="Preencha seu nome"
            defaultValue=""
            onChange={handleChange}
            style = {{width: 400, marginTop: 10}}
          />
          
      )}
       <Button variant="contained" sx={{ 
              backgroundColor: 'black',
              marginTop: '16px',
              minWidth: '300px',
              minHeight: '6vh' }}
              onClick={handleSubmit} >Alterar Nome</Button>
</Grid>
</Card>
</Grid> */}
    </div>
  );
}

export default Perfil;
