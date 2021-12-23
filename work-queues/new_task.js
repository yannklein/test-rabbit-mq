// run node send.js 'sup?' to try it

import amqp from 'amqplib/callback_api.js';

amqp.connect('amqp://127.0.0.1', (error0, connection) =>  {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'task_queue';
    const msg = process.argv.slice(2).join(' ') || `Some message with a random number: ${Math.round(Math.random()*100)}`;

    channel.assertQueue(queue, {
      durable: true
    });
    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true
    });
    console.log(" [x] Sent '%s'", msg);
  });
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});