"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const pulsar_client_1 = require("pulsar-client");
const consumer_1 = __importDefault(require("./consumer"));
const producer_1 = __importDefault(require("./producer"));
async function main() {
    const client = new pulsar_client_1.Client({
        serviceUrl: 'pulsar+ssl://free.o-k0i23.snio.cloud:6651',
        authentication: new pulsar_client_1.AuthenticationOauth2({
            type: "sn_service_account",
            client_id: "hjMJ8p9h0F1CVe9gqTXZG8eR3lsGBJyE",
            client_secret: "zSPnmCmQSBQ31c4B_1CABXYlszAdlfbm8V8qaugPSa9PS1FuJ_PVT8JOT939ENSS",
            issuer_url: "https://auth.streamnative.cloud/",
            audience: "urn:sn:pulsar:o-k0i23:free"
        })
    });
    console.log('client', client);
    (0, consumer_1.default)(client, 'consumer-1');
    (0, consumer_1.default)(client, 'consumer-2');
    (0, consumer_1.default)(client, 'consumer-3');
    (0, producer_1.default)(client);
    (0, producer_1.default)(client);
}
main();
