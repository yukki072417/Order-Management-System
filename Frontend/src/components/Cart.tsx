import 'react';
import { Col, Row } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import './styles/Cart.css';
import { useEffect, useState } from 'react';
import type { CartItems } from '../type';

export default function CartCard() {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const URL = "http://localhost:3000/api/order"

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const confimOrder = () => {

      if(confirm('注文確定しますか?')){
        fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItems),
        })
        .then((response) => {
          if (!response.ok) {
            console.error('Network response was not ok');
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then((data) => {
          if(data.RESULT == 'SUCCESS') return location.assign('/products');
        }).catch((error) => {
          console.error('Error:', JSON.stringify(error));
        });
      
    }
    console.log(cartItems);
  };

  return (
    <>
      <Row xs={1} md={5} className="g-4">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem: CartItems, idx: number) => (
            <Col key={idx}>
              <Card key={idx} className="cart-contents" style={{ width: '13rem' }}>
                <Card.Body>
                  <Card.Title className="cart-titles">{cartItem.name}</Card.Title>
                  <Card.Text className="cart-prices">{cartItem.price}円</Card.Text>
                  <Card.Text className="cart-prices">{cartItem.itemNum}個</Card.Text>
                  {cartItem.addEgg && <Card.Text>卵追加 (+100円)</Card.Text>}
                  {cartItem.addBeef && <Card.Text>お肉追加 (+100円)</Card.Text>}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>カートに商品がありません。</p>
        )}
      </Row>

      <Button onClick={confimOrder} id="order-submit">
        注文確定
      </Button>
    </>
  );
}