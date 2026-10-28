
/* ========================================
   HOUSE OF HEALING SA
   Main JavaScript
======================================== */

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the menu after selecting a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    });
  });
}

// Automatically update the footer year
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", function () {
  const clearCartButton = document.getElementById("clear-cart");

  if (clearCartButton) {
    clearCartButton.addEventListener("click", function () {
      const confirmed = confirm(
        "Are you sure you want to clear your shopping cart?"
      );

      if (confirmed) {
        localStorage.removeItem("hohCart");
        displayCart();
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const placeOrderButton = document.getElementById("place-order");

  if (!placeOrderButton) return;

  placeOrderButton.addEventListener("click", function () {
    const cart = JSON.parse(localStorage.getItem("hohCart") || "[]");

    if (cart.length === 0) {
      alert("Your cart is empty. Please add products before placing an order.");
      return;
    }

    let message = "Hello House of Healing SA!\n\n";
    message += "I would like to place an order:\n\n";

    let total = 0;

    cart.forEach(function (item) {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      message +=
        item.name +
        " x " + item.quantity +
        " - R" + subtotal + "\n";
    });

    message += "\nTotal: R" + total;
    message += "\n\nPlease confirm availability and delivery details.";

    const whatsappNumber = "27846790043";
    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
});
