FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ensure it binds to all interfaces
ENV HOST=0.0.0.0
EXPOSE 8000

CMD ["npm", "run", "dev"]
