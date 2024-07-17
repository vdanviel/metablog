FROM node:16

WORKDIR /app/server

CMD ["npm", "install"]

COPY config.json ./

COPY package*.json ./

COPY . .

EXPOSE 5000