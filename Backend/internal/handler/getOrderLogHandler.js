export function getOrderLogHandler(getOrderLogUseCase) {
    return async (req, res) => {
        try {
            const logs = await getOrderLogUseCase.execute();
            res.json(logs);
        } catch (err) {
            console.error(err);
            res.status(500).send("Failed to get order log");
        }
    };
}
