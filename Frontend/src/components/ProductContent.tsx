import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import type { CartItems, Product } from "../type";

interface ProductContentProps extends Product {
  addCart: (product: CartItems) => void;
}

export default function ProductContent(props: ProductContentProps) {
  const [addEgg, setAddEgg] = useState<boolean>(false); // 修正
  const [addBeef, setAddBeef] = useState<boolean>(false); // 修正

  return (
    <>
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={`${props.imagePath}`} />
        <Card.Body>
          <h3 className="product-titles">{props.name}</h3>
          <Card.Text className="product-prices">{props.price}円 / {props.itemNum}個</Card.Text>
          {/* <Card.Text className="product-prices"></Card.Text> */}

          <Form>
            <h5>追加オプション</h5>
            <label className="labels">
              卵(+{props.options.AddEggPrice}円)
            </label>
            <Form.Check
              type="switch"
              id="add-egg-option"
              onChange={(e) => setAddEgg(e.target.checked)}
            />
            <label className="labels">
              お肉(+{props.options.AddBeefPrice}円)
            </label>
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
                price:
                  props.price +
                  (addEgg ? props.options.AddEggPrice : 0) +
                  (addBeef ? props.options.AddBeefPrice : 0),
                itemNum: props.itemNum,
                addBeef: addBeef,
                addEgg: addEgg,
                addEggPrice: addEgg ? props.options.AddEggPrice : 0,
                addBeefPrice: addBeef ? props.options.AddBeefPrice : 0,
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
