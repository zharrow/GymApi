FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]