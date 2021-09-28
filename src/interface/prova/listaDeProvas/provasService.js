let pagina = 0;

const listaProvas = async () => {
  const response = await fetch('localhost:8080/api/prova?id='+pagina);
  listaProvas = await response.json();
  console.log(listaProvas);
  return listaProvas;
}

export function obterListaProvas(){
  return provas;
}


export const provas = [{
  id: 1, mediaNotas: 2.00, nome : "P1 FVV", publica: true,
   quantidadeQuestoes: 0, popularidade : "95"
}]
