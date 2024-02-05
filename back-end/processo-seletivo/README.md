# Sistema de Gestão API

Este projeto consiste em uma API para um sistema de skills com os seguintes requisitos:

## Funcionalidades

### 1. Serviço de Login

- Autenticação baseada em login e senha.
- Verificação de credenciais na base de dados.
- Senhas armazenadas de forma segura, utilizando criptografia.
- Geração de token para acesso a outros serviços.

### 2. Serviço de Cadastro

- Cadastro de usuários com informações básicas.
- Senhas armazenadas de forma segura, utilizando criptografia.

### 3. Serviço de Listagem de Dados

- Recuperação de dados específicos do sistema.

### 4. Serviço de Atualização de Dados

- Atualização de informações no sistema.

### 5. Serviço de Exclusão de Dados

- Remoção de registros do sistema.

### 6. Autenticação e Segurança

- Apenas o serviço de login é público.
- Os demais serviços requerem autenticação via token.

## Configuração do Projeto

### Execução

1. Clone o repositório.
2. Configure as credenciais do banco de dados no arquivo de configuração.
3. Execute o projeto.

## Tecnologias Utilizadas

- Springboot 
- Swagger

## Documentação

A documentação da API está disponível através do Swagger. Acesse o seguinte endpoint após iniciar a aplicação:

```bash
http://localhost:8080/swagger-ui.html
```