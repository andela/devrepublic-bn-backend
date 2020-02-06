FROM node:13

WORKDIR /Users/jim.ntare/Documents/work/devrepublic-bn-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]