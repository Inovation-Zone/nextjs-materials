# # Use a Node.js 14 base image
# FROM node:14-alpine

# # Set the working directory to /app
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Build the Next.js application for production
# RUN npm run build

# # Set the environment variable to production
# ENV NODE_ENV=production

# # Expose port 3000
# EXPOSE 3000

# # Start the Next.js application
# CMD ["npm", "start-prod"]


# Build stage
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Run stage
FROM node:14-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
RUN npm install --production

COPY --from=build /app/.next ./.next
COPY public ./public
COPY next.config.js ./next.config.js

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start-prod"]
