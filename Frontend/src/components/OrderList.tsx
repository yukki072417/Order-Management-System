import 'react';
import './styles/OrderList.css';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const OrderList = () => {
  const WS_URL = `ws://${import.meta.env.VITE_PRIVATE_IP}:3000/ws/order-list`;
  const [orders, setOrders] = useState<any[]>([]);

  // WebSocketで受信したデータをlocalStorageとstateに保存
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // データが異なる場合のみ更新
      if (JSON.stringify(data) !== localStorage.getItem('orders')) {
        setOrders(data);
        localStorage.setItem('orders', JSON.stringify(data));
      }
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    return () => {
      ws.close();
    };
  }, []);

  // localStorageからデータを取得してstateに反映（リロード時用）
  useEffect(() => {
    const saved = localStorage.getItem('orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }

  }, []);

  const completeOrder = async (targetOrder: any) => {
    if (confirm('注文完了してよろしいですか？')) {
      const data = {
        ORDER_NUMBER: targetOrder.ORDER_NUMBER,
      };

      const URL = 'http://localhost:3000/api/complete-order/';
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
        <Col key={index}>
          <Card style={{ width: "14rem" }}>
            <Card.Body className="order-box">
              <Card.Title>注文番号: {order.ORDER_NUMBER}</Card.Title>
              <Card.Text>
                {order.ORDER_CONTENTS.map((item: any, idx: number) => (
                  <div className="order-content-box" key={idx}>
                    <div className="order-title">商品名: {item.PRODUCT_NAME}</div>
                    <div>注文時間: {item.ORDER_TIME}</div>
                    <div>数量: {item.PRODUCT_QUANTITY}</div>
                    <div style={{ color: item.ADD_EGG ? "red" : "inherit" }}>
                      卵追加: {item.ADD_EGG ? "あり" : "なし"}
                    </div>
                    <div style={{ color: item.ADD_BEEF ? "red" : "inherit" }}>
                      肉追加: {item.ADD_BEEF ? "あり" : "なし"}
                    </div>
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
