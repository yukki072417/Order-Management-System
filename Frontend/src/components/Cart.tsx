import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import type { CartItems } from '../type';
import './styles/Cart.css'

export default function CartCard() {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const URL = `http://${import.meta.env.VITE_PRIVATE_IP}:3000/api/order`;

  // ページを読み込んだ時に、ローカルストレージのcartを読み込む
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart !== null) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // カート内の商品を削除する処理
  const deleteCartItem = (cartItem: CartItems) => {
    const updatedCart = cartItems.filter((item) => item !== cartItem);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // 合計金額を計算する関数
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.itemNum, 0);
  };

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
                  {cartItem.addEgg && <Card.Text>卵追加 (+{cartItem.addEggPrice}円)</Card.Text>}
                  {cartItem.addBeef && <Card.Text>お肉追加 (+{cartItem.addBeefPrice}円)</Card.Text>}
                  <Button variant='danger' onClick={() => deleteCartItem(cartItem)}>削除</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>カートが空です</p>
        )}
      </Row>
      {/* 合計金額を表示 */}
      <div className="total-price">
        <h3>合計金額: {calculateTotalPrice()}円</h3>
      </div>
    </>
  );
}