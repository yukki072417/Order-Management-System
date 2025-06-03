import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import type { CartItems, Product } from "./type.ts";
import Products from "./components/Product.tsx";
import Cart from "./components/Cart.tsx";
import OrderList from "./components/OrderList.tsx";

export default function App() {
  const productItems: Product[] = [
    { name: "商品A", price: 100, itemNum: 1, imagePath: null },
    { name: "商品B", price: 300, itemNum: 1, imagePath: null },
    { name: "商品C", price: 500, itemNum: 1, imagePath: null },
    { name: "商品D", price: 700, itemNum: 1, imagePath: null },
    { name: "商品E", price: 1000, itemNum: 1, imagePath: null },
  ];

  const [cartContent, setCartContent] = useState<CartItems[]>([]);
  const CartContext: any = createContext(cartContent);

  const addCart = (cartItems: CartItems) => {
    // 既存のカートをコピー
    const updatedCart = [...cartContent];

    // 同じ name の商品を探す（addEgg と addBeef も含めて判定）
    const existingProduct = updatedCart.find(
      (item) =>
        item.addEgg  === cartItems.addEgg &&
        item.name    === cartItems.name &&
        item.addBeef === cartItems.addBeef
    );

    if (existingProduct) {
      
      // 既存商品の itemNum を増やす
      existingProduct.itemNum += cartItems.itemNum;
    } else {

      if(cartItems.addEgg == true)  cartItems.price += 100
      if(cartItems.addBeef == true) cartItems.price += 100
      // 新しい商品を追加
      updatedCart.push(cartItems);
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
          <Route path="/order-list" element={<OrderList />} />
        </Routes>
      </Router>
    </CartContext.Provider>
  );
}