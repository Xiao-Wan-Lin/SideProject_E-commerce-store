import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderSummary = ({ orderInfo, totalAmount, memberName, setCart }) => {
  const navigate = useNavigate();

  if (!orderInfo) {
    return <p>沒有訂單資料</p>;
  }

  const handleOrderConfirmation = async () => {
    const now = new Date();

    //生成資料庫可以使用的日期及時間格式
    const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const orderTime = `${currentDate} ${currentTime}`;

    try {
      const response = await axios.post(
        "http://localhost:8080/order/submit_order",
        {
          customerInfo: orderInfo.customerInfo,
          shippingInfo: orderInfo.shippingInfo.delivery,
          paymentInfo: orderInfo.paymentInfo.payment,
          cart: orderInfo.cart,
          totalAmount: totalAmount,
          orderTime: orderTime,
          memberName: memberName,
        }
      );
      if (response.status === 200) {
        setCart([]); //清空購物車
        navigate("/");
        alert("訂單已送出，謝謝您的訂購");
      } else {
        alert("發生錯誤，請稍後再嘗試");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="orderSummaryContainer">
      <div className="checkout-step">
        <div className="step">1.購物車</div>
        <div className="step">2.填寫資料</div>
        <div className="step active">3.訂單確認</div>
      </div>
      <div className="order">
        <h2>訂單確認</h2>
        <section>
          <h3>顧客資料</h3>
          <p>姓名: {orderInfo.customerInfo.name}</p>
          <p>信箱: {orderInfo.customerInfo.email}</p>
        </section>
        <section>
          <h3>送貨資料</h3>
          <p>{orderInfo.shippingInfo.delivery}</p>
        </section>
        <section>
          <h3>付款資料</h3>
          <p>{orderInfo.paymentInfo.payment}</p>
        </section>
        <section>
          <h3>購買商品</h3>
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
              {orderInfo.cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-details">
                      <div className="item-name">
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.color}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>總金額: ${totalAmount}</h4>
        </section>
        <button onClick={handleOrderConfirmation}>訂單送出</button>
      </div>
    </div>
  );
};

export default OrderSummary;
