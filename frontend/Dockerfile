# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code (including src/)
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Default command
CMD ["npm", "run", "dev"]
