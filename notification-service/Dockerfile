FROM node:16
RUN apt-get update && apt-get install -y netcat
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/server.js"]
