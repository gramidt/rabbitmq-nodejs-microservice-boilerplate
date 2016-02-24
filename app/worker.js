'use strict'; // eslint-disable-line strict

const coworkers = require('coworkers');
const app = coworkers();
const log = require('./services/LogService');
const Config = require('./services/ConfigurationService');

const queue = 'change-me-queue';

app.queue(queue, function * dequeueMessage() {
  this.ack = true;
});

app.on('error', function * errorReceived(err, channel, context) {
  log.error(`${context.queueName} consumer error`, err);
  if (channel) {
    channel.nack(context.message).catch((nackErr) => {
      log.error(nackErr);
    });
  }
});

const rabbitHost = Config.get('RABBITMQ_HOST') || 'localhost';
const rabbitPort = Config.get('RABBITMQ_PORT') || 12345;
const connectionString = `amqp://${rabbitHost}:${rabbitPort}`;
app.connect(connectionString);
