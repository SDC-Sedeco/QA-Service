FROM node:14.18.1

USER node

WORKDIR usr/app

COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]