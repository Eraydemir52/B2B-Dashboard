import React, { useState, useEffect } from "react";
import axios from "axios";
import UrunListesiSayfasi from "./UrunListesi";

const UrunForm = () => {
  const [urun, setUrun] = useState({
    kategoriID: "",
    baslik: "",
    ozellik: "",
    icerik: "",
    kapakResim: "",
    bannerResim: "",
    fiyat: "",
    urunKodu: "",
    urunStok: "",
    adminKoyw: "",
    adminKeyDesc: "",
    urunTarihi: "",
    urunEkleyen: "",
    urunDurum: "",
    ureticiID: "",
    ureticiadi: "",
    resimID: "",
    resimurun: "",
  });
  const [kategoriListesi, setKategoriListesi] = useState([]);
  const [ureticiListesi, setUreticiListesi] = useState([]);
  const [resimListesi, setResimListesi] = useState([]);

  useEffect(() => {
    // Kategori listesini API'den çekme
    axios
      .get("https://localhost:44343/api/Kategori")
      .then((response) => {
        setKategoriListesi(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Üretici listesini API'den çekme
    axios
      .get("https://localhost:44343/api/Uretici")
      .then((response) => {
        console.log(response.data); // Log the response data
        setUreticiListesi(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Resim listesini API'den çekme
    axios
      .get("https://localhost:44343/api/Resim")
      .then((response) => {
        setResimListesi(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUrun((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:44343/api/Urun/AddUrun", urun)
      .then((response) => {
        console.log(response);
        // Ürün başarıyla eklendikten sonra yapılacak işlemler buraya gelecek
      })
      .catch((error) => {
        console.error(error);
        // Hata durumunda yapılacak işlemler buraya gelecek
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Kategori:
        <select
          name="kategoriID"
          value={urun.kategoriID}
          onChange={handleChange}
        >
          <option value="">Kategori Seçiniz</option>
          {kategoriListesi.map((kategori) => (
            <option key={kategori.kategoriID} value={kategori.kategoriID}>
              {kategori.kategoribaslik}
            </option>
          ))}
        </select>
      </label>
      <label>
        Başlık:
        <input
          type="text"
          name="baslik"
          value={urun.baslik}
          onChange={handleChange}
        />
      </label>
      <label>
        Özellik:
        <input
          type="text"
          name="ozellik"
          value={urun.ozellik}
          onChange={handleChange}
        />
      </label>
      <label>
        İçerik:
        <textarea name="icerik" value={urun.icerik} onChange={handleChange} />
      </label>
      <label>
        Kapak Resim:
        <input
          type="text"
          name="kapakResim"
          value={urun.kapakResim}
          onChange={handleChange}
        />
      </label>
      <label>
        Banner Resim:
        <input
          type="text"
          name="bannerResim"
          value={urun.bannerResim}
          onChange={handleChange}
        />
      </label>
      <label>
        Fiyat:
        <input
          type="number"
          name="fiyat"
          value={urun.fiyat}
          onChange={handleChange}
        />
      </label>
      <label>
        Ürün Kodu:
        <input
          type="text"
          name="urunKodu"
          value={urun.urunKodu}
          onChange={handleChange}
        />
      </label>
      <label>
        Ürün Stok:
        <input
          type="number"
          name="urunStok"
          value={urun.urunStok}
          onChange={handleChange}
        />
      </label>
      <label>
        Admin Koyw:
        <input
          type="text"
          name="adminKoyw"
          value={urun.adminKoyw}
          onChange={handleChange}
        />
      </label>
      <label>
        Admin Key Desc:
        <input
          type="text"
          name="adminKeyDesc"
          value={urun.adminKeyDesc}
          onChange={handleChange}
        />
      </label>
      <label>
        Ürün Tarihi:
        <input
          type="datetime-local"
          name="urunTarihi"
          value={urun.urunTarihi}
          onChange={handleChange}
        />
      </label>
      <label>
        Ürün Ekleyen:
        <input
          type="text"
          name="urunEkleyen"
          value={urun.urunEkleyen}
          onChange={handleChange}
        />
      </label>
      <label>
        Ürün Durum:
        <input
          type="text"
          name="urunDurum"
          value={urun.urunDurum}
          onChange={handleChange}
        />
      </label>
      <label>
        Üretici:
        <select name="ureticiID" value={urun.ureticiID} onChange={handleChange}>
          <option value="">Üretici Seçiniz</option>
          {ureticiListesi.map((uretici) => (
            <option key={uretici.ureticiID} value={uretici.ureticiID}>
              {uretici.ureticiadi}
            </option>
          ))}
        </select>
      </label>

      <label>
        Resim ID:
        <select name="resimID" value={urun.resimID} onChange={handleChange}>
          <option value="">Resim Seçiniz</option>
          {resimListesi.map((resim) => (
            <option key={resim.resimID} value={resim.resimID}>
              {resim.resimurun}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Ürün Ekle</button>
      <UrunListesiSayfasi />
    </form>
  );
};

export default UrunForm;
