FROM node:5.6

MAINTAINER Granville Schmidt, granville.schmidt@gmail.com

# Install globals we need for npm to build and run the project.
RUN npm install -g forever nodemon node-inspector

# Node Environment. You want to overwrite this when running
# in staging or production. Overwrite on the run command.
ENV NODE_ENV development

# Where the app lives on the host (container).
ENV APP_ROOT /src

# Health Check Configuration
ENV HEALTH_ENDPOINT_NAME some-worker-service-change-me
ENV HEALTH_ENDPOINT_PORT 12900

# RabbitMQ configuration.
ENV RABBITMQ_HOST 127.0.0.1
ENV RABBITMQ_PORT 5672
ENV RABBITMQ_USER guest
ENV RABBITMQ_PASSWORD guest
ENV RABBITMQ_VHOST /

# Copy the local app to the host.
COPY . $APP_ROOT

# Go to the app directory.
WORKDIR $APP_ROOT

# Prep the app.
RUN npm install

# Copy the New Relic configuration file to the app root directory.
RUN cp node_modules/newrelic/lib/config.default.js newrelic.js

#CMD ["npm", "start"]

# Start the app. Notice forever didn't start it with `start`
# so it wouldn't go into the background. Important that it stays
# in the foreground.
CMD forever -w --watchDirectory . --minUptime 1000 --spinSleepTime 1000 ./app/index.js
