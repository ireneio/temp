FROM node:14.15.5

# Create app directory
RUN mkdir -p /app
WORKDIR /app

COPY ./.npmrc ./.npmrc
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./lerna.json ./lerna.json
COPY ./patches ./patches
COPY ./temp ./temp
COPY ./lerna-cache.sh ./lerna-cache.sh

RUN sh lerna-cache.sh ./temp . "package.json"
RUN yarn

COPY ./next.config.js ./next.config.js
COPY ./store ./store
COPY ./meepshop ./meepshop
# Copy folder
# TODO: remove
COPY ./packages/store ./packages/store
COPY ./packages/meep-ui ./packages/meep-ui
COPY ./lib ./lib

RUN sh lerna-cache.sh ./lib . "lib src/.next src/public/locales"

ARG VERSION

EXPOSE 14401
ENV VERSION=$VERSION
ENV API=http://meepshop-api:15265
ENV EXTERNAL_API=https://api.stage.meepcloud.com
ENV NODE_ENV=production
ENV ENV=stage
CMD ["yarn", "lerna", "run", "--scope", "@meepshop/next-store", "start", "--stream"]
