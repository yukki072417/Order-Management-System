import "react";
import "./styles/OrderList.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const OrderList = () => {
  const URL = "http://localhost:3000/api/order-list";
  const [orders, setOrders] = useState<any[]>([]); // レスポンスデータを格納する状態

  useEffect(() => {
    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Network response was not ok", response.status, response.statusText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data); // レスポンスデータを状態に保存
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
      });
  }, []);
  
  const completeOrder = (targetOrder: any) => {

    const _data = {
      'ORDER_NUMBER': targetOrder.ORDER_NUMBER
    } 

    console.log(_data)
    // const URL = 'a'; 

    // if(confirm('注文完了していいですか?')){
    //   fetch(URL, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     // body: JSON
    //   })
    // }
  }

  return (
    <Row xs={1} md={4} className="g-4">
      {orders.map((order, index) => (
        <Col key={index}>
          <Card style={{ width: '14rem' }}>
            <Card.Body className="order-box">
              <Card.Title>注文番号: {order.ORDER_NUMBER}</Card.Title>
              <Card.Text>
                {order.ORDER_CONTENTS.map((item: any, idx: number) => (
                  <div className="order-content-box" key={idx}>
                    <div className="order-title">商品名: {item.PRODUCT_NAME}</div>
                    <div
                      style={{ color: item.ADD_EGG ? "red" : "inherit" }}
                    >
                      卵追加: {item.ADD_EGG ? "あり" : "なし"}
                    </div>
                    <div
                      style={{ color: item.ADD_BEEF ? "red" : "inherit" }}
                    >
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
