FROM node:9.4

COPY client/ $HOME/client
COPY app/ $HOME/app
COPY package.json webpack.config.js index.html $HOME/

RUN npm install
EXPOSE 8081

CMD ["npm", "start"]
