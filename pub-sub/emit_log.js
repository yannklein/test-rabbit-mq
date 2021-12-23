import amqp from 'amqplib/callback_api.js';

amqp.connect('amqp://127.0.0.1', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    const exchange = 'logs';
    const defaultMsg = `Some message with a random number: ${Math.round(Math.random()*100)}`;
    const msg = process.argv.slice(2).join(' ') || defaultMsg;

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });
    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});