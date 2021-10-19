import { CircularProgress } from '@material-ui/core'
import ConteudoCard from './conteudoCard';
import CriarConteudo from '../criarConteudo/criarConteudo';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getConteudos } from '../../../application/conteudoSlice';
import { useEffect } from "react"; 


export default function ListaConteudos() {
  let pagina = 0;
  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConteudos({pagina: pagina}))
  }, [dispatch])

  const conteudos = useSelector((state) => state.conteudos.conteudos);
  return (
    <>
    {conteudos ? (
    <div style = {{ display : "flex", flexWrap : "wrap"}}>
      {conteudos.map((conteudo) => (
       <div onClick={() => history.push(`/${conteudo.idConteudo}`)}> 
        <ConteudoCard key={conteudo.idConteudo} {...conteudo} />
       </div>
      ))}
    </div>
     ): (
       <CircularProgress />
    )}
    <CriarConteudo />
    </>
  );
};
