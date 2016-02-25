'use strict'; // eslint-disable-line strict

const coworkers = require('coworkers');
const app = coworkers();
const logger = require('./services/LogService');
const Config = require('./services/ConfigurationService');
const uuid = require('node-uuid');
const kardia = require('kardia');

// TODO: Change the queue name.
const queue = 'change-me-queue';

app.use(function * traceMessage(next) {
  // Increment the request throughput, so we can
  // monitor it, and use it to dynamically scale
  // additional workers if needed.
  kardia.throughput('incoming-requests');
  // Increment total messages received, so we can
  // track of how much work this service has received
  // since it was started.
  kardia.increment('total-messages-received', 1);
  // generate a unique message id, so we can track
  // it throughout it's lifecycle.
  this.id = uuid.v4();
  // save consumer start time
  const startTime = Date.now();
  // move on to the next middleware
  yield next;
  // all middlewares have finished
  const elapsed = Date.now() - startTime;
  logger.info(`message-trace:${this.id} | Message Transaction Time:${elapsed}`);
  // Increment our request completed throughput, again so
  // we can utilize the overal health of the service.
  kardia.throughput('completed-requests');
});

app.queue(queue, function * dequeueMessage() {
  //
  // TODO: Put message processing logic here.
  //

  // ACK the message to let RabbitMQ know that we've
  // finished processing the message.
  this.ack = true;
});

app.on('error', function * errorReceived(err, channel, context) {
  // Increment total messages failed, so we can keep
  // tabs on any potential outages.
  kardia.increment('total-messages-failed', 1);
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
