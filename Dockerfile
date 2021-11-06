
# Build
FROM node:14-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python3 cmake
# RUN apk add --no-cache python g++ make
RUN mkdir /QA-Service

# Sets the working directory for subsequent build steps, and later for containers created from the image to pathway -- where the application files will go
# user folder  is a hidden file in macOS. Means "everything user-related". Contains shareable, read-only data
WORKDIR /QA-Service

# Copies npm files to WORKDIR.
COPY package*.json ./


#Download required packages
RUN npm install --quiet node-gyp -g &&\
  npm install --quiet
# apk del native-deps

#COPIES files from current folder to WORKDIR
COPY . .
COPY .env .

EXPOSE 8083

#Runs application when running container
CMD ["npm", "start"]