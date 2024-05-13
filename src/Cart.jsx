import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Kullanıcı adını local storage'dan al
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    // Kullanıcı adı varsa, ilgili kullanıcının sepet verilerini local storage'dan al
    if (storedUsername) {
      const userCart = JSON.parse(
        localStorage.getItem(`cart_${storedUsername}`)
      );
      if (userCart) {
        setCartItems(userCart);
      }
    }
  }, []);

  const handleSendOrder = () => {
    // Sepet ve kullanıcı adını local storage'a kaydet
    localStorage.setItem(`cart_${username}`, JSON.stringify(cartItems));
    localStorage.setItem("order_username", username);
    alert("Sipariş başarıyla gönderildi.");
  };

  return (
    <div className="cart-container">
      <h2>Sepetim</h2>
      <table>
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Adet</th>
            <th>Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSendOrder}>Siparişi Gönder</button>
    </div>
  );
};

export default Cart;
