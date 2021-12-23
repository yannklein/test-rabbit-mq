import amqp from 'amqplib/callback_api.js';

amqp.connect('amqp://127.0.0.1', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = 'task_queue';

        // This makes sure the queue is declared before attempting to consume from it
        channel.assertQueue(queue, {
          durable: true
        });

        channel.consume(queue, (msg) => {
          const secs = Math.round(Math.random()*3) + 1;

          console.log(" [x] Received %s", msg.content.toString());
          setTimeout(() => {
            console.log(` [x] Done in ${secs}secs`);
          }, secs * 1000);
        }, {
          // automatic acknowledgment mode,
          // see ../confirms.html for details
          noAck: true
        });
    });
});