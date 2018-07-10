FROM node:9.11.1
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN npm install
# fix by patch-package
RUN npm run postinstall

RUN npm run build
EXPOSE 14401

ENV REPO_VERSION=0.0.252
ENV NODE_ENV=production
ENV API_HOST=api.stage.meepcloud.com
CMD ["node", "src/server/server.js"]
