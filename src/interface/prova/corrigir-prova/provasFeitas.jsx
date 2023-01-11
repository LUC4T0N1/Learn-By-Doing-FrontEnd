import { useSelector, useDispatch } from "react-redux";
import './corrigirProva.css'
import { CircularProgress } from '@material-ui/core'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router-dom';
import { getProvasFeitas } from '../../../application/provaSlice';
import { useParams } from 'react-router'
import ProvaFeitaCard from './provaFeitaCard';
import { useLocation } from 'react-router-dom';
import React, {useState} from 'react'
import FiltroBuscar from '../../filtroBuscar/FiltroBuscar';
import axios from "axios";
import AuthHeader from '../../../AuthContext';
function ProvasFeitas () {

  const [quantidade, setQuantidade] = useState(0)
  const [provas, setProvas] = useState([])
  const location = useLocation();
  const idProva = location.state.idProva;

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(`http://localhost:8080/api/prova/buscarResolucoes?id=${idProva}&pagina=${busca.pagina}`, { headers: AuthHeader() })
    setProvas(res.data);
    setQuantidade(res.data.length) 
 };

  return (
    <>
    <FiltroBuscar titulo={"Provas"} opcoesFiltro={["Ordem Alfabética", "Tamanho", "Popularidade"]} buscarFiltrado={buscarFiltrado} objetos={provas} quantidade={quantidade} tipo={6}/>
  </>
  )
}

  /* const location = useLocation();
  const idProva = location.state.idProva;
  console.log("idProva: " + idProva);

 let pagina = 0;
 let history = useHistory();
 
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(getProvasFeitas({id: idProva}))
 }, [dispatch])

 const provas = useSelector((state) => state.provas.provasFeitas);
 console.log("provas     -> "+ JSON.parse(JSON.stringify(provas)))
 

  return (
    <>
      <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
       <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
    {provas ? (
    <div style = {{ display : "flex", flexWrap : "wrap"}}>
      {provas.map((prova) => (
       <div onClick={() => history.push(`/corrigir/${idProva}/${prova.id}`)}> 
        <ProvaFeitaCard key={prova.idProva} {...prova} />
       </div>
      ))}
    </div>
     ): (
       <CircularProgress />
    )}
    </List>
    </Grid>
    </>
  );
} */

export default ProvasFeitas