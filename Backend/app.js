import express from 'express';
import router from './src/routes/route.js'
// const router = require('./src/routes/route.js');

const app = express();
const PORT = 3000;

app.use('/', router);

app.listen(PORT, () => {
    console.log('Server launched PORT:' + PORT);
});