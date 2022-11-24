"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomFailure = () => Math.random() > 0.5;
exports.default = async (client, consumerId) => {
    const consumer = await client.subscribe({
        topic: "crawl-details",
        subscription: 'crawl-details-subscription',
        subscriptionType: 'Shared',
    });
    while (true) {
        let msg = null;
        try {
            msg = await consumer.receive();
            if (randomFailure())
                throw new Error('Random failure');
            const data = JSON.parse(msg.getData().toString());
            console.log(`CONSUMER=${consumerId} | P.KEY=${msg.getPartitionKey()} | ID=${data.surveyId} | t=${data.timestamp}`);
            consumer.acknowledge(msg);
        }
        catch (error) {
            consumer.negativeAcknowledge(msg);
            console.error('CONSUMER ERROR', error);
        }
    }
    await consumer.close();
};
