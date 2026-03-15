# API REST

## Descrição da solução desenvolvida:

- Criação de um CRUD para a realização de operações com dados de empresas de Santa Catarina. Abrangendo todas as manipulações de dados iniciais (criação, buscar dados, atualizar, excluir).

## Tecnologias utilizadas:

- Javascript, Jest, Next.js, Docker, Postgres, Insomnia.

## A estrutura geral do projeto;

A estrutura foi desenvolvida seguindo os padrõe de projeto SOLID, com arquitetura limpa e conceitos que facilitam a developer-experience (experiência do desenvolvedor) e extensão do projeto.

Pasta `infra`: contém arquivos de script de inicialização do container Docker do Postgres, funções básicas de incialização de client (biblioteca pg) e query, além de arquivos de migração (bibloteca node-pg-migrate).

Pasta `errors`: Classes de erro personalizadas utilizando como base a classe padrão do javascript "Error".

Pasta `http`: Controller da aplicação, intercepta requisições e retorna o objeto de erro para o usuário (Client) caso o tipo de erro apresentado for capturado.

Pasta `models`: Camada que requisita ao banco de dados as informações necessárias, de acordo com o nome do arquivo.

Pasta `pages`: Segue o fluxo de acesso aos endpoints em forma de pastas, recurso oferecido pelo Next.js (ex: representação de [id] para a url do método GET). Internamente os arquivos são os controllers de cada um, com funções de acordo com o método requisitado.

Pasta `tests`: Segue o mesmo fluxo de acesso dos endpoints, porém para os testes utilizando o Jest, internamente de cada um é separado o método pelo nome do arquivo (ex: `get.test.js`). Internamente abrangendo funcionalidades e exceções/erros.

```
tecsc-api-rest
│
├─ infra
│  ├─ database
│  │  ├─ migrations
│  │  │  └─ ...arquivos de migração
│  │  │
│  │  ├─ compose.yaml
│  │  ├─ database.js
│  │  └─ wait-for-postgres.js
│  │
│  ├─ controller.js
│  └─ errors.js
│
├─ models
│  ├─ business.js
│  └─ migrator.js
│
├─ pages
│  └─ api
│     └─ v1
│        ├─ businesses
│        │  ├─ index.js
│        │  └─ [id]
│        │     └─ index.js
│        │
│        └─ status
│           └─ index.js
│
├─ tests
│  └─ integration
│     └─ api
│        └─ v1
│           ├─ businesses
│           │  ├─ delete.test.js
│           │  ├─ get.test.js
│           │  ├─ post.test.js
│           │  └─ put.test.js
│           │
│           └─ status
│              └─ get.test.js
│
├─ .env.development
├─ jest.config.js
├─ next.config.js
├─ orchestrator.js
├─ package.json
└─ README.md
```

### Arquivo de coleção de requisições para testar no projeto (importar para Postman, Insomnia, etc.):

- [Arquivo .har](Insomnia_2026-03-14.har)
- [Arquivo .yaml](Insomnia_2026-03-14.yaml)

## Instruções necessárias para sua execução:

- Clonar o repositório
- rodar `npm install` na pasta `sctec_api_rest`

## Iniciar o servidor:

- `npm run dev`
  Observações: O Jest foi utilizado para automatizar e facilidade no acesso dos endpoints no desenvolvimento, porém com o servidor rodando pode-se acessar os endpoints no url `http://localhost:3000/api/v1/[endpoint]` através de um client (Postman, Insomnia, etc) e o método correto (GET/POST/PUT/DELETE).

## Rodar testes em paralelo ao servidor (necessita que o servidor esteja rodando):

- `npm run test:watch`

## Rodar bateria de testes (já inicia/encerra o servidor automaticamente):

- `npm run test`

## Link do vídeo:

https://youtu.be/euO6aeR5dzc
