import express from 'express';

const websocketRouter = (app) => {
  app.ws('/ws/order-list', (ws, req) => {
    ws.on('message', (msg) => {
      console.log('Received:', msg);
      ws.send(`Echo: ${msg}`);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
};

export default websocketRouter;