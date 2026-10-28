
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const name = button.dataset.name;
      const price = Number(button.dataset.price);

      const cart = JSON.parse(localStorage.getItem("hohCart") || "[]");

      const existingProduct = cart.find(function (item) {
        return item.name === name;
      });

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({
          name: name,
          price: price,
          quantity: 1
        });
      }

      localStorage.setItem("hohCart", JSON.stringify(cart));
      displayCart();

      alert(name + " has been added to your cart!");
    });
  });
});


function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  const cart = JSON.parse(localStorage.getItem("hohCart") || "[]");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: R0";
    return;
  }

  let total = 0;

  cart.forEach(function (item) {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("p");
    details.textContent =
      item.name + " × " + item.quantity + " — R" + subtotal;

      
const quantityControls = document.createElement("div");
quantityControls.className = "cart-quantity";

const decreaseButton = document.createElement("button");
decreaseButton.type = "button";
decreaseButton.textContent = "−";

const quantityLabel = document.createElement("span");
quantityLabel.textContent = " " + item.quantity + " ";

const increaseButton = document.createElement("button");
increaseButton.type = "button";
increaseButton.textContent = "+";

decreaseButton.addEventListener("click", function () {
  if (item.quantity > 1) {
    item.quantity -= 1;
    localStorage.setItem("hohCart", JSON.stringify(cart));
    displayCart();
  }
});

increaseButton.addEventListener("click", function () {
  item.quantity += 1;
  localStorage.setItem("hohCart", JSON.stringify(cart));
  displayCart();
});

quantityControls.appendChild(decreaseButton);
quantityControls.appendChild(quantityLabel);
quantityControls.appendChild(increaseButton);


    
row.appendChild(details);
row.appendChild(quantityControls);

const removeButton = document.createElement("button");
removeButton.type = "button";
removeButton.className = "btn btn-primary";
removeButton.textContent = "Remove";

removeButton.addEventListener("click", function () {
  const updatedCart = cart.filter(function (product) {
    return product.name !== item.name;
  });

  localStorage.setItem("hohCart", JSON.stringify(updatedCart));
  displayCart();
});

row.appendChild(removeButton);
cartItems.appendChild(row);

  });

  cartTotal.textContent = "Total: R" + total;
}

document.addEventListener("DOMContentLoaded", displayCart);
