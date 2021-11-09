
# Build
FROM node:14-alpine

# RUN apk --no-cache add --virtual native-deps \
#   g++ gcc libgcc libstdc++ linux-headers make python3 cmake

RUN mkdir /QA-Service

# Sets the working directory for subsequent build steps, and later for containers created from the image to pathway -- where the application files will go
WORKDIR /QA-Service

#COPIES files from current folder to WORKDIR
COPY . .

RUN npm install --quiet

WORKDIR /QA-Service/client
RUN npm run build-dev
# node-gyp -g &&\
# npm install --quiet

EXPOSE 8083

#Runs application when running container
WORKDIR /QA-Service
CMD ["npm", "run", "start-dev"]