// Header.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  BsCart3,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import CartMenu from "./CartMenu";
import LogoutButton from "./LogoutButton";

function Header({ OpenSidebar, cartState }) {
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
  const cartRef = useRef(null);

  const handleLogout = async () => {
    try {
      // Çıkış işlemlerini gerçekleştir
      console.log("Çıkış işlemi gerçekleşti");

      // HTTP isteği gönder
      const response = await fetch("http://localhost:5173/", {
        method: "GET", // veya "POST" vb.
        headers: {
          // İsteğe özel başlıkları ekleyebilirsiniz
          "Content-Type": "application/json",
          // Diğer gerekli başlıkları da ekleyebilirsiniz
        },
        // Ekstra seçenekleri burada belirleyebilirsiniz
      });

      // İsteğin başarılı olup olmadığını kontrol et
      if (response.ok) {
        console.log("İstek başarılı");
        // İstek başarılıysa sayfayı yeniden yükle
        window.location.reload();
      } else {
        console.error("İstek başarısız");
      }
    } catch (error) {
      console.error("Bir hata oluştu", error);
    }
  };

  const toggleCartMenu = () => {
    setIsCartMenuOpen(!isCartMenuOpen);
  };

  const closeCartMenu = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeCartMenu);
    return () => {
      document.removeEventListener("mousedown", closeCartMenu);
    };
  }, []);

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <div className="header-link">
          <a className="cart-icon-container" onClick={toggleCartMenu}>
            {cartState && Array.isArray(cartState) && cartState.length > 0 && (
              <span className="cart-count">{cartState.length}</span>
            )}
            <BsCart3 className="icon_header icon-space" />
          </a>
          <a href="#" className="header-link">
            <BsFillEnvelopeFill className="icon icon-space" />
          </a>
          <div className="header-link">
            <BsPersonCircle className="icon icon-space" />
            <div>
              <LogoutButton onLogout={handleLogout} />
            </div>
          </div>
        </div>
        {isCartMenuOpen && (
          <div ref={cartRef} className="cart-menu">
            <CartMenu
              cartItems={cartState}
              closeCartMenu={() => setIsCartMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
