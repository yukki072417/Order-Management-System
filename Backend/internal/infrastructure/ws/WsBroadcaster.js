import { IBroadcaster } from "../../broadcaster/IBroadcaster";

export class WsBroadcaster extends IBroadcaster {
    /** @param {Set} clients WebSocket接続中のクライアント集合 */
    constructor(clients, orderRepository) {
        super();
        this.clients = clients;
        this.orderRepository = orderRepository;
    }

    async broadcast() {
        const orderList = await this.orderRepository.findAll();
        for (const ws of this.clients) {
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(orderList));
            }
        }
    }
}
