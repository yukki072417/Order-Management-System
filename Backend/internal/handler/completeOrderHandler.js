export function completeOrderHandler(completeOrderUseCase) {
    return async (req, res) => {
        try {
            await completeOrderUseCase.execute(req.body.ORDER_NUMBER);
            res.status(200).json({ result: "success" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    };
}
