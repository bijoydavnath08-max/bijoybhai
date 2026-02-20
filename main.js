// Main JavaScript for TechPulse e‑commerce site
// This script handles dynamic rendering of latest products, countdown timers, and simple filtering.

// Sample product data – in a real app this would come from an API or database.
const products = [
  {
    id: 1,
    name: "Gaming Laptop RTX 3080",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2RkZCIgLz48L3N2Zz4="
    oldPrice: 150000,
    newPrice: 120000,
    rating: 4.5,
    brand: "ASUS",
    category: "Laptop",
    specs: { processor: "Intel i7", ram: "16GB", storage: "1TB SSD" },
  },
  {
    id: 2,
    name: "Ultrabook Pro 14",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2RkZCIgLz48L3N2Zz4="
    oldPrice: 90000,
    newPrice: 75000,
    rating: 4.2,
    brand: "Dell",
    category: "Laptop",
    specs: { processor: "Intel i5", ram: "8GB", storage: "512GB SSD" },
  },
  {
    id: 3,
    name: "4K Gaming Monitor 27\"",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2RkZCIgLz48L3N2Zz4="
    oldPrice: 60000,
    newPrice: 48000,
    rating: 4.7,
    brand: "MSI",
    category: "Monitor",
    specs: { refreshRate: "144Hz", panel: "IPS" },
  },
  // Add more product objects as needed
];

// Utility to format price with BDT currency
function formatPrice(price) {
  return `BDT ${price.toLocaleString()}`;
}

// Render product cards into the grid
function renderProducts(filterFn = null) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = ""; // clear
  const filtered = filterFn ? products.filter(filterFn) : products;
  filtered.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy" />
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price">
          <span class="old-price">${formatPrice(p.oldPrice)}</span>
          <span class="new-price">${formatPrice(p.newPrice)}</span>
        </div>
        <div class="rating">⭐ ${p.rating}</div>
        <div class="product-actions">
          <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="compare" onclick="compareProduct(${p.id})">Compare</button>
          <button class="wishlist" onclick="addToWishlist(${p.id})">♥</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Simple cart counter (demo only)
let cartCount = 0;
function addToCart(productId) {
  cartCount++;
  document.querySelector(".cart-count").textContent = cartCount;
  alert("Product added to cart!");
}
function compareProduct(productId) {
  alert("Compare feature coming soon.");
}
function addToWishlist(productId) {
  alert("Added to wishlist.");
}

// Countdown timer for hot deals – updates every second
function startDealCountdown() {
  const countdownEl = document.querySelector(".countdown");
  if (!countdownEl) return;
  const endTime = new Date(countdownEl.dataset.end).getTime();
  const interval = setInterval(() => {
    const now = Date.now();
    const diff = endTime - now;
    if (diff <= 0) {
      countdownEl.textContent = "Deal ended";
      clearInterval(interval);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  startDealCountdown();
});
