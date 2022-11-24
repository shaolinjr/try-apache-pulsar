import { Client, Message } from "pulsar-client";

const randomFailure = () => Math.random() > 0.5;

export default async (client: Client, consumerId:string) => {
  const consumer = await client.subscribe({
    topic: "crawl-details",
    subscription: 'crawl-details-subscription',
    subscriptionType: 'Shared',
    
  })

  while (true) {
    let msg: Message | null = null;
    try {
      msg = await consumer.receive();
      if(randomFailure()) throw new Error('Random failure')
      const data = JSON.parse(msg.getData().toString())
      console.log(`CONSUMER=${consumerId} | P.KEY=${msg.getPartitionKey()} | ID=${data.surveyId} | t=${data.timestamp}`);
      consumer.acknowledge(msg);
    } catch (error) {
      consumer.negativeAcknowledge(msg as Message);
      console.error('CONSUMER ERROR', error)
    } 
  }
  await consumer.close()
}
