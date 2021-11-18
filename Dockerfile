
# Build
FROM node:14-alpine

# RUN apk --no-cache add --virtual native-deps \
#   g++ gcc libgcc libstdc++ linux-headers make python3 cmake

RUN mkdir /QA-Service

WORKDIR /QA-Service

#COPIES files from current folder to WORKDIR
COPY . .

ENV NEW_RELIC_NO_CONFIG_FILE=true

RUN npm install --quiet

WORKDIR /QA-Service/client
RUN npm run build-dev
# node-gyp -g &&\
# npm install --quiet

EXPOSE 8083 8082

#Runs application when running container
WORKDIR /QA-Service
CMD ["npm", "run", "start-dev"]