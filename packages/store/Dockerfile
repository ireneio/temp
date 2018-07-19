FROM node:9.11.1
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Add app dependencies
# modify dependencies in .circleci/bin/addOtherDependencies.js
COPY . .
RUN npm install {{ dependencies }}
RUN npm install

EXPOSE 14401
ENV REPO_VERSION={{ build.tag }}
ENV NODE_ENV=production
ENV API_HOST=api.stage.meepcloud.com
CMD ["node", "src/server/server.js"]
