FROM mcr.microsoft.com/playwright:v1.61.1-noble

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
