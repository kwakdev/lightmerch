import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { addToCart, getCartCount } from "../utils/cart";

const hoodieImages = [
  "/hoodie.png",
  "/hoodie.png",
  "/hoodie.png",
  "/hoodie.png",
];

const sizes = ["S", "M", "L", "XL"];

function MainPage() {
  const [selectedImage, setSelectedImage] = useState(hoodieImages[0]);
  const [selectedSize, setSelectedSize] = useState("XL");
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const syncCartCount = () => setCartCount(getCartCount());

    syncCartCount();
    window.addEventListener("cartUpdated", syncCartCount);

    return () => {
      window.removeEventListener("cartUpdated", syncCartCount);
    };
  }, []);

  const handleAddToBag = () => {
    addToCart({
      id: "lightedits-official-hoodie",
      name: "Lightedits Official Hoodie",
      price: 69,
      image: selectedImage,
      size: selectedSize,
      quantity: 1,
    });
  };

  return (
    <div className="app">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/lightning.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <img src="/logo.png" alt="Lightedits logo" className="logo" />

       

        <div className="content-wrap">
          <div className="product-box">
            <div className="gallery-column">
                 <button
          className="cart-icon"
          type="button"
          onClick={() => navigate("/cart")}
          aria-label="Open cart"
        >
          <span className="cart-emoji">🛒</span>
          {cartCount > 0 && <div className="cart-badge">{cartCount}</div>}
        </button>
              <div className="main-image-wrap">
                <img
                  src={selectedImage}
                  alt="Lightedits Official Hoodie"
                  className="main-product-image"
                />
              </div>

              <div className="thumbnail-row">
                {hoodieImages.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail-button ${
                      selectedImage === image ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                    type="button"
                    aria-label={`View hoodie image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`Hoodie thumbnail ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="info-column">
              <p className="product-label">LIGHTEDITS</p>
              <h1 className="product-title">Lightedits Official Hoodie</h1>
              <p className="product-price">$69.00</p>

              <div className="size-section">
                <p className="section-title">Select Size</p>

                <div className="size-grid">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-box ${
                        selectedSize === size ? "active" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                      type="button"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="add-to-bag" type="button" onClick={handleAddToBag}>
                Add to Bag
              </button>
            </div>
          </div>
          <div className="socials">
  <a href="https://twitch.tv/lightedits" target="_blank">
    <svg viewBox="0 0 24 24" className="social-icon">
      <path d="M4 2L2 6v14h6v2h2l2-2h4l6-6V2H4zm16 11l-3 3h-4l-2 2v-2H6V4h14v9z"/>
      <path d="M10 7h2v5h-2zm5 0h2v5h-2z"/>
    </svg>
  </a>

  <a href="https://x.com/lightedits_" target="_blank">
    <svg viewBox="0 0 24 24" className="social-icon">
      <path d="M22 5.92c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.73 1.04 4.28 4.28 0 00-7.3 3.9 12.13 12.13 0 01-8.8-4.46 4.28 4.28 0 001.32 5.72 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.97A8.6 8.6 0 012 19.54a12.12 12.12 0 006.56 1.92c7.87 0 12.17-6.52 12.17-12.17 0-.18 0-.35-.01-.53A8.7 8.7 0 0022 5.92z"/>
    </svg>
  </a>

  <a href="https://instagram.com/lighteditsttv" target="_blank">
    <svg viewBox="0 0 24 24" className="social-icon">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2.5A2.5 2.5 0 1014.5 12 2.5 2.5 0 0012 9.5zm4.5-3a1 1 0 110 2 1 1 0 010-2z"/>
    </svg>
  </a>
</div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;