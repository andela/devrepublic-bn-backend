FROM node:13

WORKDIR /home

COPY package*.json /home/

RUN npm install

COPY . /home

EXPOSE 3000

CMD [ "npm", "start" ]