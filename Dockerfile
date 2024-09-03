# Use Node.js as the base image
FROM node:18

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app to the app directory
COPY . .

# Build the app
RUN npm run build

# Expose the port that your app listens on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
