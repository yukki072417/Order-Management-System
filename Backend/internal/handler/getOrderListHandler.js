export function getOrderListHandler(getOrderListUseCase) {
    return async (req, res) => {
        try {
            const orders = await getOrderListUseCase.execute();
            res.json(orders);
        } catch (err) {
            console.error(err);
            res.status(500).send("Failed to get order list");
        }
    };
}
