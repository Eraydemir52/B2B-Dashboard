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

function Header({ OpenSidebar, cartState, aramaInput, setAramaInput }) {
  const [sepetMenuAcik, setSepetMenuAcik] = useState(false);
  const sepetRef = useRef(null);
  const [inputAcik, setInputAcik] = useState(false);

  const cikisYap = async () => {
    // Çıkış işlemleri
  };

  const iconaTikla = () => {
    setInputAcik(!inputAcik);
  };

  const sepetMenuToggle = () => {
    setSepetMenuAcik(!sepetMenuAcik);
  };

  const sepetMenuKapat = (event) => {
    if (sepetRef.current && !sepetRef.current.contains(event.target)) {
      setSepetMenuAcik(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", sepetMenuKapat);
    return () => {
      document.removeEventListener("mousedown", sepetMenuKapat);
    };
  }, []);

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="icon" onClick={iconaTikla}>
        <BsSearch />
      </div>
      {inputAcik && (
        <input
          type="text"
          placeholder="Ürün arama"
          className="inputSearch"
          value={aramaInput}
          onChange={(e) => setAramaInput(e.target.value)}
        />
      )}
      <div className="header-right">
        <div className="header-link">
          <a className="cart-icon-container" onClick={sepetMenuToggle}>
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
              <LogoutButton onLogout={cikisYap} />
            </div>
          </div>
        </div>
        {sepetMenuAcik && (
          <div ref={sepetRef} className="cart-menu">
            <CartMenu
              cartItems={cartState}
              closeCartMenu={() => setSepetMenuAcik(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
