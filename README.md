# Algoritmos Geneticos

Projeto em TypeScript para experimentos com algoritmos geneticos aplicados a problemas de otimizacao continua.

Atualmente o projeto implementa dois problemas:
- `ACK`: funcao de Ackley em 10 dimensoes
- `CB3`: funcao CB3 em 2 dimensoes

## Como executar

Instale as dependencias:

```bash
npm install
```

Execute em modo desenvolvimento:

```bash
npm run dev
```

Gerar build:

```bash
npm run build
```

Executar build compilada:

```bash
npm start
```

## Como o projeto funciona

O projeto executa um algoritmo genetico para minimizar uma funcao objetivo.

O fluxo geral e:
1. Criar uma populacao inicial aleatoria dentro do intervalo permitido pelo problema.
2. Avaliar o fitness de cada individuo.
3. Ordenar a populacao pelo menor fitness.
4. Preservar os melhores individuos por elitismo.
5. Gerar novos individuos por selecao, crossover e mutacao.
6. Repetir o processo ate atingir o alvo ou estagnar.

O resultado final da execucao experimental informa:
- `nfe`: media de avaliacoes de fitness realizadas
- `sr`: quantidade de execucoes bem-sucedidas

## Problemas implementados

### ACK

Configuracao principal:
- 10 genes
- intervalo `[-30, 30]`
- populacao com 45 individuos
- ate 1000 geracoes
- mutacao com taxa `0.01`

Operadores usados:
- selecao por torneio
- crossover `BLX-alpha`
- mutacao local

### CB3

Configuracao principal:
- 2 genes
- intervalo `[-5, 5]`
- populacao com 15 individuos
- ate 100 geracoes
- mutacao com taxa `0.35`

Operadores usados:
- selecao por torneio
- crossover por media
- mutacao local

## Estrutura do projeto

```text
src/
  application/
    command/    -> configuracoes prontas de cada problema
    output/     -> tipos de saida da aplicacao
    usecase/    -> caso de uso principal de execucao do AG
  domain/
    counter/    -> contador de avaliacoes de fitness
    ga/
      fitness/  -> funcoes de fitness
      individual/ -> representacao do individuo
      methods/
        crossover/ -> operadores de crossover
        mutation/  -> operadores de mutacao
        selection/ -> operadores de selecao
      geneticAlgorithm.ts -> implementacao principal do AG
    maps/       -> mapeamento de problemas e operadores
    problems/   -> enumeracao dos problemas
  index.ts      -> ponto de entrada
```

## Arquivos principais

- `src/index.ts`: escolhe qual problema sera executado.
- `src/application/usecase/gaUseCase.ts`: executa varias rodadas do AG e calcula estatisticas.
- `src/domain/ga/geneticAlgorithm.ts`: implementa o ciclo evolutivo.
- `src/application/command/ackCommand.ts`: configuracao do problema ACK.
- `src/application/command/cb3Command.ts`: configuracao do problema CB3.

## Como trocar o problema executado

No arquivo `src/index.ts`, altere o valor de `tryProblem`:

```ts
const tryProblem = Problems.CB3;
```

Voce pode trocar para:

```ts
const tryProblem = Problems.ACK;
```

## Observacoes

- O algoritmo foi estruturado para permitir trocar facilmente operadores de selecao, crossover e mutacao.
- Existem implementacoes extras de operadores no projeto, mesmo que nem todos sejam usados nos problemas atuais.
- O foco atual esta em experimentos academicos e comparacao de estrategias de AG.
