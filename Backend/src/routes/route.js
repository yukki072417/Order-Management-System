import express from 'express';
const router = express.Router();

router.use(express.json());

router.post('/order', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: 'Order received successfully!' });
});

export default router;