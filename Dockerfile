
# Build
FROM node:14.18.1

RUN mkdir /QA-Service

# Sets the working directory for subsequent build steps, and later for containers created from the image to pathway -- where the application files will go
# user folder  is a hidden file in macOS. Means "everything user-related". Contains shareable, read-only data
WORKDIR /QA-Service

# Copies npm files to WORKDIR.
COPY package.json .


#Download required packages
RUN npm install --quiet

#COPIES files from current folder to WORKDIR
COPY . .
COPY .env .


EXPOSE 8083

#Runs application when running container
CMD ["npm", "start"]