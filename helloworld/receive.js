#!/usr/bin/env node

import amqp from 'amqplib/callback_api.js';

amqp.connect('amqp://127.0.0.1', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});