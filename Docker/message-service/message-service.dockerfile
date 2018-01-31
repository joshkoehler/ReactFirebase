FROM node:9.4

COPY server/ $HOME/server
COPY package.json $HOME/

RUN npm install
EXPOSE 8082

CMD node server/server.js
