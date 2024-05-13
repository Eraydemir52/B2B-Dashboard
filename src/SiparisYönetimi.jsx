import React, { useEffect, useState } from "react";

const SiparisYonetimi = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const filteredOrders = []; // Filtrelenmiş siparişleri tutacak bir dizi oluştur

    // Local storage'daki tüm anahtarları al
    const keys = Object.keys(localStorage);

    // Anahtarları kontrol et ve 'cart_username' ile başlayanları işle
    keys.forEach((key) => {
      if (key.startsWith("cart_Eray52")) {
        const cartOrders = JSON.parse(localStorage.getItem(key)); // Sepet siparişlerini al
        cartOrders.forEach((order) => {
          filteredOrders.push({ ...order, username: key.split("_")[2] }); // Kullanıcı adına göre siparişleri diziye ekle
        });
      } else if (key.startsWith("orders_")) {
        const username = key.split("_")[1]; // Kullanıcı adını al
        const userOrders = JSON.parse(localStorage.getItem(key)); // Kullanıcının siparişlerini al
        userOrders.forEach((order) => {
          filteredOrders.push({ ...order, username }); // Kullanıcı adına göre siparişleri diziye ekle
        });
      }
    });

    setOrders(filteredOrders); // Filtrelenmiş siparişleri state'e ata
  }, []);

  return (
    <div className="order-management-container">
      <h2>Sipariş Yönetimi</h2>
      <table>
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Adet</th>
            <th>Fiyat</th>
            <th>Kullanıcı Adı</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.name}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SiparisYonetimi;
