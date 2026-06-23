import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { addToCart, getCartCount } from "../utils/cart";

const hoodieImages = [
  "/1.JPG",
  "/2.JPG",
  "/3.JPG",
  "/4.JPG",
  "/5.JPG",
  "/6.JPG",
];
const stock: Record<string, number | null> = {
  S: null,
  M: null,
  L: 2,
  XL: null,
};
const sizes = ["S", "M", "L", "XL"];

const variantMap: Record<string, string> = {
  S: "46029714522309",
  M: "46029714555077",
  L: "46029714587845",
  XL: "46029714620613",
};

const features = [
  "UV Light Embroidered Lightning",
  "Seamless Stitching",
  "Boxy and Slightly Cropped Fit",
  "Y2K Zipper",
  "Drop Shoulder",
  "100% French Terry Cotton",
  "420 GSM",
];

function MainPage() {
  const [selectedImage, setSelectedImage] = useState(hoodieImages[0]);
  const [selectedSize, setSelectedSize] = useState("L");
  const [cartCount, setCartCount] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const syncCartCount = () => setCartCount(getCartCount());
    syncCartCount();
    window.addEventListener("cartUpdated", syncCartCount);
    return () => window.removeEventListener("cartUpdated", syncCartCount);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    if (lightboxOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, [lightboxOpen]);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [selectedImage]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.min(Math.max(prev - e.deltaY * 0.001, 1), 5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsPanning(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !dragRef.current) return;
    setPan({
      x: dragRef.current.panX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.panY + (e.clientY - dragRef.current.startY),
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleAddToBag = () => {
    const variantId = variantMap[selectedSize];
    if (!variantId) {
      alert("This size is not available for checkout yet.");
      return;
    }
    addToCart({
      id: "lightedits-official-hoodie",
      name: "Hikari Limited Zip Hoodie",
      price: 79.99,
      image: selectedImage,
      size: selectedSize,
      quantity: 1,
      variantId,
    });
  };

  return (
    <div className="app">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/lightning.mp4" type="video/mp4" />
      </video>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged product image"
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxOpen(false)}
            type="button"
            aria-label="Close enlarged image"
          >
            ✕
          </button>
          <div className="lightbox-zoom-hint">Scroll to zoom · Drag to pan</div>
          <img
            src={selectedImage}
            alt="Hikari Limited Zip Hoodie enlarged"
            className="lightbox-image"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "zoom-in",
              transition: isPanning ? "none" : "transform 0.15s ease",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e); }}
          />
        </div>
      )}

      <div className="overlay">
        <img src="/logo.png" alt="Lightedits logo" className="logo" />

        <div className="content-wrap">
          <div className="product-box">
            <button
              className="cart-icon"
              type="button"
              onClick={() => navigate("/cart")}
              aria-label="Open cart"
            >
              <span className="cart-emoji">🛒</span>
              {cartCount > 0 && <div className="cart-badge">{cartCount}</div>}
            </button>

            <div className="gallery-column">
              <div
                className="main-image-wrap"
                onClick={() => setLightboxOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
                aria-label="Click to enlarge image"
                style={{ cursor: "zoom-in" }}
              >
                <img
                  src={selectedImage}
                  alt="Hikari Limited Zip Hoodie"
                  className="main-product-image"
                />
              </div>

              <div className="thumbnail-row">
                {hoodieImages.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail-button ${selectedImage === image ? "active" : ""}`}
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
              <h1 className="product-title">Hikari Limited Zip Hoodie</h1>
              <p className="product-price">$79.99 USD</p>
              <p className="product-limited-tag">Only 50 Made</p>

              <div className="size-section">
                <p className="section-title">Select Size</p>
                <div className="size-grid">
  {sizes.map((size) => (
    <div key={size} className="size-option">
      <button
        className={`size-box ${selectedSize === size ? "active" : ""}`}
        onClick={() => setSelectedSize(size)}
        type="button"
      >
        {size}
      </button>
      {stock[size] !== null && (
        <span className="size-stock-warning">Only {stock[size]} left</span>
      )}
    </div>
  ))}
</div>
                </div>
              </div>

              <button className="add-to-bag" type="button" onClick={handleAddToBag}>
                Add to Bag
              </button>

              <div className="features-section">
                <button
                  className="show-more-btn"
                  type="button"
                  onClick={() => setShowFeatures((prev) => !prev)}
                >
                  {showFeatures ? "Hide Description ▲" : "Show Description ▼"}
                </button>

                {showFeatures && (
                  <ul className="product-features">
                    {features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="socials">
            <a href="https://twitch.tv/lightedits" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" className="social-icon">
                <path d="M4 2L2 6v14h6v2h2l2-2h4l6-6V2H4zm16 11l-3 3h-4l-2 2v-2H6V4h14v9z" />
                <path d="M10 7h2v5h-2zm5 0h2v5h-2z" />
              </svg>
            </a>
            <a href="https://x.com/lightedits_" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" className="social-icon">
                <path d="M22 5.92c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.73 1.04 4.28 4.28 0 00-7.3 3.9 12.13 12.13 0 01-8.8-4.46 4.28 4.28 0 001.32 5.72 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.97A8.6 8.6 0 012 19.54a12.12 12.12 0 006.56 1.92c7.87 0 12.17-6.52 12.17-12.17 0-.18 0-.35-.01-.53A8.7 8.7 0 0022 5.92z" />
              </svg>
            </a>
            <a href="https://instagram.com/lighteditsttv" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" className="social-icon">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2.5A2.5 2.5 0 1014.5 12 2.5 2.5 0 0012 9.5zm4.5-3a1 1 0 110 2 1 1 0 010-2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
  );
}

export default MainPage;
