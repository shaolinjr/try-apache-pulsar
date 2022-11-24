"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const dummyJobData = (surveyId) => ({
    surveyId: surveyId || (0, uuid_1.v4)(),
    timestamp: Date.now(),
    url: 'https://dummy-url.here'
});
exports.default = async (client) => {
    const producer = await client.createProducer({
        topic: "crawl-details",
        messageRoutingMode: "RoundRobinDistribution",
    });
    for (let i = 0; i < 5; i++) {
        const surveyId = (0, uuid_1.v4)();
        for (let j = 0; j < 3; j++) {
            const data = dummyJobData(surveyId);
            await producer.send({
                data: Buffer.from(JSON.stringify(data)),
                orderingKey: data.surveyId,
                partitionKey: data.surveyId,
            });
            console.log(`PRODUCING | ID=${data.surveyId} | t=${data.timestamp}`);
        }
    }
    await producer.flush();
    await producer.close();
};
