import React, {useState} from 'react'
import PreviewQuestaoDissertativa from '../questao/previewQuestaoDissertativa'
import PreviewQuestaoMultiplaEscolha from '../questao/previewQuestaoMultiplaEscolha'
import '../questoes/visualizar-questoes/VisualizarQuestoes.css'

export default function VisualizacaoQuestao({prova}) {

  return (
    <div className='vizualizacao-questoes'>
             { prova.questoes.length !== 0 ? (
        <>
          {prova.questoes.map((questao, index) => 
              questao.multiplaEscolha ? (
                <PreviewQuestaoMultiplaEscolha key={index} resposta={ questao.respostaAluno} respostaCorreta={ questao.resposta} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, id: questao.id, alternativas: questao.alternativas, valor: questao.valor, nota: questao.notaAluno}}/>
                ): (
                  <PreviewQuestaoDissertativa key={index} questao={{numeroQuestao: index+1, enunciado: questao.enunciado, id: questao.id, idQuestaoResolvida: questao.idQuestaoResolvida, valor: questao.valor, resposta: questao.resposta, comentario: questao.comentario}} resposta={ questao.respostaAluno} />
              )
              )}
        </>
        ): (
          <h1>Nenhuma Questão Adicionada</h1>
        )}
    </div>
  )
}
