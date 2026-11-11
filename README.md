# NBA Mimarlık – Web Sitesi Demosu

NBA Mimarlık (Nazım Bayar Architecture, Çorlu / Tekirdağ) için hazırlanan web sitesi demosu.

## Klasör yapısı

```
nba-mimarlik-demo/
├── index.html          Sayfa iskeleti: header, footer, dosyaların yüklenmesi
├── css/
│   └── style.css       Tüm stiller (renkler en üstte, açık/koyu tema)
├── js/
│   ├── projects.js     Proje verileri (TR) ve İngilizce çevirileri
│   ├── services.js     Hizmet verileri ve ikonlar
│   ├── i18n.js         Arayüz metinleri (TR/EN) ve dil yardımcıları
│   ├── render.js       Temsili proje görsellerini çizen kod
│   ├── views.js        Sayfalar: ana sayfa, projeler, detay, hizmetler, ofis, iletişim
│   └── app.js          Yönlendirme, dil ve tema düğmeleri, başlatma
└── assets/
    └── favicon.svg     Tarayıcı sekmesi ikonu
```

JS dosyaları `index.html` içinde yukarıdaki sırayla yüklenir; sıra önemlidir.

## Sık yapılacak değişiklikler
| Ne değişecek? | Hangi dosya? |
|---|---|
| Renkler | `css/style.css` (en üstteki `:root` blokları) |
| Proje ekle / sil | `js/projects.js` |
| Hizmet metinleri | `js/services.js` |
| Menü, buton, form yazıları | `js/i18n.js` |
| Adres, telefon, e-posta | `js/views.js` (`contact` fonksiyonu) |

## Çalıştırma
Kurulum gerekmez. `index.html` dosyasını tarayıcıda açmanız yeterli.
VS Code'da "Live Server" eklentisiyle açarsanız kaydettiğiniz değişiklikler otomatik yenilenir.

> Not: Projeler ve görseller temsilidir (demo içerik).
