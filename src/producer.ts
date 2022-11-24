import { Client } from "pulsar-client";
import {v4 as uuid} from 'uuid'

const dummyJobData = (surveyId?:string) => ({
  surveyId: surveyId || uuid(),
  timestamp: Date.now(),
  url: 'https://dummy-url.here'
})


export default async (client:Client) => {
  const producer = await client.createProducer({
    topic: "crawl-details",
    messageRoutingMode: "RoundRobinDistribution",
    
  })
  for (let i = 0; i < 5; i++) {
    const surveyId = uuid()
    for (let j = 0; j < 3; j++) {
      const data = dummyJobData(surveyId)
      await producer.send({
        data: Buffer.from(JSON.stringify(data)),
        orderingKey: data.surveyId,
        partitionKey: data.surveyId,
        
      })
      console.log(`PRODUCING | ID=${data.surveyId} | t=${data.timestamp}`);
    }
  }
  await producer.flush()
  await producer.close()
}