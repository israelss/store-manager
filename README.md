# Store Manager

## <strong>O que foi desenvolvido</strong>

Para este projeto, foi desenvolvida uma _API_, que é um sistema de gerenciamento de vendas, utilizando a arquitetura _MSC_.

Foram desenvolvidas todas as camadas da aplicação (_Models_, _Service_ e _Controllers_) e, por meio dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados:
Criação, Leitura, Atualização e Exclusão (_Create, Read, Update_ e _Delete_).

Foi utilizado o banco **MySQL** para a gestão de dados. Além disso, a API segue o padrão **RESTful**.

---

## <strong>Rodando o projeto</strong>

> Instale as dependências com `npm install`

> Inicie o projeto com `npm start` ou `npm run debug`

> Rode os testes com `npm test` ou `npm run test:mocha`

**⚠️ Atenção:**

- Não há front-end neste projeto;

**⚠️ É essencial configurar essas 4 variáveis de ambiente para testar o projeto localmente:**

```
  MYSQL_HOST
  MYSQL_USER
  MYSQL_PASSWORD
  PORT
```

## <strong>Tabelas</strong>

O banco tem três tabelas: _products_, _sales_ e _sales\_products_.

```sql
DROP DATABASE IF EXISTS StoreManager;

CREATE DATABASE StoreManager;

USE StoreManager;

CREATE TABLE products (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (sale_id)
        REFERENCES sales (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;
```