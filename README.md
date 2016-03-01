# rabbitmq-nodejs-microservice-boilerplate
A RabbitMQ Dockerized Microservice Worker Boilerplate in Node.js

### Quick Start (More formal documentation coming soon.)
1. git clone https://github.com/granvilleschmidt/rabbitmq-nodejs-microservice-boilerplate.git
2. cd ./rabbitmq-nodejs-microservice-boilerplate or wherever you put it.
3. npm install
4. Search project for TODO: comments. You will want to do what they say.
5. Copy docker-compose.yml.example to docker-compose.yml
6. Modify environment variables and project files as needed.

### Notes
* Service health can be checked at http(s)://<hostname>:12900/health and diagnostics at http(s)://<hostname>:12900 . Port is configurable via the HEALTH_ENDPOINT_PORT environment variable.
