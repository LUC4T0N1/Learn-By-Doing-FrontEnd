import React, {useState} from 'react'
import "./BuscarConteudos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons' 
import BuscarSelect from '../../../filtroBuscar/BuscarSelect';
import { criarConteudo, setConteudo } from '../../../../application/conteudoSlice';
import { useSelector, useDispatch } from "react-redux";
export default function BuscarConteudos() {

  const dispatch = useDispatch();

 /*  const conteudo = useSelector((state) => state.conteudos.conteudo); */

  const [conteudo, setConteudo] =  useState({nome: ''});

  const handleChange = (e) => {
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
  };

  const handleClose = () => {
    setOpen(false);
    /* todo enviar prop back */
  };


  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'rgb(48, 47, 47)',
     minWidth: '585px',
     minHeight: "53px",
     "color":"aliceblue","borderRadius":"3px","borderTopStyle":"none","borderLeftStyle":"none","borderRightStyle":"none","borderBottomStyle":"solid","borderImage":"linear-gradient(to right, rgb(196, 112, 3, 0.8), rgb(202, 35, 85, 0.8), rgb(77, 8, 65, 0.8)) 1"}),
     option: provided => ({
      ...provided,
      color: 'aliceblue',
      backgroundColor: 'rgb(48, 47, 47)',
      "borderRadius":"3px","borderTopStyle":"none","borderLeftStyle":"none","borderRightStyle":"none","borderBottomStyle":"solid","borderImage":"linear-gradient(to right, rgb(196, 112, 3, 0.8), rgb(202, 35, 85, 0.8), rgb(77, 8, 65, 0.8)) 1"
    }),
    input: provided => ({
      ...provided,
      color: 'aliceblue'
    }),
    placeholder: provided => ({
      ...provided,
      color: 'aliceblue'
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: 'rgb(48, 47, 47)',
      "borderRadius":"3px","borderTopStyle":"none","borderLeftStyle":"none","borderRightStyle":"none","borderBottomStyle":"none"
    }),
    multiValue: provided => ({
      ...provided,
      "backgroundColor":"white",
      color: "black",
      "borderRadius":"10px"
    })
  };
  
  return (
    <div className='buscar-conteudos'> 
    <BuscarSelect multiplo={true}/>
      <button className='botao-simples' onClick={handleClickOpen}>Criar Conteúdo</button>
      {open ? 
        (<div className='criar-conteudo'>
          <button className='botao-fechar' onClick={handleClose}><i><FontAwesomeIcon icon={faX} rel="noreferrer" className='icon-fechar'></FontAwesomeIcon></i></button>
          <div className='conteudo'>
            <input type="text" name="nome" className='input-texto-simples' placeholder="Conteúdo..." onChange={handleChange}></input>
            <button className='botao-simples' onClick={handleSubmit}>Criar</button>
          </div>
        </div>)
       : 
        (<></>)}
    </div>
    
  )
}
