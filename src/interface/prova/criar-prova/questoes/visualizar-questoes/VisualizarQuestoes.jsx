import React from 'react'
import './VisualizarQuestoes.css'

export default function VisualizarQuestoes({enunciado, publica, conteudos, dissertativa, resposta, alternativas}) {
  return (
    <div className="visualizar-questao">
      <div className='questao-header'>
        <p className='questao-numero'>Questão 1</p>
        <div className='questao-dados'>
          <p>· Privada</p>
          <p>· Dissertativa</p>
        </div>
      </div>
      <p className='visualizar-enunciado'>O IPHAN - Instituto do Patrimônio Histórico e Artístico
Nacional e a Prefeitura da Cidade do Rio de Janeiro envidaram
esforços no sentido de deixar exposta para a contemplação da
população parte do Sítio Arqueológico do Cais do Valongo,
com o objetivo de apresentar ao visitante, através daquele
pequeno, mas representativo espaço, a materialização do
momento mais trágico da nossa história, fazendo com que ele
não seja esquecido. (...)
A história do Cais do Valongo e do seu entorno está
indissoluvelmente ligada à história universal, por ter sido a
porta de entrada do maior volume de africanos escravizados
nas Américas. O Rio de Janeiro era, então, a mais afroatlântica das cidades costeiras do território brasileiro (...).
Disponível em http://portal.iphan.gov.br/.
O texto integra a proposta elaborada pelo IPHAN, em 2016,
para inscrição do Sítio Arqueológico do Cais do Valongo na
lista do Patrimônio Mundial. Com base no documento, a
história do Cais do Val</p>
      <div className='campo-resposta'>
        <p>Resposta: </p>
        <div className='area-resposta'>
        <p>A deficiência na enzima G6PD é uma condição recessiva ligada
ao cromossomo X, que pode ser diagnosticada no teste do
pezinho expandido. Pessoas com deficiência nesta enzima são
suscetíveis à anemia hemolítica ao serem expostas à
cloroquina ou primaquina, drogas amplamente prescritas por
médicos no tratamento da malária. No Brasil, a prevalência de
deficiência em G6PD na população geral varia de acordo com
as áreas mostradas no mapa: </p>
        </div>
      </div>
    </div>
  )
}
