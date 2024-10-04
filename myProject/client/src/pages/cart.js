import React from "react";
import { Link } from "react-router-dom";

const QuantityControls = ({ item, uqdateQuantity }) => {
  const handleDecrease = () => {
    const newQuantity = Math.max(item.quantity - 1, 0); //確保 newQuantity 不會小於 0
    uqdateQuantity(item.id, newQuantity);
  };
  const handleIncrease = () => {
    const newQuantity = item.quantity + 1;
    uqdateQuantity(item.id, newQuantity);
  };
  return (
    <div className="quantity-controls">
      <button onClick={handleDecrease}>-</button>
      <span>{item.quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

const Cart = ({ cart, uqdateQuantity, totalAmount }) => {
  return (
    <div className="cart-container" style={{ minHeight: "100vh" }}>
      <div className="checkout-step">
        <div className="step active">1.購物車</div>
        <div className="step">2.填寫資料</div>
        <div className="step">3.訂單確認</div>
      </div>
      <h2>購物車</h2>
      {cart.length === 0 ? (
        <p>您的購物車是空的</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>商品</th>
                <th>顏色</th>
                <th>價格</th>
                <th>數量</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-details">
                      <div className="item-image">
                        <img src={item.images[0]} alt={item.name} />
                      </div>
                      <div className="item-name">
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.color}</td>
                  <td>${item.price}</td>
                  <td>
                    <QuantityControls
                      item={item}
                      uqdateQuantity={uqdateQuantity}
                    />
                  </td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total">
            <h3>總金額: ${totalAmount}</h3>
            <Link to="/checkout">
              <button>前往結帳</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
