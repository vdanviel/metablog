#EM vite.config.js É configurado a questão do docker

# Use a imagem base do Node para construir a aplicação
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app/metablog/client/

# Copie os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o contêiner
COPY . .

CMD ["npm", "run", "dev"]
