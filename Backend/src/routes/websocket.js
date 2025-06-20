let latestOrderList = [];
const clients = new Set();

//データベースにデータを取りに行く関数
async function fetchOrderList() {
  const response = await fetch('http://localhost:3000/api/get-order', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

//データベースが更新されたときに、クライアントに変更内容を送信する関数。データベースに変更を加えたときは、必ず実行すること
export async function broadcastLatestOrderList() {
  try {
    const newOrderList = await fetchOrderList();
    latestOrderList = newOrderList;
    for (const ws of clients) {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(latestOrderList));
      }
    }
  } catch (e) {
    console.error('注文リスト取得エラー:', e);
  }
}

//websocket接続時に注文データベースのデータをクライアントに送信する関数
const websocketRouter = (app) => {
  app.ws('/ws/order-list', async (ws, req) => {
    clients.add(ws);
    try {
      const data = await fetchOrderList();
      ws.send(JSON.stringify(data));
    } catch (e) {
      ws.send(JSON.stringify([]))
    }
    ws.on('close', () => {
      clients.delete(ws);
      console.log('WebSocket connection closed');
    });
  });
};

export default websocketRouter;