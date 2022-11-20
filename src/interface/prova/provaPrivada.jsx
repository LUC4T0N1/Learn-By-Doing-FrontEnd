import React , {useState}from 'react'
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
/* import './provaPrivada.css' */

function ProvaPrivada () {

  const [id, setId] =  useState("");

  let history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setId(value);
  }  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id)
    history.push(`/realizarProvaPrivada/${id}`)
  }
  
  return (
    <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
          >
          <Card  sx={{ width: "70%",  textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: '#dddddf',
      minHeight: '70vh',
      marginTop: '80px' }}>
         <Typography gutterBottom  component="div">
            <h1 className="titulo">Buscar Prova Privada</h1>
          </Typography>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            marginTop="10px"
          >
        <TextField
          id="outlined-password-input"
          label="ID Secreto"
          name='id'
          value={id}
          onChange={handleChange}
          style = {{width: 400, marginTop: 10}}
        />
       
        <Button variant="contained" sx={{ 
      backgroundColor: 'black',
      marginTop: '36px',
      minWidth: '300px',
      minHeight: '6vh' }} onClick={handleSubmit}>Buscar</Button>
      </Grid>
      </Card>
      </Grid>
  );
}

export default ProvaPrivada
