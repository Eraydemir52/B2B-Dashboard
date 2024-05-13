import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UrunListesi.css";

const UrunListesi = ({ urunler }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ürün ID</th>
          <th>Kategori ID</th>
          <th>Başlık</th>
          <th>Özellik</th>
          <th>İçerik</th>
          <th>Kapak Resim</th>
          <th>Banner Resim</th>
          <th>Fiyat</th>
          <th>Ürün Kodu</th>
          <th>Ürün Stok</th>
          <th>Admin Koyw</th>
          <th>Admin Key Desc</th>
          <th>Ürün Tarihi</th>
          <th>Ürün Ekleyen</th>
          <th>Ürün Durum</th>
          <th>Üretici ID</th>
          <th>Resim ID</th>
        </tr>
      </thead>
      <tbody>
        {urunler.map((urun) => (
          <tr key={urun.urunID}>
            <td>{urun.urunID}</td>
            <td>{urun.kategoriID}</td>
            <td>{urun.baslik}</td>
            <td>{urun.ozellik}</td>
            <td>{urun.icerik}</td>
            <td>{urun.kapakResim}</td>
            <td>{urun.bannerResim}</td>
            <td>{urun.fiyat}</td>
            <td>{urun.urunKodu}</td>
            <td>{urun.urunStok}</td>
            <td>{urun.adminKoyw}</td>
            <td>{urun.adminKeyDesc}</td>
            <td>{urun.urunTarihi}</td>
            <td>{urun.urunEkleyen}</td>
            <td>{urun.urunDurum}</td>
            <td>{urun.ureticiID}</td>
            <td>{urun.resimID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const UrunListesiSayfasi = () => {
  const [urunler, setUrunler] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:44343/api/Urun")
      .then((response) => {
        setUrunler(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Ürün Listesi</h1>
      <UrunListesi urunler={urunler} />
    </div>
  );
};

export default UrunListesiSayfasi;
