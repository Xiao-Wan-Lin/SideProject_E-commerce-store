const router = require("express").Router();
const Order = require("../models/").order;

//訂單提交
router.post("/submit_order", async (req, res) => {
  const {
    customerInfo,
    shippingInfo,
    paymentInfo,
    cart,
    totalAmount,
    orderTime,
    memberName,
  } = req.body;
  try {
    const newOrder = new Order({
      customerInfo,
      shippingInfo,
      paymentInfo,
      cart,
      totalAmount,
      orderTime,
      memberName,
    });
    let savedOrder = await newOrder.save();
    return res.status(200).send({
      msg: "order saved",
      savedOrder,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("伺服器錯誤，無法提交訂單");
  }
});

//取得會員的歷史訂單
router.get("/orders/:memberName", async (req, res) => {
  const { memberName } = req.params;
  try {
    const order = await Order.find({ memberName });
    return res.send(order);
  } catch (e) {
    return res.status(500).send("伺服器錯誤，無法查詢歷史訂單");
  }
});

module.exports = router;
