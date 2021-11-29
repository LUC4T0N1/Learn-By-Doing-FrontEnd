import * as React from 'react';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { useSelector, useDispatch } from "react-redux";
import { getConteudos } from '../../../application/conteudoSlice';
import { useEffect } from "react"; 
import { setProva } from '../../../application/provaSlice';
import  CriarConteudo  from '../../conteudo/criarConteudo/criarConteudo'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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

  const prova = useSelector((state) => state.provas.prova);

  const handleChange = (e) => {
    const value = e.target.value;
    const conteuds = conteudos.filter(cont => value.includes(cont.nome));
    const idConteudos = conteuds.map(conteudo => conteudo.idConteudo); 
    dispatch(setProva({...prova, nomeConteudos: typeof value === 'string' ? value.split(',') : value, conteudos: idConteudos})); 
  }  

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <div>
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
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        </div>
        <Button variant="contained" onClick={handleClickOpen}>
          Criar Conteúdo
        </Button>
         <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
         >
        <DialogTitle id="responsive-dialog-title">
          {"Adicionar Conteúdo"}
        </DialogTitle>
        <DialogContent>
          <CriarConteudo />
        </DialogContent>
        </Dialog>
    </div>

  );
}