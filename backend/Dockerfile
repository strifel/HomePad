FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7906

VOLUME /usr/src/app/data

CMD [ "node", "."]
