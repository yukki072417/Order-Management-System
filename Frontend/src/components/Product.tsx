import 'react';
import './styles/Products.css';
import type { Product, CartItems } from '../type';
import { Col, Row } from 'react-bootstrap';
import ProductContent from './ProductContent';

interface ProductProps {
  products: Product[];
  addCart: (product: CartItems) => void;
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
              addCart={addCart} // 修正: 直接渡す
            />
          </Col>
        ))}
      </Row>
    </>
  );
}