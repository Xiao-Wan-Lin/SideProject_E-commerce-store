import React from "react";
import { Badge, Space } from "antd";

//itemCount = cart.length
const CartIcon = ({ itemCount }) => (
  <Space size="middle">
    <Badge count={itemCount}>
      <img src={require("../picture/tote-bag.png")} alt="bag" />
    </Badge>
  </Space>
);

export default CartIcon;
