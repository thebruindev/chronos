# Base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's files
COPY . .

# Expose port 3000 for Next.js
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]

