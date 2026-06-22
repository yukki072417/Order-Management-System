export class CompleteOrderUseCase {
    constructor(orderRepository, broadcaster) {
        this.orderRepository = orderRepository;
        this.broadcaster = broadcaster;
    }

    async execute(orderNumber) {
        await this.orderRepository.deleteByOrderNumber(orderNumber);
        await this.broadcaster.broadcast();
    }
}
