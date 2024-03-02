# Servidor de batalhas Pokemon
![image](https://github.com/silvasilas99/pokebattlee-server/assets/49960425/25f400db-78ab-4f13-a5ec-98985698c042)

    Visão Geral do Projeto: 
    
    Este projeto objetiva alcansar uma compreensão maior sobre organização de modulos Node.js, 
    assim como seus mecânismos para tratamentos de exceções, testes unitários e de integração, uso de recursos 
    sincronos e assincronos, dentre outras especifidades da ferramenta. Além disso, também fornece uma interface
    REST para uso em clientes diverosos de integração (como Discord) para entretenimento de amigos e colegas.
    
## Instruções de Utilização: 
      Clone o repositório do projeto
        git clone github.com/silvasilas99/pokebattlee-server/

      Crie um arquivo ".env" com base no arquivo ".env.example", ou use os pârametros abaixo
          DB_ACCESS_URL="mongodb+srv://db_user:db_password@db_url"  # Utilizei o serviço de clusters para DBs gratuito da Atlas, devido a limitação de recursos de hardware
          DB_NAME="pokebattle-db"
          NODE_LOCAL_PORT=6868
          NODE_DOCKER_PORT=8080

      Prepare o container da aplicação
        docker compose up --build  # Essa operação ira realizar um build do container de aplicação Node.Js, além de instalar as dependências necessárias e iniciar o serviço na porta escolhida
      Ou se preferir, execute o Node.js diretamente pela sua máquina hospedeira (poupa recursos operacionais)
        npm install
        npm start

      Acesse o endereço http://localhost:8080/doc
        Após use o cliente do REST da SwaggerUI ou algum da sua preferência para realizar as operações desejadas

      Realize os testes para verificar possiveis inconsistências
        jest -- <NomeDeArquivoQueDesejaTestar>
        
## Pacotes Utilizados: 
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "lodash": "^4.17.21",
    "mongoose": "^8.2.0",
    "morgan": "^1.10.0",
    "supertest": "^6.3.4",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0"

## Estrutura do Projeto:
    ├─── controllers
    ├─── core
    ├─── factories
    ├─── helpers
    ├─── mocks
    ├─── models
    ├─── routes
    ├─── services
    └─── test
        ├─── integration
        │   └───c ontrollers
        └─── unit
            ├─── controllers
            └─── services
