import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { useSelector, useDispatch } from "react-redux";
import { getConteudos } from '../../../application/conteudoSlice';
import { useEffect } from "react"; 
import { setProva } from '../../../application/provaSlice';

export default function EscolherConteudosProva() {

let pagina = 0;
const dispatch = useDispatch();
useEffect(() => {
  dispatch(getConteudos({pagina: pagina}))
}, [dispatch])

const conteudos = useSelector((state) => state.conteudos.conteudos);
let nomesConteudos = conteudos.map(conteudo => conteudo.nome);

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

  const theme = useTheme();

  const prova = useSelector((state) => state.provas.prova);

  const handleChange = (e) => {
    const value = e.target.value;
    const conteuds = conteudos.filter(cont => value.includes(cont.nome));
    const idConteudos = conteuds.map(conteudo => conteudo.idConteudo); 
    dispatch(setProva({...prova, nomeConteudos: typeof value === 'string' ? value.split(',') : value, conteudos: idConteudos})); 
  }  


  return (
    <div className="bundas">
        <InputLabel id="demo-multiple-chip-label">Conteúdos</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={prova.nomeConteudos}
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
          {nomesConteudos.map((name) => (
            <MenuItem
              key={name}
              value={name}
              /* style={getStyles(name, prova.conteudos, theme)} */
            >
              {name}
            </MenuItem>
          ))}
        </Select>
    </div>
  );
}