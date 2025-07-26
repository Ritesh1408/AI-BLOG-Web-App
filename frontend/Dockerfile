FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Allow Vite to run on all interfaces, not just localhost
ENV HOST=0.0.0.0
EXPOSE 5173

CMD ["npm", "run", "dev"]
