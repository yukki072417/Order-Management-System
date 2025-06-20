import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import type { CartItems } from "./type.ts";
import Products from "./components/Product.tsx";
import Cart from "./components/Cart.tsx";
import OrderList from "./components/OrderList.tsx";
import OrderChart from "./components/Chart.tsx";
import productItems from "../configs/products.json";
import 'dotenv';

export default function App() {
  const [cartContent, setCartContent] = useState<CartItems[]>([]);
  const CartContext: any = createContext(cartContent);

  const addCart = (cartItems: CartItems) => {
    // 既存のカートをコピー
    const updatedCart = [...cartContent];
  
    // 同じ name の商品を探す（addEgg と addBeef も含めて判定）
    const existingProduct = updatedCart.find(
      (item) =>
        item.addEgg === cartItems.addEgg &&
        item.name === cartItems.name &&
        item.addBeef === cartItems.addBeef
    );
  
    // 既存商品が存在したときにitemNum を増やす
    if (existingProduct) {
      existingProduct.itemNum += cartItems.itemNum;
    } else {
      updatedCart.push(cartItems); // オプション価格はすでに加算済み
    }
  
    // 更新されたカートを状態に保存
    setCartContent(updatedCart);
  
    // 確認してから LocalStorage に保存
    if (confirm("カートに追加しますか?")) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // ページを開いたとき、ローカルストレージのcartを取得
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
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/order-chart" element={<OrderChart />} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
}