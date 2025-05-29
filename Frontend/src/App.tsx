import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import type { Product } from "./type.ts";
import Products from "./components/Product.tsx";
import Cart from "./components/Cart.tsx";
import ShowNumber from "./components/ShowNumber.tsx";

export default function App() {
  const productItems: Product[] = [
    { name: "商品A", price: 100, itemNum: 1, imagePath: null, addEgg: false, addBeef: false },
    { name: "商品B", price: 300, itemNum: 1, imagePath: null, addEgg: false, addBeef: false },
    { name: "商品C", price: 500, itemNum: 1, imagePath: null, addEgg: false, addBeef: false },
    { name: "商品D", price: 700, itemNum: 1, imagePath: null, addEgg: false, addBeef: false },
    { name: "商品E", price: 1000, itemNum: 1, imagePath: null, addEgg: false, addBeef: false },
  ];

  const [cartContent, setCartContent] = useState<Product[]>([]);
  const CartContext: any = createContext(cartContent);

  const addCart = (product: Product) => {
    // 既存のカートをコピー
    const updatedCart = [...cartContent];

    // 同じ name の商品を探す
    const existingProduct = updatedCart.find(
      (item) => item.name === product.name
    );

    if (existingProduct) {
      // 既存商品の itemNum を増やす
      existingProduct.itemNum += product.itemNum;
    } else {
      // 新しい商品を追加
      updatedCart.push(product);
    }

    // 更新されたカートを状態に保存
    setCartContent(updatedCart);

    // 確認してから LocalStorage に保存
    if (confirm("カートに追加しますか?")) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartContent(JSON.parse(savedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartContent, addCart }}>
      <Router>
        <Routes>
          <Route
            index
            path="/products"
            element={<Products products={productItems} addCart={addCart} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/show-order" element={<ShowNumber />} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
}