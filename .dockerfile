FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4580

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]
