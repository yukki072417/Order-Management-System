import 'react';
import { Col, Row } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import './styles/Cart.css';
import { useEffect, useState } from 'react';
import type { Product } from '../type';

export default function CartCard() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
      console.log(JSON.parse(savedCart));
    }
  }, []);

  const confimOrder = () => {
    if(confirm('注文確定しますか?')){
      fetch('http://localhost:3000/order', {
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
        console.log('Success:', data);
        console.log(data);
        // location.assign('show-order')
        // localStorage.setItem('order-number', String(100));
      }).catch((error) => {
        console.error('Error:', error);
      });
      
    }
  }

  return (
    <>
      <Row xs={1} md={5} className="g-4">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem: Product, idx: number) => (
            <Col key={idx}>
              <Card key={idx} className='cart-contents' style={{ width: '13rem' }}>
                <Card.Body>
                  <Card.Title className='cart-titles'>{cartItem.name}</Card.Title>
                  <Card.Text className='cart-prices'>{cartItem.price}円</Card.Text>
                  <Card.Text className='cart-prices'>{cartItem.itemNum}個</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>カートに商品がありません。</p>
        )}
      </Row>
      
      <Button onClick={confimOrder} id='order-submit'>注文確定</Button>
    </>
  );
}