import express from 'express';
import cors from 'cors';
import router from './src/routes/route.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/', router);

app.listen(PORT, () => {
    console.log('Server launched PORT:' + PORT);
});