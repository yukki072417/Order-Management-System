export function orderHandler(placeOrderUseCase) {
    return async (req, res) => {
        try {
            const orderNumber = await placeOrderUseCase.execute(req.body);
            res.status(200).json({ ORDER_NUMBER: orderNumber });
        } catch (err) {
            console.error(err);
            res.status(500).send("Order failed");
        }
    };
}
