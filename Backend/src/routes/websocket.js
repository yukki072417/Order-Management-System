import express from 'express';

let latestOrderList = [];
const clients = new Set();

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

const websocketRouter = (app) => {
  setInterval(async () => {
    try {
      const newOrderList = await fetchOrderList();
      console.log(newOrderList);
      if (JSON.stringify(newOrderList) !== JSON.stringify(latestOrderList)) {
        latestOrderList = newOrderList;
        for (const ws of clients) {
          if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(latestOrderList));
          }
        }
      }
    } catch (e) {
      console.error('注文リスト取得エラー:', e);
    }
  }, 3000);

  app.ws('/ws/order-list', (ws, req) => {
    clients.add(ws);

    // 接続時に最新リストを即送信
    ws.send(JSON.stringify(latestOrderList));

    ws.on('close', () => {
      clients.delete(ws);
      console.log('WebSocket connection closed');
    });
  });
};

export default websocketRouter;