export function createWebsocketRouter(app, clients, getOrderListUseCase) {
    app.ws("/ws/order-list", async (ws, req) => {
        clients.add(ws);
        try {
            const orders = await getOrderListUseCase.execute();
            ws.send(JSON.stringify(orders));
        } catch (e) {
            ws.send(JSON.stringify([]));
        }
        ws.on("close", () => {
            clients.delete(ws);
        });
    });
}
