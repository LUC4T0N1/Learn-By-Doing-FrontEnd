import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";

export default function VisualizarQuestaoDissertativaCorrigida(props) {
  const styles = {
    border: "1px solid",
  };
  return (
    <div style={styles}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Card
          sx={{
            width: "70%",
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "#dddddf",
            minHeight: "70vh",
            marginTop: "8px",
          }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            marginTop="10px"
          >
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ width: "100%", justifyContent: "right" }}
            >
              Questão {props.questao.numeroQuestao}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ width: "100%", justifyContent: "right" }}
            >
              Valor: {props.questao.valor}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ width: "100%", justifyContent: "right" }}
            >
              Nota: {props.questao.nota}
            </Typography>
            <h3>Enunciado: {props.questao.enunciado}</h3>
            <TextField
              id="filled-read-only-input"
              InputProps={{
                readOnly: true,
              }}
              multiline
              rows={10}
              label="Resposta"
              name="resposta"
              value={props.resposta}
              style={{ width: 400, marginTop: 10, textAlign: "center" }}
            />
            <TextField
              id="filled-read-only-input"
              InputProps={{
                readOnly: true,
              }}
              multiline
              rows={2}
              label="Comentário"
              name="comentario"
              value={props.questao.comentario}
              style={{ width: 400, marginTop: 10, textAlign: "center" }}
            />
          </Grid>
        </Card>
      </Grid>
    </div>
  );
}
