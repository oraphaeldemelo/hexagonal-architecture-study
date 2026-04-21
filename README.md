# Projeto prático para aprender Arquitetura Hexagonal

## Objetivo

Criar um projeto pequeno, mas realista, para aprender na prática:

* Arquitetura Hexagonal
* Ports and Adapters
* Casos de uso
* Inversão de dependência
* Testes unitários
* Organização de projeto em TypeScript

---

## Sugestão de projeto

# API de controle de tarefas com notificações

### Ideia

Uma API simples onde o usuário pode:

* criar tarefa
* listar tarefas
* marcar tarefa como concluída
* definir prazo
* disparar uma notificação quando a tarefa estiver vencida

### Por que esse projeto é bom?

Porque ele permite trabalhar com:

* entrada HTTP
* persistência em banco ou memória
* integração externa simulada (notificação)
* regras de negócio reais
* troca de adaptadores sem mexer no núcleo

---

## Regra de negócio inicial

### Entidade principal

**Task**

Campos sugeridos:

* id
* title
* description
* status
* dueDate
* createdAt
* updatedAt

### Regras iniciais

1. Uma tarefa deve ter título obrigatório.
2. Uma tarefa nasce com status `PENDING`.
3. Uma tarefa concluída não pode ser concluída novamente.
4. Uma tarefa vencida pode disparar notificação.
5. Não deve ser permitido criar tarefa com prazo no passado.

---

## Escopo da versão 1

### Casos de uso

* `CreateTask`
* `ListTasks`
* `CompleteTask`
* `NotifyOverdueTasks`

### Adaptadores iniciais

#### Entrada

* REST Controller

#### Saída

* Repositório em memória
* Serviço fake de notificação por log

---

## Estrutura recomendada

```text
src/
  main/
    server.ts
    app.ts
    routes/
      task.routes.ts

  domain/
    entities/
      task.entity.ts
    enums/
      task-status.enum.ts
    errors/
      domain.error.ts
    value-objects/
    services/
    ports/
      input/
        create-task.usecase.ts
        list-tasks.usecase.ts
        complete-task.usecase.ts
        notify-overdue-tasks.usecase.ts
      output/
        task-repository.port.ts
        notification.port.ts

  application/
    dto/
      create-task.input.ts
      create-task.output.ts
      complete-task.input.ts
      list-tasks.output.ts
    usecases/
      create-task.service.ts
      list-tasks.service.ts
      complete-task.service.ts
      notify-overdue-tasks.service.ts

  adapters/
    input/
      http/
        controllers/
          task.controller.ts
        mappers/
          task-http.mapper.ts
    output/
      persistence/
        memory/
          in-memory-task.repository.ts
      notification/
        console/
          console-notification.adapter.ts

  infra/
    config/
    container/
      dependencies.ts
    shared/
      http-response.ts

  tests/
    unit/
    integration/
```

---

## Papel de cada camada

## Domain

Contém o coração do sistema.

Aqui ficam:

* entidades
* regras de negócio
* contratos de saída (ports)
* erros de domínio

O domínio não conhece Express, Nest, banco, ORM ou API externa.

## Application

Contém os casos de uso.

Aqui ficam:

* orquestração
* validação de fluxo
* chamada às portas
* DTOs

## Adapters

Implementam a comunicação com o mundo externo.

Exemplos:

* controller HTTP
* repositório em memória
* adaptador de notificação

## Infra

Configuração do ambiente.

Exemplos:

* bootstrap da aplicação
* container de dependências
* rotas
* server

---

## Fluxo de uma requisição

### Criar tarefa

1. Requisição HTTP chega no controller.
2. Controller transforma dados de entrada.
3. Controller chama o caso de uso `CreateTask`.
4. Caso de uso aplica a regra de negócio.
5. Caso de uso chama `TaskRepositoryPort`.
6. Um adaptador concreto salva os dados.
7. Controller devolve a resposta HTTP.

---

## Exemplo de contratos principais

### Porta de saída

```ts
export interface TaskRepositoryPort {
  create(task: Task): Promise<Task>
  findAll(): Promise<Task[]>
  findById(id: string): Promise<Task | null>
  update(task: Task): Promise<Task>
  findOverdueTasks(now: Date): Promise<Task[]>
}
```

### Porta de notificação

```ts
export interface NotificationPort {
  send(message: string): Promise<void>
}
```

---

## Ordem de desenvolvimento recomendada

### Etapa 1

Montar a base do projeto:

* TypeScript
* linter
* estrutura de pastas
* scripts

### Etapa 2

Criar domínio:

* entidade `Task`
* enum de status
* erros de domínio

### Etapa 3

Criar portas:

* repositório
* notificação

### Etapa 4

Criar casos de uso:

* criar tarefa
* listar tarefas
* concluir tarefa

### Etapa 5

Criar adaptadores:

* HTTP controller
* repositório em memória
* notificação por console

### Etapa 6

Criar testes unitários dos casos de uso

### Etapa 7

Adicionar persistência real

* PostgreSQL ou MongoDB

### Etapa 8

Adicionar fila ou job

* notificação de tarefas vencidas

---

## Tecnologias sugeridas

### Opção simples para aprender arquitetura

* Node.js
* TypeScript
* Fastify ou Express
* Vitest ou Jest
* UUID
* Zod

### Opção estruturada

* NestJS
* TypeScript
* Jest
* class-validator ou Zod

---

## Recomendação para seu caso

Como seu objetivo agora é **aprender a arquitetura**, e não depender demais do framework, uma boa estratégia é:

### Fase 1

Fazer com **Node + TypeScript + Fastify**

Porque você enxerga melhor:

* as camadas
* a injeção de dependência manual
* a função de cada adaptador

### Fase 2

Refazer ou evoluir para **NestJS**

Porque aí você aprende:

* como o framework organiza DI
* como encaixar hexagonal dentro de módulos
* como evitar acoplamento ao framework

---

## Backlog sugerido

### Sprint 1

* criar projeto base
* configurar tsconfig
* criar estrutura de pastas
* criar entidade Task
* criar `CreateTask`
* criar repositório em memória
* criar endpoint POST `/tasks`

### Sprint 2

* listar tarefas
* concluir tarefa
* testes unitários
* tratamento de erros

### Sprint 3

* buscar tarefas vencidas
* adaptador de notificação
* endpoint ou job para disparo

### Sprint 4

* persistência real
* mapper de banco
* testes de integração

---

## Critérios de aprendizado

Ao final do projeto, você deve conseguir explicar:

1. O que é domínio e o que não é domínio.
2. O que é uma port.
3. O que é um adapter.
4. Como trocar o banco sem mudar o caso de uso.
5. Como testar um caso de uso sem subir servidor.
6. Como um framework deve ficar na borda do sistema.

---
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
