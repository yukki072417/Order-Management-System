import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import type { CartItems } from '../type';
import './styles/Cart.css'

export default function CartCard() {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  //　プライベートIPアドレスを環境変数から取得
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

    // 注文確定時の処理
    const confirmOrder = () => {

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
          // 注文確定時、バックエンドに注文データを送信
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
            }else if(response.status == 200){
              localStorage.clear();
              return location.assign('/products');
            }
            return response.json();
          }).catch((error) => {
            console.error('Error:', JSON.stringify(error));
          });
      }
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
      {/* 注文確定ボタンを追加 */}
              {cartItems.length > 0 && (
        <div className="confirm-order">
          <Button variant="success" onClick={() => confirmOrder()}>
            注文を確定する
          </Button>
        </div>
      )}
      {/* 合計金額を表示 */}
      <div className="total-price">
        <h3>合計金額: {calculateTotalPrice()}円</h3>
      </div>
    </>
  );
}








// import 'react';
// import { Col, Row } from 'react-bootstrap';
// import { Card, Button } from 'react-bootstrap';
// import './styles/Cart.css';
// import { useEffect, useState } from 'react';
// import type { CartItems } from '../type';
// import 'dotenv'

// export default function CartCard() {
//   const [cartItems, setCartItems] = useState<CartItems[]>([]);
//   const URL = `http://${import.meta.env.VITE_PRIVATE_IP}:3000/api/order`

//   // ページを読み込んだ時に、ローカルストレージのcartを読み込む
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart !== null) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);


//   // カート内の商品を削除する処理
//   const deleteCartItem = (cartItem: CartItems) => {
//     const savedCart = localStorage.getItem('cart');
//     let localStrageContent: CartItems[] = [];
//     if (savedCart !== null) localStrageContent = JSON.parse(savedCart);

//     // 条件に合うものを除外
//     const newCart = localStrageContent.filter(
//       content =>
//         !(
//           content.name === cartItem.name &&
//           content.addEgg === cartItem.addEgg &&
//           content.addBeef === cartItem.addBeef
//         )
//     );

//     // ローカルストレージと状態(state)を更新
//     localStorage.setItem('cart', JSON.stringify(newCart));
//     setCartItems(newCart);
//   }

//   return (
//     <>
//       <Row xs={1} md={5} className='g-4'>
//         {cartItems.length > 0 ? (
//           cartItems.map((cartItem: CartItems, idx: number) => (
//             <Col key={idx}>
//               <Card key={idx} className='cart-contents' style={{ width: '13rem' }}>
//                 <Card.Body>
//                   <Card.Title className='cart-titles'>{cartItem.name}</Card.Title>
//                   <Card.Text className='cart-prices'>{cartItem.price}円</Card.Text>
//                   <Card.Text className='cart-prices'>{cartItem.itemNum}個</Card.Text>
//                   {cartItem.addEgg && <Card.Text>卵追加 (+100円)</Card.Text>}
//                   {cartItem.addBeef && <Card.Text>お肉追加 (+100円)</Card.Text>}
//                   <Button variant='danger' onClick={() => deleteCartItem(cartItem)}>削除</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <p>カートに商品がありません。</p>
//         )}
//       </Row>

//       <Button onClick={confimOrder} id='order-submit'>
//         注文確定
//       </Button>
//     </>
//   );
// }