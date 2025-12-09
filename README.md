# GeoTech - Calculadora de Áreas

Versão 0.1 — React (Vite) + Express.

## Dupla
- Preencha os nomes da dupla aqui.

## Como rodar

### Backend (Express)
1. Entre na pasta `backend/`
2. Instale dependências: `npm install`
3. Inicie: `npm start`

O backend abrirá em `http://localhost:3000`.

### Frontend (Vite + React)
1. Entre na pasta `frontend/`
2. Instale dependências: `npm install`
3. Inicie: `npm run dev`

O frontend abrirá em `http://localhost:5173`.

## Fluxo
- Escolha a forma geométrica, preencha as medidas e clique "Calcular Área".
- O frontend envia `POST http://localhost:3000/area` com JSON `{ forma, medidas }`.
- O backend valida, calcula e retorna `{ forma, area }`.
- O frontend exibe o resultado.

## Validações
- Frontend exige seleção da forma e números válidos.
- Backend retorna `400` se faltar a forma ou medidas ou campos obrigatórios.
