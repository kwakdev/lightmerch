export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  variantId: string;
};

const CART_KEY = "lightedits_cart3";

export function getCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

export function getCartCount(): number {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function addToCart(newItem: CartItem) {
  const cart = getCart();

  const existingIndex = cart.findIndex(
    (item) =>
      item.id === newItem.id &&
      item.size === newItem.size &&
      item.variantId === newItem.variantId
  );

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }

  saveCart(cart);
}

export function updateCartItemQuantity(
  id: string,
  size: string,
  quantity: number
) {
  const cart = getCart()
    .map((item) =>
      item.id === id && item.size === size ? { ...item, quantity } : item
    )
    .filter((item) => item.quantity > 0);

  saveCart(cart);
}

export function removeCartItem(id: string, size: string) {
  const cart = getCart().filter(
    (item) => !(item.id === id && item.size === size)
  );
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartSubtotal(): number {
  return getCart().reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}