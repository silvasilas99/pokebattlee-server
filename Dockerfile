FROM node:20

WORKDIR /pokebattle-server
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]