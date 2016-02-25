'use strict'; // eslint-disable-line strict

const coworkers = require('coworkers');
const app = coworkers();
const logger = require('./services/LogService');
const Config = require('./services/ConfigurationService');
const uuid = require('node-uuid');

const queue = 'change-me-queue';

app.use(function * traceMessage(next) {
  this.id = uuid.v4();
  // save consumer start time
  const startTime = Date.now();
  // move on to the next middleware
  yield next;
  // all middlewares have finished
  const elapsed = Date.now() - startTime;
  logger.info(`message-trace:${this.id} | Message Transaction Time:${elapsed}`);
});

app.queue(queue, function * dequeueMessage() {
  this.ack = true;
});

app.on('error', function * errorReceived(err, channel, context) {
  logger.error(`${context.queueName} consumer error`, err);
  if (channel) {
    channel.nack(context.message).catch((nackErr) => {
      logger.error(nackErr);
    });
  }
});

const rabbitHost = Config.get('RABBITMQ_HOST') || 'localhost';
const rabbitPort = Config.get('RABBITMQ_PORT') || 12345;
const connectionString = `amqp://${rabbitHost}:${rabbitPort}`;
app.connect(connectionString);
