/**
 * Cenário:
 * 1. Um tópico específico para busca de detalhes de um produto em uma pesquisa deve ser criado
 * 2. A chave da partição deve ser o ID da pesquisa
 * topic: crawl-details
 * partition: 12ad34s-2123sda
 * ---- Validações:
 * - Mesmo adicionando ou removendo partições, as mensagens de uma mesma pesquisa devem ser enviadas para a mesma partição
 * - A chave da partição deve ser o ID da pesquisa
 */
import {AuthenticationOauth2, Client} from 'pulsar-client';
import consumer from './consumer';
import producer from './producer';

async function main() {
  const client = new Client({
    serviceUrl: 'pulsar+ssl://free.o-k0i23.snio.cloud:6651',
    authentication: new AuthenticationOauth2({
    type: "sn_service_account",
    client_id: "hjMJ8p9h0F1CVe9gqTXZG8eR3lsGBJyE",
    client_secret: "zSPnmCmQSBQ31c4B_1CABXYlszAdlfbm8V8qaugPSa9PS1FuJ_PVT8JOT939ENSS",
      issuer_url: "https://auth.streamnative.cloud/",
      audience: "urn:sn:pulsar:o-k0i23:free"
    })
  })
  console.log('client', client)
  consumer(client, 'consumer-1')
  consumer(client, 'consumer-2')
  consumer(client, 'consumer-3')
  producer(client)
  producer(client)
}
main()