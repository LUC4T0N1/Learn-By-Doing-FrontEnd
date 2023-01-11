import React, {useState} from 'react'
import "./BuscarConteudos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons' 
import BuscarSelect from '../../../filtroBuscar/BuscarSelect';
import { criarConteudo, setConteudo } from '../../../../application/conteudoSlice';
import { useDispatch } from "react-redux";
import FiltroConteudos from '../../../filtroBuscar/FiltroConteudos';
import axios from "axios";
import { logout } from "../../../../application/autenticacaoSlice"
import { useHistory } from 'react-router-dom';
import AuthHeader from '../../../../AuthContext';

export default function BuscarConteudos({adicionarConteudosProva}) {

  const dispatch = useDispatch();

 /*  const conteudo = useSelector((state) => state.conteudos.conteudo); */

  const [conteudo, setConteudo] =  useState({nome: ''});

  const handleChangeCriarConteudo = (e) => {
    const value = e.target.value;
    setConteudo({...conteudo, nome: value});
    console.log("conteudo: " + JSON.stringify(conteudo))

  }
  const handleSubmit = (e) => {

    e.preventDefault();
    if(conteudo!==""){
      console.log("conteudo: " + JSON.stringify(conteudo))
      dispatch(criarConteudo({conteudo: conteudo}))
/*       dispatch(setConteudo({ nome : '' }));  */
  }else{
    alert('preencha nome conteudo');
  }
}
  const [open, setOpen] = React.useState(false);
  const [openEscolher, setOpenEscolher] = React.useState(false);

  const options = [
    {value: "produto 01", label: "Produto 01"},
    {value: "produto 02", label: "Produto 02"},
    {value: "produto 03", label: "Produto 03"},
    {value: "produto 04", label: "Produto 04"},
    {value: "produto 05", label: "Produto 05"},
  ]

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
    setOpenEscolher(false);
  };

  const handleClickOpenEscolher = (e) => {
    e.preventDefault();
    setOpenEscolher(true);
    setOpen(false);
  };


  const handleClose = () => {
    setOpen(false);
    setOpenEscolher(false);
    /* todo enviar prop back */
  };


  const [quantidade, setQuantidade] = useState(0)
  const [conteudos, setConteudos] = useState([])
  let history = useHistory();

  const buscarFiltrado = async (nome, busca) => {
    try{
      const response = await axios.get(`http://localhost:8080/api/conteudo/filtro?nome=${nome}&pagina=${busca.pagina}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`, { headers: AuthHeader() })
      console.log("conteudos!!!: " + JSON.stringify(response.data.conteudos))
      setConteudos(response.data.conteudos);
      setQuantidade(response.data.quantidade); 
    }catch (error){
      dispatch(logout({ ...{}}))
      history.push(`/login`)
    }
 };
  
  return (
    <div className='buscar-conteudos'> 
    {/* <BuscarSelect multiplo={true}/> */}
      
      {open ? 
        (<>
        <div className='criar-conteudo'>
          <button className='botao-fechar' onClick={handleClose}><i><FontAwesomeIcon icon={faX} rel="noreferrer" className='icon-fechar'></FontAwesomeIcon></i></button>
          <div className='conteudo'>
            <input type="text" name="nome" className='input-texto-simples' placeholder="Conteúdo..." onChange={handleChangeCriarConteudo}></input>
            <button className='botao-simples' onClick={handleSubmit}>Criar</button>
          </div>
        </div>
        </>)
       : 
        (<button className='botao-simples' onClick={handleClickOpen}>Criar Conteúdo</button>)}

{openEscolher ? 
        (<FiltroConteudos adicionarConteudosProva={adicionarConteudosProva} handleClose = {handleClose} titulo={"Escolher Conteudos"} opcoesFiltro={["Ordem Alfabética", "Número de Provas"]} buscarFiltrado={buscarFiltrado} objetos={conteudos} quantidade={quantidade} tipo={1}/>)
       : 
        (<button className='botao-simples' onClick={handleClickOpenEscolher}>Escolher Conteúdos</button>)}
    </div>
    
  )
}
