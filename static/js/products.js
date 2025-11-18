// ======================
// Fetch Products
// ======================
const getProducts = async () => {
  try {
    const results = await fetch("./static/data/products.json"); // ✅ fixed path
    const data = await results.json();
    return data.products;
  } catch (err) {
    console.error("Error loading products:", err);
    return [];
  }
};

// ======================
// Elements
// ======================
const categoryCenter = document.querySelector(".category__center");
const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

// ======================
// Display Products
// ======================
const displayProductItems = (items) => {
  if (!items || !items.length) {
    categoryCenter.innerHTML = `<p style="text-align:center;">No products found.</p>`;
    return;
  }

  const displayProduct = items.map(
    (product) => `
      <div class="product category__products">
        <div class="product__header">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product__footer">
          <h3>${product.title}</h3>
          <div class="rating">
            <svg><use xlink:href="./images/sprite.svg#icon-star-full"></use></svg>
            <svg><use xlink:href="./images/sprite.svg#icon-star-full"></use></svg>
            <svg><use xlink:href="./images/sprite.svg#icon-star-full"></use></svg>
            <svg><use xlink:href="./images/sprite.svg#icon-star-full"></use></svg>
            <svg><use xlink:href="./images/sprite.svg#icon-star-empty"></use></svg>
          </div>
          <div class="product__price">
            <h4>$${product.price}</h4>
          </div>
          <button type="button" class="product__btn">Add To Cart</button>
        </div>
      </div>
    `
  ).join("");

  categoryCenter.innerHTML = displayProduct;
};

// ======================
// Load All Products on Page Load
// ======================
window.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();
  displayProductItems(products);
});

// ======================
// Category Filter Logic
// ======================
if (categoryContainer) {
  categoryContainer.addEventListener("click", async (e) => {
    const target = e.target.closest(".filter-btn"); // ✅ works with your HTML
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    filterBtn.forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");

    if (id === "All Products") {
      displayProductItems(products);
    } else {
      const filtered = products.filter((p) => p.category === id);
      displayProductItems(filtered);
    }
  });
}
