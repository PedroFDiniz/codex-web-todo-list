# codex-web-todo-list
Desafio 2 da Codex - Um sistema web para uma ToDo list

## Preparando o ambiente
 - Certifique-se que o node.js está instalado no seu sistema e listado entre as variáveis de ambiente. Você pode baixá-lo [aqui](https://nodejs.org/en/download).
 - Abra um terminal e use o comando `node --v` para checar se a versão do node é `v18.16.1` ou superior. Também cheque com `npm -v` se o Node Package Manager está instalado na versão `9.5.1` ou superior.
 - No terminal, navegue até o diretório do projeto. E por último, rode o comando `npm check-dependencies --save-dev` para instalar as dependências do projeto.

## Rodando o projeto
Para iniciar uma execução do projeto, você deve rodar os seguintes scripts pela linha de comando:
```
npm run build
npm run start
```
## Endpoints
### GET /login
Recebe um email e uma senha e retorna um id de usuário e um token de acesso.
ex. resposta:
{
	"result": {
		"id": "6619d122cb0c6d4fba3bd894",
		"token": "914e6957-4aa8-4996-bb10-676467f9cdb3"
	},
	"messages": [
		"Usuário autorizado."
	]
}
### GET /debug
Retorna todos os usuários cadastrados no banco de dados.
ex. resposta:
{
    "result": [
        {
			"_id": "6619d122cb0c6d4fba3bd894",
			"name": "Joaozinho",
			"age": 20,
			"sex": "M",
			"email": "joao@exemplo.com",
			"password": "passwd",
			"tasks": [],
			"__v": 0,
			"token": "914e6957-4aa8-4996-bb10-676467f9cdb3"
		}
    ],
    "messages": []
}
### POST /usuario/cadastrar
Cria um novo usuário. Necessário para login.
ex. de corpo de requisição:
{
	"name": "Joaozinho",
	"age": 20,
	"sex": "M",
	"email": "joao@exemplo.com",
	"password": "passwd"
}
ex. de resposta:
{
	"result": {
		"name": "Joaozinho",
		"age": 20,
		"sex": "M",
		"email": "joao@exemplo.com",
		"password": "passwd",
		"tasks": [],
		"_id": "6619d122cb0c6d4fba3bd894",
		"__v": 0
	},
	"messages": [
		"Usuário Joaozinho criado."
	]
}
### POST /usuario/pesquisar
Tenta encontrar um usuário a partir de um id, nome ou email. Pesquisa o primeiro sequencialmente nessa exata ordem. Requer um 'id' e um 'token' no cabeçalho.
Também é usado apenas para debug, pois os níveis de autorização ainda não foram implementados.
ex.: de cabeçalho: 
    id: 6619d122cb0c6d4fba3bd894
    token: 914e6957-4aa8-4996-bb10-676467f9cdb3
ex. de corpo:
{
	"userId": "6619d122cb0c6d4fba3bd894",
	"name": "",
	"email": ""
}
ex. de resposta:
{
	"result": {
		"_id": "6619d122cb0c6d4fba3bd894",
		"name": "Joaozinho",
		"age": 20,
		"sex": "M",
		"email": "joao@exemplo.com",
		"password": "passwd",
		"tasks": [],
		"__v": 0,
		"token": "914e6957-4aa8-4996-bb10-676467f9cdb3"
	},
	"messages": [
		"Usuário Joaozinho encontrado."
	]
}
### POST /:id/editar
Edita as informações de um usuário. Requer um token no cabeçalho e o id do usuário no parâmetro do endereço da página (ex.: http://localhost:8080/6619d122cb0c6d4fba3bd894/editar).

ex. de cabeçalho:
    token: 914e6957-4aa8-4996-bb10-676467f9cdb3
ex. de corpo de requisição:
{
	"name": "Joao Alterado",
	"age": 50,
	"picture": "asdfghjklç"
}
ex. de resposta:
{
	"result": null,
	"messages": [
		"Usuário Joao Alterado editado."
	]
}
### GET /:id/perfil
Resgata as informações relevantes do usuário. Usa id nos parâmetros e token no cabeçalho, como na rota anterior.
http://localhost:8080/6619d122cb0c6d4fba3bd894/perfil
no cabeçalho:
    token: 914e6957-4aa8-4996-bb10-676467f9cdb3
ex. de resposta:
{
	"result": {
		"name": "Joaozinho",
		"age": 20,
		"sex": "M",
		"email": "joao@exemplo.com",
		"tasks": []
	},
	"messages": [
		"Usuário Joaozinho resgatado com sucesso."
	]
}
### GET /:id/tarefas/
Resgata as tarefas do usuário logado. Usa id nos parâmetros e token no cabeçalho, como na rota anterior.
http://localhost:8080/6619d122cb0c6d4fba3bd894/tarefas
no cabeçalho:
    token: 914e6957-4aa8-4996-bb10-676467f9cdb3
ex. de resposta:
{
	"result": [
		{
			"_id": "6619d8c2b8c655fe3d60c01f",
			"name": "Codex - Desafio 2",
			"date": "2024-04-12T20:17:04.862Z",
			"status": "PENDENTE",
			"description": "Entrega às 23:59"
		}
	],
	"messages": [
		"Tarefas resgatadas."
	]
}
### POST /:id/tarefas/agendar
Adiciona uma tarefa à lista do usuário logado. Necessita do id e token como nas rotas anteriores.
http://localhost:8080/6619d122cb0c6d4fba3bd894/tarefas/agendar
cabeçalho:
    token: 914e6957-4aa8-4996-bb10-676467f9cdb3
corpo:
{
	"name": "Codex - Desafio 2",
	"date": "2024-04-12T20:17:04.862Z",
	"description": "Entrega às 23:59"
}
ex. de resposta:
{
	"result": {
		"name": "Codex - Desafio 2",
		"date": "2024-04-12T20:17:04.862Z",
		"status": "PENDENTE",
		"description": "Entrega às 23:59",
		"_id": "6619d8c2b8c655fe3d60c01f",
		"__v": 0
	},
	"messages": [
		"Tarefa Codex - Desafio 2 criada.",
		"Mensagem adicionada à lista do usuário Joaozinho com sucesso."
	]
}
### DELETE /:id/tarefas/apagar
Apaga uma tarefa de um usuário. Requer id do usuário como parâmetro e token de acesso no cabeçalho. Também requer uma lista de ids referentes às tarefas a serem apagadas.
http://localhost:8080/66186d28d370598f5b2179da/tarefas/apagar
cabeçalho:
    token: 914e6957-4aa8-4996-bb10-676467f9cdb3
ex. de corpo:
{
	"ids": ["6619971ddc6b371b46623f23"]
}
ex. de resposta:
{
	"result": {},
	"messages": [
		"Tarefas removidas."
	]
}

### POST /:id/tarefas/marcar
Muda o estado de uma tarefa de "PENDENTE" para "CONCLUIDA". Requer id do usuário e token de acesso, como normal, e também requer um corpo com 'taskId', denotando em qual das tarefas a operação será realizada.
http://localhost:8080/6619d122cb0c6d4fba3bd894/tarefas/marcar
cabeçalho:
    token: 914e6957-4aa8-4996-bb10-676467f9cdb3
ex. de corpo:
{
	"taskId": "6619d8c2b8c655fe3d60c01f"
}
ex. de resposta:
{
	"result": {},
	"messages": [
		"Estado da tarefa alterado com sucesso."
	]
}