// Store users in localStorage (array of objects)
let users = JSON.parse(localStorage.getItem('users')) || [];

// ----------------- SIGNUP -----------------
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;   // CHANGED
    const password = document.getElementById('signupPassword').value;

    // Check if user already exists
    if (users.some(user => user.email === email)) {              // CHANGED
      document.getElementById('signupMessage').textContent = "User already exists!";
      return;
    }

    users.push({ email, password });                             // CHANGED
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('signupMessage').textContent = "Signup successful! You can now login.";
    signupForm.reset();
  });
}

// ----------------- LOGIN -----------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;   // CHANGED
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email && u.password === password); // CHANGED
    if (user) {
      localStorage.setItem('currentUser', email); // ✅ store logged-in user’s email
      window.location.href = "home.html";         // ✅ redirect to homepage
    } else {
      document.getElementById('loginMessage').textContent = "Invalid credentials!";
    }
  });
}

// ----------------- HOME PAGE -----------------
if (window.location.pathname.includes("home.html")) {
  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) {
    window.location.href = "index.html"; // redirect if not logged in
  } else {
    document.getElementById('welcomeText').textContent = `Hello, ${currentUser}!`; // Will now show email

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = "index.html";
    });

    // Dummy data for search
    const items = [
      { name: "Bella", type: "Dog" },
      { name: "Milo", type: "Cat" },
      { name: "Charlie", type: "Dog" },
      { name: "Lucy", type: "Sitter" },
      { name: "Max", type: "Dog" },
      { name: "Sophie", type: "Sitter" }
    ];

    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      searchResults.innerHTML = "";

      const filtered = items.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      );

      if (filtered.length > 0) {
        filtered.forEach(item => {
          const li = document.createElement("li");
          li.textContent = `${item.name} (${item.type})`;
          searchResults.appendChild(li);
        });
      } else if (query.trim() !== "") {
        searchResults.innerHTML = "<li>No results found</li>";
      }
    });
  }
}

// ----------------- PET PROFILE PAGE -----------------
if (window.location.pathname.includes("pet-profile.html")) {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = "index.html"; // redirect if not logged in
  }

  // Logout handler
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
  });
}
