# rentalx
Uma API para aluguel de carros desenvolvida em Node.js com express

## Preparação do ambiente

### Preparação inicial do projeto
```sh
# Instala as dependências
yarn

# Cria os containers
docker-compose up -d

# Executa as migrations
yarn typeorm migration:run

# Executa seed no banco de dados
yarn seed:admin
```

### Criação do banco para testes
```sql
-- Cria o banco para testes de integração
CREATE DATABASE rentx_test
```

### Criação das variáveis de ambiente
```env
BASE_URL=http://localhost:3333
HOST=http://localhost
PORT=3333
RESET_PASSWORD_ENDPOINT=/password/reset?token=
NODE_ENV=localhost
```

## Cadastro de carros
### Requisitos Funcionais
- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

### Regras de Negócio
- Não deve ser possível cadastrar um novo carro com uma placa já existente.
- O carro deve ser cadastrado com disponibilidade ativa por padrão.
- Apenas um usuário administrador pode resalizar um cadastro.

## Listagem de carros
### Requisitos Funcionais
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.
- Deve ser possível listar todos os carros disponíveis pela categoria.
- Deve ser possível listar todos os carros disponíveis pela marca.

### Regras de Negócio
- O usuário não precisa estar logado no sistema.

## Cadastro de Especificação de carros
### Requisitos Funcionais
- Deve ser possível cadastrar uma especificação para um carro.

### Regra de Negócio
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- Apenas um usuário administrador pode resalizar um cadastro.

## Listagem de Especificação de carros
### Requisitos Funcionais
- Deve ser possível listar todas as epecificações.

### Regras de Negócio
- O usuário não precisa estar logado no sistema.

## Cadastro de Imagem do Carro
### Requisitos Funcionais
- Deve ser possível cadastrar a imagem do carro.

### Requisitos não Funcionais
- Ultilizar o multer para upload de arquivo.

### Regras de Negócio
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- Apenas um usuário administrador pode resalizar um cadastro.

## Aluguel de carro
### Requisitos Funcionais
- Deve ser possível cadastrar um aluguel.

### Regras de Negócio
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já um aluguel aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já um aluguel aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

## Devolução de carro
### Requisitos Funcionais
- Deve ser possível realizar a devolução de um carro.

### Regras de Negócio
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para para outro aluguel.
- Ao realizar a devoluçao, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado
multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação.

## Recuperação de senha
### Requisitos Funcionais
- Deve ser possível recuperar a senha informando o email.
- O usuário deve receber um email com o passo a passo para recuperar a senha.
- O usuário deve conseguir inserir uma nova senha.

### Requisitos não Funcionais
- O usuário precisa informar uma nova senha.
- O link enviado para recuperação deve expirar em 3 horas.
