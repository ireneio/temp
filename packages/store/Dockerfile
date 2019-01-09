FROM node:9.11.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy default files
COPY ./patches ./patches
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./lerna.json ./lerna.json
COPY ./Makefile ./Makefile
COPY ./babel.config.js ./babel.config.js
COPY ./node_modules ./node_modules

# Copy folder
COPY ./packages/meep-ui ./packages/meep-ui
COPY ./packages/store ./packages/store
COPY ./packages/test-prod-server ./packages/test-prod-server

RUN yarn lerna link

EXPOSE 14401
ENV REPO_VERSION={{ build.tag }}
ENV NODE_ENV=production
ENV API_HOST=http://meepshop-api:15265
ENV EXTERNAL_API_HOST=https://api.stage.meepcloud.com
CMD ["yarn", "lerna", "run", "--scope", "@meepshop/store", "start", "--stream"]
