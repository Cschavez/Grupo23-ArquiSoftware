FROM node:12.14.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g pm2
RUN npm install mocha chai 
RUN npm install request
RUN npm install chai-http
RUN npm test

COPY . ./

EXPOSE 3000

CMD npm run start
