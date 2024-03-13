// Home.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Modal from "react-modal";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsEye,
} from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aramaInput, setAramaInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:44343/api/urun/witurun");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (productId) => {
    const productIndex = cart.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const product = data.find((item) => item.urunID === productId);
      if (product) {
        const newCartItem = {
          id: product.urunID,
          name: product.baslik,
          price: product.fiyat,
          quantity: 1,
        };
        setCart([...cart, newCartItem]);
        console.log(`Ürün ID ${productId} sepete eklendi.`);
      }
    }
  };

  const openModal = (productId) => {
    const product = data.find((item) => item.urunID === productId);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <main className="main-container">
      <Header
        OpenSidebar={() => {}}
        cartState={cart}
        aramaInput={aramaInput}
        setAramaInput={setAramaInput}
      />
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>ÜRÜNLER</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>KATEGORİLER</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>12</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3> MÜŞTERİLER </h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>UYARILAR</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Başlık</th>
              <th>İçerik</th>
              <th>Fiyat</th>
              <th>Durum</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) =>
                item.baslik.toLowerCase().includes(aramaInput.toLowerCase())
              )
              .map((item) => (
                <tr key={item.urunID}>
                  <td>{item.urunID}</td>
                  <td>{item.baslik}</td>
                  <td>{item.icerik}</td>
                  <td>{item.fiyat}</td>
                  <td>{item.urundurum}</td>
                  <td>
                    <div className="viewProductBtn">
                      <button
                        className="addToCartBtn"
                        onClick={() => addToCart(item.urunID)}
                      >
                        Sepete Ekle
                      </button>
                      <button
                        className="imageBtn"
                        onClick={() => openModal(item.urunID)}
                      >
                        <BsEye size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Ürün Görseli Modal"
        >
          {selectedProduct && (
            <>
              <h3>{selectedProduct.baslik}</h3>
              <img src={selectedProduct.kapakresim} alt="Ürün Görseli" />
            </>
          )}

          <FontAwesomeIcon
            icon={faTimes}
            className="closeButton"
            onClick={closeModal}
          />
        </Modal>
      </div>
    </main>
  );
}

export default Home;
