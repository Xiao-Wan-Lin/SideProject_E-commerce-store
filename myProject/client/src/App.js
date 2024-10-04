import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Allproducts from "./components/Allproducts";
import ProductGrid from "./pages/ProductGrid";
import Nav from "./components/nav-component";
import Login from "./pages/login";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/register";
import Member from "./pages/member";
import Cart from "./pages/cart";
import useCart from "./components/useCart";
import Checkout from "./pages/checkout";
import OrderSummary from "./pages/orderSummary";

import "./styles/style.css";

function App() {
  const [currentCategory, setCurrentCategory] = useState("all"); //用於nav產品分類

  const [memberName, setMemberName] = useState("");

  const [cart, setCart] = useState([]);

  // 通過傳遞 cart 和 setCart 到 useCart 來使用它，並將 addToCart函數提出使用
  //addToCart是將商品新增到購物車
  //並透過設置setCart來更新Cart
  const { addToCart } = useCart(cart, setCart);

  const [orderInfo, setOrderInfo] = useState(null);

  const filterProducts = (category) => {
    setCurrentCategory(category);
  };

  //購物車中更新商品數量
  const uqdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === itemId) {
          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          } else {
            return null; //數量為0時返回null，以便在下一步過濾掉
          }
        }
        return item;
      })
      .filter((item) => item !== null); //過濾掉為null的商品
    setCart(updatedCart);
  };

  // 計算購物車中商品的總金額，reduce對陣列中的每個元素進行累積操作(acc累加器)
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <Nav
        filterProducts={filterProducts}
        memberName={memberName}
        itemCount={cart.length}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProductGrid
              products={Allproducts}
              currentCategory={currentCategory}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setMemberName={setMemberName} />}
        />
        <Route path="/register" element={<Register />} />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              uqdateQuantity={uqdateQuantity}
              totalAmount={totalAmount}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={<ProductDetail addToCart={addToCart} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} setOrderInfo={setOrderInfo} />}
        />
        <Route
          path="/orderSummary"
          element={
            <OrderSummary
              orderInfo={orderInfo}
              totalAmount={totalAmount}
              memberName={memberName}
              setCart={setCart}
            />
          }
        />
        <Route path="/member" element={<Member memberName={memberName} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
