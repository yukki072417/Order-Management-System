import { Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import type { CartItems, Product } from '../type';

interface ProductContentProps extends Product {
  addCart: (product: CartItems) => void;
}

export default function ProductContent(props: ProductContentProps) {
  const [addEgg, setAddEgg] = useState<Boolean>(false);
  const [addBeef, setAddBeef] = useState<Boolean>(false);

  return (
    <>
      <Card style={{ width: '15rem' }}>
        <Card.Img variant="top" src={`${props.imagePath}`} />
        {/* <Card.Img variant="top" src="https://" /> */}
        <Card.Body>
          <Card.Title className="product-titles">{props.name}</Card.Title>
          <Card.Text className="product-prices">{props.price}円</Card.Text>
          <Card.Text className="product-prices">{props.itemNum}個</Card.Text>

          <Form>
            <label className="labels">卵を追加(+100円)</label>
            <Form.Check
              type="switch"
              id="add-egg-option"
              onChange={(e) => {setAddEgg(e.target.checked)}}
            />
            <label className="labels">お肉を追加(+100円)</label>
            <Form.Check
              type="switch"
              id="add-beef-option"
              onChange={(e) => setAddBeef(e.target.checked)}
            />
          </Form>

          <Button
            className="add-cart"
            onClick={() =>
              props.addCart({
                name: props.name,
                price: props.price,
                itemNum: props.itemNum,
                addBeef: addBeef,
                addEgg: addEgg,
              })
            }
            variant="primary"
          >
            カートに追加
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}