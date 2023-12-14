# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Expose port 3000 for the React app

# Start the React app
CMD ["npm", "start"]

# Use an official PostgreSQL image as a parent image
FROM postgres:13-alpine

# Set environment variables
ENV POSTGRES_DB=mydatabase
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

# Expose the PostgreSQL port
EXPOSE 5432