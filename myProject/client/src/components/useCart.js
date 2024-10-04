//自訂義hook，將購物車的狀態和操作裝在一起，使它們可以在其他組件中使用

const useCart = (cart, setCart) => {
  const addToCart = (product, quantity, color) => {
    //prevCart當前購物車狀態
    setCart((prevCart) => {
      //檢查當前購物車中是否有一樣顏色的商品
      //有的回傳true存進existingProduct
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.color === color
      );
      //如果購物車已經有此商品(existingProduct == true)
      //也就是加同樣的商品進購物車，所以要更新數量
      //...item展開運算符(該對象包含item的所有屬性，但 quantity 屬性被更新)
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          //保留原本購物車的東西，並在陣列中新增新的物件
          ...prevCart,
          {
            ...product,
            quantity: quantity,
            color: color,
          },
        ];
      }
    });
  };
  return { addToCart };
};

export default useCart;
