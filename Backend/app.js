import express from 'express';
import cors from 'cors';
import router from './src/routes/route.js';
import websocket from './src/routes/websocket.js'
import expressWs from 'express-ws';

const app = express();
const PORT = 3000;

app.use(cors());
expressWs(app)
websocket(app); // ここでWebSocketルートを登録bSocketルートを登録
app.use('/api', router);

app.listen(PORT, () => {
    console.log('Server launched PORT:' + PORT);
});