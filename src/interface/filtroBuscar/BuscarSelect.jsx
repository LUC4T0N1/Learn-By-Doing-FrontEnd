import React from 'react'
import Select from "react-select"
import makeAnimated from "react-select/animated"

export default function BuscarSelect({multiplo}) {
 
  const animatedComponents = makeAnimated();

  const options = [
    {value: "produto 01", label: "Produto 01"},
    {value: "produto 02", label: "Produto 02"},
    {value: "produto 03", label: "Produto 03"},
    {value: "produto 04", label: "Produto 04"},
    {value: "produto 05", label: "Produto 05"},
  ]

  const handleChange = (item, e) => {
    if(item){
      console.log("item: "+ item);
    }else{
      console.log("escrita: " + e.target.value)
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
