import React, { useEffect, useState } from "react";
import axios from "axios";

const Member = ({ memberName }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/order/orders/${memberName}`
        );

        //重新排序，讓新的訂單放上面
        //將這兩個字串轉換成 JavaScript 的 Date 物件，這樣可以進行日期時間的比較
        const sortOrder = response.data.sort(
          (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
        );
        setOrders(sortOrder);
      } catch (e) {
        console.log(e);
      }
    };

    if (memberName) {
      fetchOrders();
    }
  }, [memberName]); //當member改變時，useEffect就會再執行一次

  return (
    <div style={{ minHeight: "100vh" }} className="memberPage">
      <div className="memberOrder">
        <h1>嗨，{memberName}</h1>
        <h2>歷史訂購紀錄</h2>
        {orders.length === 0 ? (
          <p>目前沒有訂單。</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order">
              <p>訂單編號: {order._id}</p>
              <p>訂單時間: {order.orderTime}</p>
              <p>總金額: ${order.totalAmount}</p>
              <section>
                <h3>顧客資料</h3>
                <p>姓名: {order.customerInfo.name}</p>
                <p>信箱: {order.customerInfo.email}</p>
              </section>
              <section>
                <h3>送貨資料</h3>
                <p>{order.shippingInfo}</p>
              </section>
              <section>
                <h3>付款資料</h3>
                <p>{order.paymentInfo}</p>
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
                    {order.cart.map((item) => (
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
              </section>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Member;
