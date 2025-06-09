import 'react';
import { Col, Row } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import './styles/Cart.css';
import { useEffect, useState } from 'react';
import type { CartItems } from '../type';
import 'dotenv'

export default function CartCard() {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const URL = 'http://localhost:3000/api/order'

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart !== null) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const confimOrder = () => {

    let datas: any[] = []
    cartItems.map(data => {
      const content: CartItems = data;
      const body = {
        NAME: content.name,
        PRICE: content.price,
        ITEM_QUANTITY: content.itemNum,
        ADD_EGG: content.addEgg,
        ADD_BEEF: content.addBeef
      }
      datas.push(body);
    });

      if(confirm('注文確定しますか?')){
        fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_X_API_KEY
          },
          body: JSON.stringify(datas),
        })
        .then((response) => {
          if (!response.ok) {
            console.error('Network response was not ok');
            throw new Error('Network response was not ok');
          }
          return response.json();
        }).then((data) => {
          if(data.RESULT == 'SUCCESS'){
            localStorage.clear();
            return location.assign('/products');
          }
        }).catch((error) => {
          console.error('Error:', JSON.stringify(error));
        });
    }
  };

  const deleteCartItem = (cartItem: CartItems) => {
    const savedCart = localStorage.getItem('cart');
    let localStrageContent: CartItems[] = [];
    if (savedCart !== null) localStrageContent = JSON.parse(savedCart);

    // 条件に合うものを除外
    const newCart = localStrageContent.filter(
      content =>
        !(
          content.name === cartItem.name &&
          content.addEgg === cartItem.addEgg &&
          content.addBeef === cartItem.addBeef
        )
    );

    // localStorageとstateを更新
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
  }

  return (
    <>
      <Row xs={1} md={5} className='g-4'>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem: CartItems, idx: number) => (
            <Col key={idx}>
              <Card key={idx} className='cart-contents' style={{ width: '13rem' }}>
                <Card.Body>
                  <Card.Title className='cart-titles'>{cartItem.name}</Card.Title>
                  <Card.Text className='cart-prices'>{cartItem.price}円</Card.Text>
                  <Card.Text className='cart-prices'>{cartItem.itemNum}個</Card.Text>
                  {cartItem.addEgg && <Card.Text>卵追加 (+100円)</Card.Text>}
                  {cartItem.addBeef && <Card.Text>お肉追加 (+100円)</Card.Text>}
                  <Button variant='danger' onClick={() => deleteCartItem(cartItem)}>削除</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>カートに商品がありません。</p>
        )}
      </Row>

      <Button onClick={confimOrder} id='order-submit'>
        注文確定
      </Button>
    </>
  );
}