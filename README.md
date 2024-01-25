# Introdução
### Este repositório foi criado para resolver o teste da facilita jurídico (https://docs.google.com/document/d/1D9UFnRlWfUUlizmGV-8EIKT8YXpjO2Fxzw7ch1muz9U/edit)

### Para este teste utilizarei uma imagem Docker com o PostgreSQL e o PgRouting (para utilizar a função do traveling sales person que irá calcular a melhor rota utilizando os pontos x,y)

#### A imagem docker que foi utilizada foi disponibilizada neste repositório: https://github.com/pgRouting/docker-pgrouting/tree/master

#### Foi utilizada a versão mais recente (pgrouting/pgrouting:15-3.3-3.4)

### Para rodar a imagem docker utilize os seguintes comandos:
``` bash
cd 15-3.3-3.4
docker build -t pgrouting/pgrouting:$(cat version.txt) .
docker-compose up
```

### Com o compose rodando utilize este comando para rodar o psql
``` bash
docker-compose exec pgrouting psql -U postgres
```

### Rodando o psql crie a database e adicione as extensões do pgRouting e a tabela de clientes
``` postgresql
create database teste_facilita_juridico;

\c teste_facilita_juridico;

create extension postgis;

create extension pgrouting;

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(80),
  email VARCHAR(80),
  telefone VARCHAR(20),
  x FLOAT8,
  y FLOAT8
);
```

