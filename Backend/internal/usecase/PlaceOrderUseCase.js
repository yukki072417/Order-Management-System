import { Order } from "../entity/order.js";
import { OrderLog } from "../entity/orderLog.js";
import { getJapanTime } from "../utils/japanTime.js";

export class PlaceOrderUseCase {
    constructor(orderRepository, orderLogRepository, broadcaster) {
        this.orderRepository = orderRepository;
        this.orderLogRepository = orderLogRepository;
        this.broadcaster = broadcaster;
    }

    async execute(items) {
        const orderNumber = await this.orderLogRepository.getNextOrderNumber();
        const orderTime = getJapanTime();

        const orders = items.map(item =>
            new Order(orderNumber, item.NAME, item.ITEM_QUANTITY, item.ADD_BEEF, item.ADD_EGG, orderTime)
        );
        const orderLogs = items.map(item =>
            new OrderLog(orderNumber, item.NAME, item.ITEM_QUANTITY, item.ADD_BEEF, item.ADD_EGG, orderTime)
        );

        await this.orderRepository.create(orders);
        await this.orderLogRepository.create(orderLogs);
        await this.broadcaster.broadcast();

        return orderNumber;
    }
}
