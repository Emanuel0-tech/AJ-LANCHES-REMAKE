const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItensContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const CloseModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressComplete = document.getElementById("address-complete");

let cart = [];

cartBtn.addEventListener("click", function () {
  cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

CloseModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name == name);

  if (existingItem) {
    existingItem.quality += 1;
  } else {
    cart.push({
      name,
      price,
      quality: 1,
    });
  }

  updateCartModal();
}

function updateCartModal() {
  cartItensContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
        <div>
        <p class="font-medium">${item.name}</p>
        <p>${item.quality}</p>
        <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>

        <div>
            <button>
                Remover
            </button>
        </div>

    </div>
    `;

    total += item.price * item.quality;

    cartItensContainer.appendChild(cartItemElement);
  })

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerHTML = cart.length;

}

cartItensContainer.addEventListener("click", function(event){if(event.target.classList.contains("remove-from-cart-btn")){
    const name = event.target.getAttribute("data-name")
}

})
