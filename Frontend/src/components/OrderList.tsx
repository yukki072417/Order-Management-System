import 'react';
import './styles/OrderList.css';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const OrderList = () => {
  const WS_URL = `ws://${import.meta.env.VITE_PRIVATE_IP}:3000/ws/order-list`;
  const [orders, setOrders] = useState<any[]>([]);

  // WebSocketで受信したデータをstateに保存
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOrders(data); // ここでordersが更新され、即座に再レンダリングされる
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    return () => {
      ws.close();
    };
  }, [WS_URL]);

  const completeOrder = async (targetOrder: any) => {
    if (confirm('注文完了してよろしいですか？')) {
      const data = {
        ORDER_NUMBER: targetOrder.ORDER_NUMBER,
      };

      const URL = `http://${import.meta.env.VITE_PRIVATE_IP}:3000/api/complete-order/`;
      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          console.error('Network response was not ok', text);
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <Row xs={1} md={4} className='g-4'>
      {orders.map((order: any, index: number) => (
        <Col key={order.ORDER_NUMBER ?? index}>
          <Card style={{ width: "14rem" }}>
            <Card.Body className="order-box">
              <h4>注文番号: {order.ORDER_NUMBER}</h4>
              <Card.Text>
                {order.ORDER_CONTENTS.map((item: any, idx: number) => (
                  <div className="order-content-box" key={item.ID ?? idx}>
                    <div className="order-title"><h5>商品名: {item.PRODUCT_NAME}</h5></div>
                    <div><h6>数量: {item.PRODUCT_QUANTITY}</h6></div>
                    <div style={{ color: item.ADD_EGG ? "red" : "inherit" }}>
                      卵追加: {item.ADD_EGG ? "あり" : "なし"}
                    </div>
                    <div style={{ color: item.ADD_BEEF ? "red" : "inherit" }}>
                      肉追加: {item.ADD_BEEF ? "あり" : "なし"}
                    </div>
                    <div>注文時間: {item.ORDER_TIME}</div>
                  </div>
                ))}
              </Card.Text>
              <Button onClick={() => completeOrder(order)}>注文完了</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OrderList;
