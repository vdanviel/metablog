# Dockerfile para o backend

# Use uma imagem base que inclua Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app/client

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Copie todo o código fonte do backend para o diretório de trabalho
COPY . .

CMD ["npm", "install"]

# Exponha a porta onde o servidor do backend estará em execução
EXPOSE 8000

# Comando para iniciar o servidor do backend em modo de desenvolvimento
CMD ["npm", "run", "dev"]
