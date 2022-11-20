import React, {useEffect} from 'react'
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { useSelector, useDispatch } from "react-redux";
import { setQuestao } from '../../../../application/questaoSlice';

export default function EscolherConteudosQuestao() {

const dispatch = useDispatch();
const prova = useSelector((state) => state.provas.prova);
const questao = useSelector((state) => state.questoes.questao);
const conteudos = useSelector((state) => state.conteudos.conteudos);
useEffect(() => {
  dispatch(setQuestao({...questao, conteudos: prova.conteudos, nomeConteudos: prova.nomeConteudos}))
}, [dispatch])


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  const handleChange = (e) => {
    const value = e.target.value;
    const conteuds = conteudos.filter(cont => value.includes(cont.nome));
    const idConteudos = conteuds.map(conteudo => conteudo.idConteudo); 
    dispatch(setQuestao({...questao, nomeConteudos: typeof value === 'string' ? value.split(',') : value, conteudos: idConteudos})); 
  }  


  return (
    <>
        <InputLabel id="demo-multiple-chip-label" style = {{width: 400, marginTop: 10}}>Conteúdos</InputLabel>
        <Select
          style = {{width: 400, margin: 10}}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={questao.nomeConteudos}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Conteúdos" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {prova.nomeConteudos.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
    </>
  );
}