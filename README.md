# MarvelApp

Este projeto foi desenvolvido utilizando o [Angular CLI](https://github.com/angular/angular-cli) versão 19.1.6.

## Sobre o Projeto

O **MarvelApp** é um aplicativo baseado no universo da Marvel, permitindo visualizar e gerenciar informações sobre heróis. A aplicação consome a API da Marvel para exibir detalhes sobre personagens, histórias e muito mais.

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento local, execute o seguinte comando:

```bash
ng serve
```

Após iniciar o servidor, abra seu navegador e acesse `http://localhost:4200/`. O aplicativo será recarregado automaticamente sempre que você modificar os arquivos do código-fonte.

## Gerando Componentes

O Angular CLI possui ferramentas poderosas para geração de código. Para criar um novo componente, utilize:

```bash
ng generate component nome-do-componente
```

Para ver a lista completa de esquemas disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## Build (Compilação)

Para compilar o projeto, utilize o seguinte comando:

```bash
ng build
```

Os artefatos gerados serão armazenados na pasta `dist/`. Por padrão, a versão de produção otimiza o desempenho e a velocidade da aplicação.

## Executando Testes Unitários

Para rodar os testes unitários utilizando o [Karma](https://karma-runner.github.io), utilize:

```bash
ng test
```

## Executando Testes de Fim a Fim (E2E)

Para testes end-to-end (E2E), execute:

```bash
ng e2e
```

O Angular CLI não inclui uma estrutura de testes E2E por padrão, então você pode escolher a que melhor atende suas necessidades.

## Recursos Adicionais

Para mais informações sobre o Angular CLI, incluindo referências detalhadas de comandos, acesse a [Documentação Oficial do Angular CLI](https://angular.dev/tools/cli).

