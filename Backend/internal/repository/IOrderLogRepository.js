export class IOrderLogRepository {
    /** @param {import("../entity/orderLog").OrderLog[]} orders */
    async create(orders) { throw new Error("Not implemented"); }

    /** @returns {Promise<object[]>} */
    async findAll() { throw new Error("Not implemented"); }

    /** @returns {Promise<number>} 次の注文番号 */
    async getNextOrderNumber() { throw new Error("Not implemented"); }
}
