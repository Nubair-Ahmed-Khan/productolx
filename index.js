
async function getData() {
  let res = await fetch("https://dummyjson.com/products");
  let data = await res.json();
  let cardContainer = document.getElementById("cards");

  data.products.forEach(p => {
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image-container"><img src="${p.images[0]}" alt=""></div>
      <div class="product-details">
        <h5>${p.title}</h5>
        <p class="product-price">$${p.price}</p>
        <p>${p.description.slice(0,60)}...</p>
        <div class="btn-group mt-auto">
          <button class="btn btn-sm btn-success">Add to Cart</button>
          <button class="btn btn-sm btn-primary">Buy Now</button>
        </div>
      </div>`;

    // === Product card click event ===
    card.addEventListener("click", () => {
      document.getElementById("productTitle").textContent = p.title;
      document.getElementById("productImage").src = p.images[0];
      document.getElementById("productPrice").textContent = "$" + p.price;
      document.getElementById("productDescription").textContent = p.description;
      let modal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
      modal.show();
    });

    cardContainer.appendChild(card);
  });
}
getData();

function showUserDropdown(user) {
  document.getElementById("loginBtn").style.display = "none";
  document.getElementById("userDropdown").style.display = "block";
  document.getElementById("userNameDisplay").textContent = user.name;
  document.getElementById("userEmailDisplay").textContent = user.email;
}

function hideUserDropdown() {
  document.getElementById("loginBtn").style.display = "block";
  document.getElementById("userDropdown").style.display = "none";
}

document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  let name = document.getElementById("regName").value;
  let email = document.getElementById("regEmail").value;
  let pass = document.getElementById("regPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if(users.find(u => u.email === email)) {
    alert("User already registered");
    return;
  }
  users.push({name, email, pass});
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully");
  e.target.reset();
});

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  let email = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email && u.pass === pass);
  if(user) {
    alert("Login Successful: " + user.name);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    showUserDropdown(user);
    document.querySelector("#loginModal .btn-close").click();
  } else {
    alert("Invalid credentials");
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  hideUserDropdown();
});

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if(user) showUserDropdown(user);
});
