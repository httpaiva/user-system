# O que é o "user-system"?

  O “user-system” é um template genérico de um sistema de gestão de usuários para aplicações web, construído com: 

- NodeJS
- Express
- JWT 
- Knex (usando SQLITE)
- Nodemailer


## Como iniciar o projeto:

  Para iniciar o projeto primeiro tem que ter instalado na sua máquina o NodeJS e um package manager (npm ou yarn):

- node/npm: https://nodejs.org/en/

- yarn: https://yarnpkg.com/



  Passo 1 - Clone o repositório via terminal:

`    git clone https://github.com/gabriel-paiva/user-system`

  Passo 2 - Entre na pasta pelo terminal:

​    `cd user-system`

  Passo 3 - Instale as dependências:

​    Com npm:

​      	`npm install`

​	Com yarn:

​		`yarn install`

  **OBS:** Se quiser adaptar os campos do projeto pule para a seção de “Como usar o user-system”.

Passo 4 - Rode a migrate do banco de dados:

​    Com npm:

​      `npm run knex:migrate`

​    Com yarn:

​      `yarn run knex:migrate`

  Passo 5 - Crie um arquivo chamado .env na raíz do projeto e armazene um secret nele com o nome de JWT_SECRET (caso queira gerar um hash aleatório pode-se usar sites como: https://onlinehashtools.com/generate-random-md5-hash) 

​    Exemplo de .env:

 `   JWT_SECRET=seu_secret_aqui`

  Para utilizar o serviço de e-mail para recuperação da senha, seu .env também deve ter os seguintes campos:

  ``` 
    EMAIL_ACCOUNT=endereço_de_email_do_seu_user-system

    EMAIL_PASSWORD=sua_senha
  ```

  Passo 6 - Inicie o servidor:

​    Com npm:

​      `npm start`

​    Com yarn:

​      `yarn start`

  Para testar a aplicação use um cliente de requisições como o Insomnia (https://insomnia.rest/)



## Como usar o user-system:

  Para adaptar esse sistema ao seu projeto, primeiro abra o arquivo “00_create_user.js” através do comando:

  `cd user-system/src/database/migrations/00_create_user`

  Nesse arquivo, você poderá adicionar os campos que desejar ao seu usuário, de acordo com as necessidades do seu sistema. Os campos atuais são: “name”, “email” e “password”. Esses são os campos que serão salvos no banco de dados.

  Após editar o seu usuário, rode o seguinte comando para gerar o banco de dados:

  Com npm:

 `   npm run knex:migrate`

  Com yarn:

`    yarn run knex:migrate`



  Para usar a rota de cadastro, faça a requisição para http://localhost:3333/user, usando o método POST, com um body no formato JSON, com as seguintes informações:

- name
- email
- password

  Para usar a rota de login, faça a requisição para http://localhost:3333/login, usando o método GET, com um header com Basic Authentication usando o email e a senha cadastrados previamente.

  Após logado, o usuário terá acesso à rota protegida com JWT http://localhost:3333/users, usando o método GET e passando no header Authorization: Bearer + Token. Esse Token deve ser válido, retornado pelo cadastro ou pelo login.

  Para usar a rota de solicitação de nova senha, faça a requisição para http://localhost:3333/forgotpassword, usando o método POST e passando o e-mail do usuário cadastrado que trocará sua senha, numa variável chamada "userEmail". Esse usuário receberá um link para um front-end fictício que fará a requisição para a próxima rota, que mudará efetivamente sua senha.

  Para usar a rota de redefinição de senha, faça a requisição para http://localhost:3333/forgotpassword, usando o método PUT passando no header Authorization: Bearer + Token, sendo esse novo Token encontrado no fim do link fictício citado anteriormente. Também passe a nova senha no corpo da requisição, numa variável chamada "newPassword".

  Após logado, o usuário terá acesso à rota protegida com JWT [http://localhost:3333/](http://localhost:3333/login)users, usando o método GET e passando no header Authorization: Bearer + Token. Esse Token deve ser válido, retornado pelo cadastro ou pelo login.


### Contato:

Para entrar em contato em relação ao projeto pode-se criar issues no repositório ou caso queira contribuir para o projeto, basta seguir o [Guia de Contribuição](./CONTRIBUTING.md).