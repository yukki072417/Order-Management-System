import 'react';
import './styles/Products.css';
import type { Product } from '../type';
import { Col, Row } from 'react-bootstrap';
import ProductContent from './ProductContent';

// ...existing code...
interface ProductProps {
  products: Product[];
  addCart: (product: Product) => void;
}

export default function Product({ products, addCart }: ProductProps) {
  return (
    <>
      <Row xs={1} md={5} className="g-4">
        {products.map((item: Product, index: number) => (
          <Col key={index}>
            <ProductContent
              imagePath={item.imagePath}
              name={item.name} 
              price={item.price} 
              itemNum={item.itemNum} 
              addEgg={item.addEgg} 
              addBeef={item.addBeef} 
              addCart={() => addCart(item)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
// ...existing code...