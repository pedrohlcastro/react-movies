# React Movies App

## Como rodar o projeto
  * configure o `.env` com a key do omdb
  * execute `npm start`

## Estrtura e padronização
  * `store`: armazena os itens realacionados ao redux (reducers e actions)
  * `pages`: guarda as paginas (Main e Details), não houve foco no desgin foi utilizado o `material-ui`
  * `components`: poderia ser usada para armazenar components desenvolvidos no projeto
  * `services`: encapsulamento de chamadas externas, uso do `apisauce`
  
Padrão do projeto foi mantido usando `eslint` configurado com base no airbnb. 

## Testes Realizados
Foram realizados alguns tests:
  * test de snapshot no `<App/>`
  * test unitários no service
  * test unitáio no helper de actions

#### Melhorias:
Por falta de tempo não foi feito um conjunto de tests mais amplo e complexos usando o `jest` com `enzyme`, por exemplo
