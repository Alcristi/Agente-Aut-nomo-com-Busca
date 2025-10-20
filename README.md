# Projeto de Agente Coletor com Algoritmos de Busca (IA)

Este projeto foi desenvolvido inteiramente com **p5.js** e pode ser executado diretamente no teu navegador, sem necessidade de qualquer instalação.

## 🕹️ Como Usar P5

1Acesse o link **Link para a Simulação:** :
[**https://editor.p5js.org/acsn3/sketches/e1XTDflU\_**](https://editor.p5js.org/acsn3/sketches/e1XTDflU_)
2.  Inicie a execução, um mapa aleatório será gerado.
3.  **Escolhe o algoritmo de busca** que desejas executar através das seguintes teclas:
    - **B**: Busca em Largura (BFS)
    - **D**: Busca em Profundidade (DFS)
    - **U**: Busca de Custo Uniforme (UCS)
    - **G**: Busca Gulosa (Greedy Best-First)
    - **A**: A\* (A-Star)
4.  Observa o agente a encontrar e a seguir o caminho para a comida.
5.  Assim que a comida é coletada, uma nova comida aparece noutra posição aleatória e uma nova busca é iniciada.
6.  Para gerar um **novo mapa**, basta pressionar a tecla **R**.

## 🕹️ Como Usar executar local

1.   Baixa a extensão do live server
1.  **Abre o diretorio `public/index.html`** seleciona esse arquivo e executa com live server
2.  Um mapa aleatório será gerado.
3.  **Escolhe o algoritmo de busca** que desejas executar através das seguintes teclas:
    - **B**: Busca em Largura (BFS)
    - **D**: Busca em Profundidade (DFS)
    - **U**: Busca de Custo Uniforme (UCS)
    - **G**: Busca Gulosa (Greedy Best-First)
    - **A**: A\* (A-Star)
4.  Observa o agente a encontrar e a seguir o caminho para a comida.
5.  Assim que a comida é coletada, uma nova comida aparece noutra posição aleatória e uma nova busca é iniciada.
6.  Para gerar um **novo mapa**, basta pressionar a tecla **R**.

## ✨ Funcionalidades

- **Geração Aleatória de Mapas:** Cada vez que a simulação é reiniciada ou a tecla 'R' é pressionada, um novo mapa com obstáculos e terrenos de diferentes custos é gerado.
- **Múltiplos Algoritmos:** Implementação de 5 estratégias de busca diferentes:
  - Busca em Largura (BFS)
  - Busca em Profundidade (DFS)
  - Busca de Custo Uniforme (UCS)
  - Busca Gulosa (Greedy Best-First)
  - A\* (A-Star)
- **Ambiente com Custos:** O mapa possui 4 tipos de terreno que afetam o movimento e o custo do caminho:
  - **Obstáculo (Preto/Cinza Escuro):** Intransponível.
  - **Areia (Custo 1):** Terreno normal.
  - **Atoleiro (Custo 5):** Terreno lento.
  - **Água (Custo 10):** Terreno muito lento.
- **Animação da Busca:** A simulação não mostra apenas o resultado final. Ela anima, passo a passo, a exploração do algoritmo, permitindo uma visualização clara de como a busca funciona.
- **Heurística Padronizada:** As buscas Gulosa e A\* utilizam a heurística de **Distância de Manhattan** para estimar a distância até o objetivo.

## 🎨 Visualização da Busca

Para facilitar a avaliação e o entendimento do processo, a simulação utiliza cores distintas para cada estado de um nó (célula do grid) durante a busca:

- **Fronteira (Frontier):** Células que estão na lista para serem exploradas (cor vermelha).
- **Visitados (Explored):** Células que já foram exploradas e descartadas (cor cinza).
- **Caminho Final (Path):** O caminho ótimo encontrado pela busca, que o agente irá seguir (cor verde).
- **Agente:** (cor verde).
- **Comida:** (cor laranja).

## 🏛️ Arquitetura e Tecnologias

- **Linguagem:** JavaScript
- **Biblioteca Principal:** [p5.js](https://p5js.org/) para toda a lógica de renderização, animação e interação.
