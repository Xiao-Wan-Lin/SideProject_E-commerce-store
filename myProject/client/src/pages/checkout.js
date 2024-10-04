import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = ({ cart, setOrderInfo }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
  });

  const [shippingInfo, setShippInfo] = useState({
    delivery: "宅配",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    payment: "信用卡",
  });

  const navigate = useNavigate();

  const handleCustomerInfoChange = (e) => {
    //這裡的name是抓到input name的值(會是name or mail)
    //將抓到的該值設定成customerInfo
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderInfo = { customerInfo, shippingInfo, paymentInfo, cart };
    setOrderInfo(orderInfo);
    navigate("/orderSummary");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-step">
        <div className="step">1.購物車</div>
        <div className="step active">2.填寫資料</div>
        <div className="step">3.訂單確認</div>
      </div>
      <div className="form-container">
        <h2>填寫資料</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <h3>顧客資料</h3>
            <label>
              姓名:
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                required
              />
            </label>
            <label>
              信箱:
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
                required
              />
            </label>
          </section>
          <section>
            <h3>送貨資料</h3>
            <label>
              <input
                type="radio"
                name="delivery"
                value="宅配"
                checked={shippingInfo.delivery === "宅配"}
                onChange={handleShippingInfoChange}
              />
              宅配
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="711取貨"
                checked={shippingInfo.delivery === "711取貨"}
                onChange={handleShippingInfoChange}
              />
              711取貨
            </label>
          </section>
          <section>
            <h3>付款資料</h3>
            <label>
              <input
                type="radio"
                name="payment"
                value="信用卡"
                checked={paymentInfo.payment === "信用卡"}
                onChange={handlePaymentInfoChange}
              />
              信用卡
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="貨到付款"
                checked={paymentInfo.payment === "貨到付款"}
                onChange={handlePaymentInfoChange}
              />
              信貨到付款
            </label>
          </section>
          <Link to="/cart">
            <button>回到購物車</button>
          </Link>
          <button onClick={handleSubmit}>訂單提交</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
