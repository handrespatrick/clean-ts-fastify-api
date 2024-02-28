# clean-ts-fastify-api

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=bugs&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Code_smells](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=code_smells&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=coverage&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=duplicated_lines_density&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Ncloc](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=ncloc&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=sqale_rating&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Alert_status](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=alert_status&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=reliability_rating&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Security_rating](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=security_rating&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Sqale_index](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=sqale_index&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=handrespatrick_clean-ts-fastify-api&metric=vulnerabilities&token=c209703b233c7d1214fab23e6ad14835dbd216d5)](https://sonarcloud.io/summary/new_code?id=handrespatrick_clean-ts-fastify-api)

## 📚 Descrição

Aplicação CRUD responsável por gerenciar a autenticação de usuários e o controle de acesso, além de permitir a gestão das tabelas.

## 🔗 URLs

| Environment | URL                      |
| ----------- | ------------------------ |
| LOCAL       | <http://localhost:3000/> |

## 🎯 Comandos

| Comando | Descrição                          |
| ------- | ---------------------------------- |
| start   | Inicializa o projeto               |
| lint    | Aplica lint em todo o projeto      |
| test    | Executa todos os testes do projeto |

## 🍂 Pilha de tecnologia

- [NodeJS](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org)
- [Fastify](https://www.fastify.io)
- [Prisma](https://www.prisma.io)
- [Jest](https://jestjs.io)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Lint Staged](https://github.com/okonet/lint-staged#readme)
- [Husky](https://typicode.github.io/husky)
- [Git Commit Msg Lint](https://www.npmjs.com/package/git-commit-msg-linter)
- [Swagger](https://swagger.io)
- [Github Actions](https://docs.github.com/pt/actions)
- [SonarQube](https://www.sonarqube.org)

### 📁 Estrutura

- [`application`](./src/application) - Orquestra o fluxo de dados entre o domínio e as interfaces, contendo a lógica de aplicação e casos de uso.
- [`domain`](./src/domain) - O núcleo do sistema, com regras e lógicas de negócio, entidades, e interfaces de repositórios.
- [`infra`](./src/infra) - Implementa detalhes técnicos como bancos de dados e comunicação com serviços externos.
- [`main`](./src/main) - Ponto de entrada da aplicação, responsável pela inicialização e configuração.
- [`presentation`](./src/presentation) - Interage com o usuário ou sistemas externos, tratando de requisições e respostas.

### 🏛️ Arquitetura

O projeto segue a arquitetura:

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)

## 🏃 Rodando o projeto

- Instale as dependências do projeto executando o comando `npm install`

- Para Inicializar o projeto execute o comando `npm run start`

- Para executar os testes, execute o comando `npm run test`

- Para aplicar lint no projeto, execute o comando `npm run lint`
