# specify the node base image with your desired version node:<version>
FROM node:18

WORKDIR /app/metablog/server/

COPY package*.json ./

COPY . .

RUN npm install

# replace this with your application's default port
EXPOSE 8005

CMD ["npm", "start"];