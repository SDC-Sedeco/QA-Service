# Preferable to name a specific version rather than do node:lts or node:latest in case of accidental upgrades
FROM node:14.18.1

RUN mkdir usr/app && chown node:node user/app

# Tells docker to run subsequent build steps and later in the process in the container, as the node USER.
USER node

# Sets the working directory for subsequent build steps, and later for containers created from the image to pathway -- where the application files will go
# user folder  is a hidden file in macOS. Means "everything user-related". Contains shareable, read-only data
WORKDIR usr/app

# Copies npm files to WORKDIR. --chown ensures files are own by unprivilged user node, rather than default root
COPY --chown=node:node ./package.json ./

#Download required packages
RUN npm install --quiet

COPY ./ ./


#Runs application when running container
ENTRYPOINT ["npm"]
CMD ["start"]