# rentalx
Uma API para aluguel de carros desenvolvida em Node.js com express

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
- O usuário deve estar logado na aplicação
