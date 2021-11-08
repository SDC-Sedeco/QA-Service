
# Build
FROM node:14-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python3 cmake

RUN mkdir /QA-Service

# Sets the working directory for subsequent build steps, and later for containers created from the image to pathway -- where the application files will go
WORKDIR /QA-Service

# Copies npm files to WORKDIR.
COPY package*.json ./


#Download required packages
RUN npm install --quiet node-gyp -g &&\
  npm install --quiet

#COPIES files from current folder to WORKDIR
COPY . .
COPY .env .

EXPOSE 8083

#Runs application when running container
CMD ["npm", "run", "start-dev"]