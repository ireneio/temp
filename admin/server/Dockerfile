FROM node:10.15.3

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
COPY ./admin ./admin

RUN yarn lerna link

EXPOSE 14405
ENV REPO_VERSION={{ build.tag }}
ENV NODE_ENV=production
CMD ["yarn", "lerna", "run", "--scope", "@admin/server", "start", "--stream"]
