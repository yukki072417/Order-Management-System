import { Order } from "./order.js";

export class OrderLog extends Order {
    constructor(
        orderNumber,
        productName,
        productQuantity,
        addBeef,
        addEgg,
        orderTime
    ){
        super(orderNumber, productName, productQuantity, addBeef, addEgg, orderTime);
    }
}
