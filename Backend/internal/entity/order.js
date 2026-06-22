import { arrayCheckType } from "../utils/checkType";

export class Order {
    constructor(
        orderNumber,
        productName,
        productQuantity,
        addBeef,
        addEgg,
        orderTime
    ){
        const values = [
            orderNumber,
            productName,
            productQuantity,
            addBeef,
            addEgg,
            orderTime,
        ];
        const types = [
            "number",
            "string",
            "number",
            "boolean",
            "boolean",
            "string",
        ];

        if(!arrayCheckType(values, types)){
            throw new Error("Some args wrong value of types");
        }

        this.orderNumber = orderNumber;
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.addBeef = addBeef;
        this.addEgg = addEgg;
        this.orderTime = orderTime;
    }
}