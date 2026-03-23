import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import type { CartItem } from "../utils/cart";
import {
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../utils/cart";

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const syncCart = () => setCartItems(getCart());

    syncCart();
    window.addEventListener("cartUpdated", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
    };
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const handleDecrease = (item: CartItem) => {
    updateCartItemQuantity(item.id, item.size, item.quantity - 1);
  };

  const handleIncrease = (item: CartItem) => {
    updateCartItemQuantity(item.id, item.size, item.quantity + 1);
  };

  const handleRemove = (item: CartItem) => {
    removeCartItem(item.id, item.size);
  };

  return (
    <div className="app">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/lightning.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <img src="/logo.png" alt="Lightedits logo" className="logo" />

        <div className="content-wrap">
          <div className="glass-page cart-page">
            <div className="page-header">
              <p className="product-label">LIGHTEDITS</p>
              <h1 className="page-title">Your Bag</h1>
            </div>

            <div className="cart-layout">
              <div className="cart-items">
                {cartItems.length === 0 ? (
                  <div className="empty-cart">
                    <p className="empty-cart-title">Your bag is empty.</p>
                    <Link to="/" className="add-to-bag checkout-link">
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      className="cart-item"
                      key={`${item.id}-${item.size}`}
                    >
                      <div className="cart-item-image-wrap">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </div>

                      <div className="cart-item-details">
                        <h2 className="cart-item-title">{item.name}</h2>
                        <p className="cart-item-meta">Size: {item.size}</p>
                       
                        <p className="cart-item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <div className="cart-qty-row">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => handleDecrease(item)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            −
                          </button>

                          <span className="qty-value">{item.quantity}</span>

                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => handleIncrease(item)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => handleRemove(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="cart-summary">
                <h2 className="summary-title">Order Summary</h2>

                <div className="summary-row">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="summary-row">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="summary-divider" />

                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  className={`add-to-bag checkout-link ${
                    cartItems.length === 0 ? "disabled-link" : ""
                  }`}
                  onClick={(e) => {
                    if (cartItems.length === 0) e.preventDefault();
                  }}
                >
                  Proceed to Checkout
                </Link>

                <Link to="/" className="secondary-link">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;