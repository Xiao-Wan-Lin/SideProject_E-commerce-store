import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, currentCategory }) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="product-grid">
        {products
          .filter(
            (product) =>
              currentCategory === "all" || product.category === currentCategory
          )
          .map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className="productImg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
              </Link>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;
