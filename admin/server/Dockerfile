FROM node:14.17.0

# Create app directory
RUN mkdir -p /app
WORKDIR /app

COPY ./.npmrc ./.npmrc
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./lerna.json ./lerna.json
COPY ./patches ./patches
COPY ./package_json ./package_json
COPY ./lerna-cache.sh ./lerna-cache.sh

RUN sh lerna-cache.sh restore package.json
RUN yarn

COPY ./next.config.js ./next.config.js
COPY ./admin ./admin
COPY ./meepshop ./meepshop
COPY ./lib ./lib

RUN sh lerna-cache.sh restore lib
RUN NODE_ENV=production yarn meep-cli locales link ./meepshop/locales/locales

EXPOSE 14405
ENV NODE_ENV=production
ENV MEEPSHOP_API=http://meepshop-api:15265
ENV ENV=stage
CMD ["yarn", "--cwd", "./admin/server", "start"]
