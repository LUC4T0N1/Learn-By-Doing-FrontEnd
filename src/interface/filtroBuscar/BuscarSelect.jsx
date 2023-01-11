import React, {useState, useEffect} from 'react'
import Select from "react-select"
import makeAnimated from "react-select/animated"
import axios from "axios";
import AuthHeader from '../../AuthContext';

export default function BuscarSelect({multiplo}) {

  const [busca, setBusca] = useState({nome:''})

  const [options, setOptions] = useState([])

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(`http://localhost:8080/api/conteudo/filtro?nome=${busca.nome}&pagina=${0}&ordenacao=${0}&ordem=${0}`, { headers: AuthHeader() })
 };

  const handleBusca = (e) => {
    const value = e.target.value;
    const nome = e.target.name
    setBusca({...busca, [nome]: value});
  }  

   useEffect(() => {
      if(busca.nome!=''){
        buscarFiltrado(busca.nome, busca)
      }else{
        buscarFiltrado(null, busca)
      }
  }, [busca]) 
 
  const animatedComponents = makeAnimated();

/*   const options = [
    {value: "1", label: "Produto 01"},
    {value: "2", label: "Produto 02"},
    {value: "3", label: "Produto 03"},
    {value: "4", label: "Produto 04"},
    {value: "5", label: "Produto 05"},
  ] */

  const handleChange = (item, e) => {
    console.log("item: " + item)
    if(item){
      console.log("item: "+ item);
    }else{
      console.log("escrita: " + e.target.value)
      handleBusca(e)
    }
  };


  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'rgb(241, 237, 237)',
     minWidth: '590px',
     minHeight: "53px",
     "color":"rgb(0, 0, 0)","borderRadius":"3px","borderTopStyle":"none","borderLeftStyle":"none","borderRightStyle":"none","borderBottomStyle":"solid","borderImage":"linear-gradient(to right, rgb(196, 112, 3, 0.8), rgb(202, 35, 85, 0.8), rgb(77, 8, 65, 0.8)) 1"}),
     option: provided => ({
      ...provided,
      color: 'rgb(0, 0, 0)',
      backgroundColor: 'rgb(241, 237, 237)',
      "borderRadius":"3px","borderTopStyle":"none","borderLeftStyle":"none","borderRightStyle":"none","borderBottomStyle":"solid","borderImage":"linear-gradient(to right, rgb(196, 112, 3, 0.8), rgb(202, 35, 85, 0.8), rgb(77, 8, 65, 0.8)) 1"
    }),
    input: provided => ({
      ...provided,
      color: 'rgb(0, 0, 0)'
    }),
    placeholder: provided => ({
      ...provided,
      color: 'rgb(0, 0, 0)'
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: 'rgb(48, 47, 47)',
      "borderRadius":"3px","borderTopStyle":"none","borderLeftStyle":"none","borderRightStyle":"none","borderBottomStyle":"none"
    }),
    multiValue: provided => ({
      ...provided,
      "backgroundColor":"rgb(179, 176, 176)",
      color: "rgb(0, 0, 0)",
      "borderRadius":"10px"
    })
  };
  
  return (
    <Select
      placeholder="Escolha os Conteúdos"
      styles={colourStyles}
      components={animatedComponents}
      className='select'
      isMulti={multiplo}
      options={options}
      onChange={handleChange} 
      isClearable={true}
      isSearchable={true}
      isDisabled={false}
      isLoading={false}
      isRtl={false}
      />    
  )
}
