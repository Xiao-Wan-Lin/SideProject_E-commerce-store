import React from "react";
import { useParams } from "react-router-dom";
import products from "../components/Allproducts";
import { useState } from "react";

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams(); //從網址抓到productID
  const product = products.find((p) => p.id == productId); //在Allproducts中找到等於productId的商品

  //顏色
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : null
  );

  //數量
  const [quantity, setQuantity] = useState(1);

  //照片輪換的index
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  //餘數概念操控圖片變換 前一張圖片後一張圖片
  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(
      (nextIndex) => (nextIndex + 1) % product.images.length
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    alert(`已經${quantity}個${selectedColor} ${product.name} 加入購物車`);
  };

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <div className="product-images">
        <button className="prev-button" onClick={handlePrevImage}>
          &lt;
        </button>
        <img
          src={product.images[selectedImageIndex]}
          alt={product.name}
          className="product-image"
        />
        <button className="next-button" onClick={handleNextImage}>
          &gt;
        </button>
      </div>
      <h2>$ {product.price}</h2>

      {product.colors && (
        <div className="product-colors">
          <h3>顏色:</h3>
          {/* 依照product中該商品有幾個顏色做出幾個按鈕 */}
          {/* 如果color的按鈕有被選的話，加上在className加上selected的字
        這樣可以另外設定被選中的css樣式 */}
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`color-button ${
                selectedColor == color ? "selected" : ""
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      )}

      <div className="quantity-selector">
        <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        加入購物車
      </button>
    </div>
  );
};

export default ProductDetail;
