// Mobile Navigation
const mobileNav = document.querySelector(".mobil__nav-open");
const navMenu = document.querySelector(".nav__links");
const navClose = document.querySelector(".mobil__nav-close");

mobileNav.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

navClose.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Image Carousel
const mainImage = document.querySelector(".main-image");
const thumbnails = document.querySelectorAll(".thumbnail");
const previousArrow = document.querySelector(".previous.arrow");
const nextArrow = document.querySelector(".next.arrow");

let currentImageIndex = 0;

function updateMainImage() {
  mainImage.src = thumbnails[currentImageIndex].src.replace("-thumbnail", "");
}

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentImageIndex = index;
    updateMainImage();
  });
});

nextArrow.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
  updateMainImage();
});

previousArrow.addEventListener("click", () => {
  currentImageIndex =
    (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
  updateMainImage();
});

// Quantity Control
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const quantityDisplay = document.getElementById("quantity");

let quantity = 0;
const pricePerItem = 125.0; // Price of a single item

function updateQuantityDisplay() {
  quantityDisplay.textContent = quantity;
}

function updateCartItemPrice() {
  const cartItems = document.querySelectorAll(".cart-item");
  cartItems.forEach((item) => {
    const itemQuantity = parseInt(
      item
        .querySelector(".cart-item-quantity")
        .textContent.replace("Quantity: ", ""),
      10
    );
    const itemPrice = pricePerItem * itemQuantity;
    item.querySelector(".cart-item-price").textContent = `$${itemPrice.toFixed(
      2
    )}`;
  });
}

minusButton.addEventListener("click", () => {
  if (quantity > 0) {
    quantity -= 1;
    updateQuantityDisplay();
  }
});

plusButton.addEventListener("click", () => {
  quantity += 1;
  updateQuantityDisplay();
});

// Add to Cart
const addToCartButton = document.querySelector(".add-to-cart");
const cartCountDisplay = document.querySelector(".cart-count");
const cartDropdown = document.querySelector(".dropdown__cart");

let cartCount = 0;

// Function to update the cart count display
function updateCartCount() {
  cartCountDisplay.textContent = cartCount;
}

// Function to add an item to the cart
function addItemToCart(imageSrc, name, quantity, price) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  cartItem.innerHTML = `
    <img class="cart-item-image" src="${imageSrc}" alt="${name}" />
    <div class="cart-item-details">
      <p class="cart-item-name">${name}</p>
      <p class="cart-item-quantity">Quantity: ${quantity}</p>
      <p class="cart-item-price">$${price.toFixed(2)}</p>
    </div>
    <img class="trash" src="./images/icon-delete.svg" alt="Remove item" />
  `;

  // Add the new item to the dropdown
  cartDropdown.insertBefore(
    cartItem,
    cartDropdown.querySelector(".button__checkout")
  );

  // Show the "empty cart" message if there are no items
  document.querySelector(".empty-cart").style.display = "none";
  updateCartItemPrice(); // Ensure cart item prices are updated
}

// Event listener for the "Add to Cart" button
addToCartButton.addEventListener("click", () => {
  const quantityValue = parseInt(quantityDisplay.textContent, 10);
  if (quantityValue > 0) {
    cartCount += quantityValue;
    updateCartCount();

    // Example item details
    addItemToCart(
      "./images/image-product-1-thumbnail.jpg",
      "Fall Limited Edition Sneakers",
      quantityValue,
      pricePerItem * quantityValue
    );

    quantity = 0; // Reset quantity after adding
    updateQuantityDisplay();
  }
});

// Remove items from the cart
cartDropdown.addEventListener("click", (event) => {
  if (event.target.classList.contains("trash")) {
    const cartItem = event.target.closest(".cart-item");
    const itemQuantity = parseInt(
      cartItem
        .querySelector(".cart-item-quantity")
        .textContent.replace("Quantity: ", ""),
      10
    );

    cartCount -= itemQuantity;
    if (cartCount < 0) {
      cartCount = 0;
    }
    updateCartCount();

    cartItem.remove();

    // Update cart count and display empty message if needed
    if (cartDropdown.querySelectorAll(".cart-item").length === 0) {
      document.querySelector(".empty-cart").style.display = "block";
    }
  }
});

// Initialize cart state
function initializeCart() {
  cartCount = 0;
  updateCartCount();

  // Recreate the cart header and checkout button
  cartDropdown.innerHTML = `
    <p class="title-border">Cart.</p>
    <p class="empty-cart">Your cart is empty</p>
    <button class="button__checkout">Checkout</button>
  `;
}

// Call initializeCart on page load
initializeCart();

// Cart Dropdown
const cartIcon = document.querySelector(".cart");
const button = document.querySelector(".button__checkout");

// Toggle cart dropdown visibility
cartIcon.addEventListener("click", () => {
  const cartDropdown = document.querySelector(".cart-dropdown");
  cartDropdown.classList.toggle("active");
  button.classList.toggle("active");
});

// Close the dropdown if the user clicks outside of it
// document.addEventListener("click", (event) => {
//   const cartDropdown = document.querySelector(".cart-dropdown");
//   if (
//     !cartIcon.contains(event.target) &&
//     !cartDropdown.contains(event.target)
//   ) {
//     cartDropdown.classList.remove("active");
//   }
// });
