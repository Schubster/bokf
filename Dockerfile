FROM node:13.12.0-alpine

# Set the working directory
WORKDIR /

# Set npm cache directory to a writable location
ENV NPM_CONFIG_CACHE=/tmp/npm-cache

# Copy the entire app to the container
COPY . .

# Install dependencies
RUN npm install

# Deploy app for local development
CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true
