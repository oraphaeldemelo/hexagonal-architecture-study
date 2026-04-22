# 🧱 Hexagonal Architecture Study (NestJS)

Projeto desenvolvido com o objetivo de **estudar e aplicar na prática a Arquitetura Hexagonal (Ports and Adapters)** utilizando **Node.js, TypeScript e NestJS**.

---

## 🎯 Objetivo

Este projeto tem como foco principal:

* Entender a separação de responsabilidades entre camadas
* Aplicar **Ports and Adapters (Hexagonal Architecture)**
* Praticar princípios **SOLID**
* Desenvolver casos de uso desacoplados e testáveis
* Implementar testes unitários isolados da infraestrutura

---

## 🧠 Conceitos aplicados

* Arquitetura Hexagonal
* Clean Architecture (influência estrutural)
* SOLID (principalmente DIP e SRP)
* Injeção de Dependência (NestJS)
* Testes unitários com Jest
* Separação entre domínio, aplicação e infraestrutura

---

## 🏗️ Estrutura do Projeto

```bash
src/
  task/
    domain/
      entities/
      enums/
      errors/
      ports/
    application/
      dto/
      usecases/
    adapters/
      input/
        http/
      output/
        persistence/
    task.module.ts

  shared/
    filters/

  app.module.ts
  main.ts
```

---

## 📌 Descrição das camadas

### 🧩 Domain

Contém a regra de negócio pura:

* Entidades
* Enums
* Erros de domínio
* Portas (interfaces)

❗ Não depende de frameworks ou tecnologias externas

---

### ⚙️ Application

Contém os **casos de uso**:

* Orquestra o fluxo da aplicação
* Aplica regras de negócio
* Depende apenas de abstrações (ports)

---

### 🔌 Adapters

#### Input (entrada)

* Controllers HTTP (NestJS)
* Recebem requisições e chamam os use cases

#### Output (saída)

* Implementações concretas (ex: repositório em memória)
* Comunicação com banco, APIs externas, etc.

---

### 🧱 Module (NestJS)

Responsável por:

* Injeção de dependência
* Conectar portas com implementações concretas

---

## 🚀 Funcionalidades implementadas

* ✅ Criar tarefa
* ✅ Listar tarefas
* ✅ Concluir tarefa
* ✅ Tratamento de erros de domínio
* ✅ Testes unitários dos casos de uso

---

## 📡 Endpoints

### Criar tarefa

```http
POST /tasks
```

### Listar tarefas

```http
GET /tasks
```

### Concluir tarefa

```http
PATCH /tasks/:id/complete
```

---

## 🧪 Testes

O projeto utiliza **Jest** para testes unitários.

### Rodar testes

```bash
npm run test
```

### Rodar em modo watch

```bash
npm run test:watch
```

### Cobertura de testes

```bash
npm run test:cov
```

---

## 🔍 Estratégia de testes

Os testes são focados nos **use cases**, garantindo:

* Independência de framework
* Uso de mocks para dependências (ports)
* Alta velocidade e isolamento

---

## 🛠️ Tecnologias utilizadas

* Node.js
* TypeScript
* NestJS
* Jest

---

## 📚 Motivação

Este projeto foi desenvolvido como parte de um estudo prático para compreender melhor:

* Arquitetura Hexagonal na prática
* Como estruturar aplicações escaláveis
* Como desacoplar regras de negócio da infraestrutura

---

## 🔮 Próximos passos (evolução)

* [ ] Buscar tarefa por ID
* [ ] Deletar tarefa
* [ ] Persistência com banco de dados (ex: PostgreSQL)
* [ ] Implementar segundo adapter de persistência
* [ ] Melhorar tratamento de erros HTTP
* [ ] Adicionar validações com class-validator
* [ ] Criar testes de integração

---

## 👨‍💻 Autor

Projeto desenvolvido para fins de estudo e evolução profissional.

---

## 📌 Observação

Este projeto não tem como objetivo ser um sistema completo, mas sim uma **base sólida para aprendizado de arquitetura de software moderna**.
