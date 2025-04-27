# ChainTogether Projesi

Bu proje, kullanıcıların projelere göz atmasına, yeni projeler oluşturmasına, oy vermesine ve bağış yapmasına olanak tanıyan bir web uygulamasıdır. Sui blockchain cüzdan entegrasyonu içerir.

## Açıklama

ChainTogether, topluluk odaklı projelerin sergilendiği ve desteklendiği bir platformdur. Kullanıcılar giriş yapabilir, mevcut projelere göz atabilir, kendi projelerini (başlık, açıklama ve resimle birlikte) ekleyebilir ve potansiyel olarak projelere oy verip bağış yapabilirler.

## Özellikler

*   **Kullanıcı Girişi:** Kayıtlı kullanıcılar için güvenli giriş (`users.json` ile).
*   **Proje Görüntüleme:** Projeleri (`projects.json`'dan) sayfa sayfa gezinme imkanıyla listeler.
*   **Proje Oluşturma:** Kullanıcıların yeni projeler eklemesi için form (başlık, açıklama, resim yükleme).
*   **Resim Yükleme:** Projeler için resimler sunucuya yüklenir.
*   **Oy Verme/Bağış (İskelet):** Oy verme ve bağış yapma butonları ve alanları mevcuttur (backend entegrasyonu gerekebilir).
*   **Cüzdan Bağlantısı:** Sui uyumlu cüzdanları algılar ve bağlanır (`@mysten/wallet-standard` kullanarak).

## Görseller

*(Buraya uygulamanın ekran görüntülerini ekleyin)*

**Giriş Sayfası:**
![Giriş Sayfası Ekran Görüntüsü](buraya_giris_sayfasi_resmi_linki_ekleyin.png)

**Ana Sayfa (Proje Görüntüleme):**
![Ana Sayfa Ekran Görüntüsü](buraya_ana_sayfa_resmi_linki_ekleyin.png)

**Proje Oluşturma Sayfası:**
![Proje Oluşturma Sayfası Ekran Görüntüsü](buraya_olusturma_sayfasi_resmi_linki_ekleyin.png)

## Kullanılan Teknolojiler

*   **Frontend:** HTML, CSS, JavaScript, TypeScript
*   **Backend:** Node.js, Express.js
*   **Dosya Yükleme:** Multer
*   **Cüzdan Entegrasyonu:** @mysten/wallet-standard
*   **Geliştirme/Build Aracı:** Vite
*   **Veri Depolama:** JSON dosyaları (`projects.json`, `users.json`)

## Kurulum ve Çalıştırma

1.  **Depoyu Klonlayın:**
    ```bash
    git clone <depo_url>
    cd js/js2
    ```
2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```
3.  **Backend Sunucusunu Başlatın:**
    *   `js2` klasöründeyken aşağıdaki komutu çalıştırın:
    ```bash
    node server.js
    ```
    *   Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

4.  **Frontend Geliştirme Sunucusunu Başlatın:**
    *   Yeni bir terminal açın ve `js2` klasöründeyken aşağıdaki komutu çalıştırın:
    ```bash
    npm run dev
    ```
    *   Vite, uygulamayı genellikle `http://localhost:5173` gibi bir adreste başlatacaktır (terminal çıktısını kontrol edin).

5.  **Uygulamayı Açın:** Tarayıcınızda Vite tarafından sağlanan adresi (örn. `http://localhost:5173`) açın.

## Kullanım

1.  Uygulamayı tarayıcıda açın (`index.html`).
2.  `users.json` içinde tanımlı bir kullanıcı adı ve şifre ile giriş yapın.
3.  Başarılı giriş sonrası `main.html` sayfasına yönlendirilirsiniz.
4.  `<` ve `>` butonları ile projeler arasında gezinin.
5.  `+` butonuna tıklayarak `create.html` sayfasına gidin ve yeni bir proje oluşturun.
6.  (Geliştirilirse) Oy verin veya bağış yapın.

## Dosya Yapısı (Önemli Dosyalar)
js/ 
├── js2/ 
│ ├── projects/ 
│ │ ├── images/ # Yüklenen proje resimleri
│ │ └── projects.json # Proje verileri 
│ ├── src/ # (Vite projesi için kaynak kodlar buraya taşınabilir) 
│ ├── create.html # Proje oluşturma sayfası │
├── index.html # Giriş sayfası │ ├── index.js # Ana sayfa (proje görüntüleme) script'i │ ├── login.ts # Giriş sayfası script'i │ ├── main.html # Ana sayfa (proje görüntüleme) │ ├── package.json # Proje bağımlılıkları ve script'leri │ ├── server.js # Backend Express sunucusu │ ├── style.css # Stil dosyası │ ├── tsconfig.json # TypeScript yapılandırması │ ├── users.json # Kullanıcı bilgileri │ └── walletdetect.ts # Cüzdan algılama script'i │ └── ... (diğer yapılandırma dosyaları) └── ... (üst klasördeki dosyalar)

