import { CircularProgress } from '@material-ui/core'
import ConteudoCard from './conteudoCard';
import CriarConteudo from '../criarConteudo/criarConteudo';
import { useHistory } from 'react-router-dom';
import { BuscarConteudosService } from '../../../teste-service';

export default function ListaConteudos() {
  let pagina = 0;
  let history = useHistory();
  const conteudos = BuscarConteudosService(pagina);

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
