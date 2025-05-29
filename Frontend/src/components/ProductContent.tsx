import { Card, Button } from 'react-bootstrap'
import type { Product } from '../type'

interface ProductContentProps extends Product {
  addCart: () => void;
}

export default function ProductContent(props: ProductContentProps) {
  return (
    <>
      <Card style={{ width: '13rem' }}>
        <Card.Img variant="top" src="https://www.dummyimage.com/150x150/000/fff" />
        <Card.Body>
          <Card.Title className='product-titles'>{props.name}</Card.Title>
          <Card.Text  className='product-prices'>{props.price}円</Card.Text>
          <Card.Text  className='product-prices'>{props.itemNum}個</Card.Text>
          
          {/* <Card.Text  className='product-prices'>{props.addEgg}</Card.Text> */}
          {/* <Card.Text  className='product-prices'>{props.addBeef}</Card.Text> */}
          <Button className='add-cart' onClick={props.addCart} variant="primary">カートに追加</Button>
        </Card.Body>
      </Card>
    </>
  )
}