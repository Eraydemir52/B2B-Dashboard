import React, { useState, useEffect } from "react";

const SiparisYonetimi = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersData = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(ordersData);
  }, []);

  // Her kullanıcı için toplam fiyatı hesapla
  const calculateTotalPriceByUsername = (username) => {
    let totalPrice = 0;
    orders.forEach((order) => {
      if (order.username === username) {
        order.cartItems.forEach((item) => {
          totalPrice += item.quantity * item.price;
        });
      }
    });
    return totalPrice;
  };

  useEffect(() => {
    // Tüm kullanıcıların toplam fiyatlarını hesapla ve localStorage'a kaydet
    const totalPrices = {};
    orders.forEach((order) => {
      const username = order.username;
      if (!totalPrices.hasOwnProperty(username)) {
        totalPrices[username] = calculateTotalPriceByUsername(username);
      }
    });
    localStorage.setItem("totalPrices", JSON.stringify(totalPrices));
  }, [orders]);

  return (
    <div>
      <h1>Sipariş Yönetimi</h1>
      <table>
        <thead>
          <tr>
            <th>Sipariş ID</th>
            <th>Ürün Adı</th>
            <th>Miktar</th>
            <th>Fiyat</th>
            <th>Toplam Fiyat</th>
            <th>Sipariş Tarihi</th>
            <th>Kullanıcı Adı</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) =>
            order.cartItems.map((item, itemIndex) => (
              <tr key={index + "-" + itemIndex}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
                <td>{order.orderDate}</td>
                <td>{order.username}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Her kullanıcı için toplam fiyatları göster */}
      <div>
        {Array.from(new Set(orders.map((order) => order.username))).map(
          (username, index) => (
            <p key={index}>
              {username}: {calculateTotalPriceByUsername(username)} TL
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default SiparisYonetimi;
