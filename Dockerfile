FROM node:5.6

MAINTAINER Granville Schmidt, granville.schmidt@gmail.com

# Install globals we need for npm to build and run the project.
RUN npm install -g forever nodemon node-inspector

# Node Environment. You want to overwrite this when running
# in staging or production. Overwrite on the run command.
ENV NODE_ENV development

# Where the app lives on the host (container).
ENV APP_ROOT /src/app

# Copy the local app to the host.
COPY ./app/ $APP_ROOT

# Go to the app directory.
WORKDIR $APP_ROOT

# Prep the app. This would be a good place to build assets and whatnot.
RUN npm install

# Copy the New Relic configuration file to the app root directory.
RUN cp node_modules/newrelic/lib/config.default.js newrelic.js

#CMD ["npm", "start"]

# Start the app. Notice forever didn't start it with `start`
# so it wouldn't go into the background. Important that it stays
# in the foreground.
CMD forever -w --watchDirectory . index.js
