FROM node:9.11.1
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add patch
RUN mkdir ./patches
COPY ./patches/regenerator-runtime+0.12.1.patch ./patches/regenerator-runtime+0.12.1.patch

# Add app dependencies
# modify dependencies in .circleci/bin/addOtherDependencies.js
COPY ./store/src ./src
COPY ./store/package.json ./package.json
COPY ./store/next.config.js ./next.config.js
RUN npm install {{ dependencies }}
RUN npm run postinstall
RUN npm install --production

# copy @meepshop/meep-ui
COPY ./meep-ui ./node_modules/@meepshop/meep-ui

EXPOSE 14401
ENV REPO_VERSION={{ build.tag }}
ENV NODE_ENV=production
ENV API_HOST=api.stage.meepcloud.com
CMD ["node", "src/server"]
