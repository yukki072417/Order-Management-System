import "react";
import "./styles/OrderList.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const OrderList = () => {
  const URL = "ws://localhost:3000/ws/order-list";
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket(URL);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOrders(data); // 受信データをセット
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const completeOrder = (targetOrder: any) => {

    if(confirm('注文完了してよろしいですか？')){
      const _data = {
        ORDER_NUMBER: targetOrder.ORDER_NUMBER,
      };
      console.log(_data);
    }
  };

  return (
    <Row xs={1} md={4} className="g-4">
      {orders.map((order, index) => (
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
