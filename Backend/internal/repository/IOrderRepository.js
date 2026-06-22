export class IOrderRepository {
    /** @param {import("../entity/order").Order[]} orders */
    async create(orders) { throw new Error("Not implemented"); }

    /** @returns {Promise<{ORDER_NUMBER: number, ORDER_CONTENTS: object[]}[]>} */
    async findAll() { throw new Error("Not implemented"); }

    /** @param {number} orderNumber */
    async deleteByOrderNumber(orderNumber) { throw new Error("Not implemented"); }
}
