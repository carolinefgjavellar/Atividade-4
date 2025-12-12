GeoTech – Calculadora de Áreas

Versão 0.1
Tecnologias utilizadas: React (Vite) no frontend e Express no backend.
Dupla responsável: Carol Avelar e Mariana.

Execução do projeto
1. Backend – Express

Para iniciar o servidor:


Acesse a pasta backend/

Instale as dependências:

npm install


Inicie o servidor:

npm start


O backend será executado em: http://localhost:3000

2. Frontend – React + Vite

Para iniciar o frontend:

Navegue até a pasta frontend/

Instale as dependências:

npm install


Inicie o ambiente de desenvolvimento:

npm run dev


A aplicação abrirá em: http://localhost:5173

Funcionamento geral

O usuário seleciona uma forma geométrica e informa as medidas necessárias.

Ao clicar em Calcular Área, o frontend envia uma requisição:
POST http://localhost:3000/area
contendo:

{ "forma": "...", "medidas": { ... } }


O backend verifica os dados, realiza o cálculo e responde:

{ "forma": "...", "area": ... }


O frontend mostra o resultado na tela.
