// ===========================
// DATA STORAGE & INITIALIZATION
// ===========================
let users = JSON.parse(localStorage.getItem('users')) || [];

// Sample data for dogs
const dogs = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 years",
    description: "Friendly and energetic, loves to play fetch!",
    image: "🐕",
    details: "Buddy is a lovable Golden Retriever who enjoys outdoor activities. He's well-trained, vaccinated, and gets along great with children and other pets."
  },
  {
    id: 2,
    name: "Max",
    breed: "German Shepherd",
    age: "3 years",
    description: "Loyal and protective, great with families.",
    image: "🐕‍🦺",
    details: "Max is an intelligent and loyal companion. He's perfect for families looking for a protective yet gentle dog. Fully trained and healthy."
  },
  {
    id: 3,
    name: "Luna",
    breed: "Husky",
    age: "1 year",
    description: "Playful and vocal, loves cold weather!",
    image: "🐺",
    details: "Luna is a young, energetic Husky with beautiful blue eyes. She loves to run and play, making her perfect for active families."
  },
  {
    id: 4,
    name: "Charlie",
    breed: "Beagle",
    age: "4 years",
    description: "Curious and friendly, excellent with kids.",
    image: "🐶",
    details: "Charlie is a sweet Beagle with a curious nature. He's great with kids and loves to explore. Well-behaved and house-trained."
  }
];

// Sample data for sitters
const sitters = [
  {
    id: 1,
    name: "Sarah Johnson",
    experience: "5 years",
    rating: "⭐⭐⭐⭐⭐",
    specialty: "Dogs & Cats",
    rate: "$25/hour",
    image: "👩",
    details: "Sarah has been caring for pets for 5 years. She's certified in pet first aid and has excellent references. Available weekdays and weekends.",
    availability: "Mon-Sun: 9am-6pm"
  },
  {
    id: 2,
    name: "Mike Chen",
    experience: "3 years",
    rating: "⭐⭐⭐⭐⭐",
    specialty: "Large Dogs",
    rate: "$30/hour",
    image: "👨",
    details: "Mike specializes in large breed dogs and has experience with training. He offers walking, feeding, and playtime services.",
    availability: "Mon-Fri: 10am-8pm"
  },
  {
    id: 3,
    name: "Emma Davis",
    experience: "7 years",
    rating: "⭐⭐⭐⭐⭐",
    specialty: "All Pets",
    rate: "$35/hour",
    image: "👩‍🦰",
    details: "Emma is our most experienced sitter, caring for all types of pets including exotic animals. Veterinary assistant background.",
    availability: "Mon-Sun: 8am-10pm"
  },
  {
    id: 4,
    name: "John Smith",
    experience: "4 years",
    rating: "⭐⭐⭐⭐",
    specialty: "Dogs",
    rate: "$28/hour",
    image: "👨‍🦱",
    details: "John is passionate about dogs and offers personalized care. He provides updates with photos and is great with nervous pets.",
    availability: "Tue-Sat: 9am-7pm"
  }
];

// ===========================
// AUTHENTICATION - SIGNUP
// ===========================
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const messageElement = document.getElementById('signupMessage');
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      messageElement.textContent = "User already exists!";
      messageElement.className = 'error';
      return;
    }
    
    // Add new user
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    messageElement.textContent = "Signup successful! Redirecting to login...";
    messageElement.className = 'success';
    signupForm.reset();
    
    // Redirect to login page
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
}

// ===========================
// AUTHENTICATION - LOGIN
// ===========================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const messageElement = document.getElementById('loginMessage');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Store current user as string (matching your original format)
      localStorage.setItem('currentUser', email);
      window.location.href = "home.html";
    } else {
      messageElement.textContent = "Invalid credentials!";
      messageElement.className = 'error';
    }
  });
}

// ===========================
// USER INFO DISPLAY
// ===========================
function displayUserInfo() {
  const currentUser = localStorage.getItem('currentUser');
  const welcomeText = document.getElementById('welcomeText');
  
  if (currentUser && welcomeText) {
    welcomeText.textContent = `Hello, ${currentUser}!`;
  } else if (welcomeText) {
    // If no user is logged in, redirect to login page
    window.location.href = 'index.html';
  }
}

// ===========================
// LOGOUT FUNCTIONALITY
// ===========================
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  });
}

// ===========================
// HOME PAGE PROTECTION
// ===========================
if (window.location.pathname.includes("home.html")) {
  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) {
    window.location.href = "index.html";
  }
}

// ===========================
// PET PROFILE PAGE PROTECTION
// ===========================
if (window.location.pathname.includes("pet-profile.html")) {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = "index.html";
  }
}

// ===========================
// DISPLAY DOGS CARDS
// ===========================
function displayDogs() {
  const dogsContainer = document.getElementById('dogsContainer');
  if (!dogsContainer) return;
  
  dogsContainer.innerHTML = dogs.map(dog => `
    <div class="card" data-type="pet" data-name="${dog.name.toLowerCase()}" data-breed="${dog.breed.toLowerCase()}">
      <div class="card-emoji">${dog.image}</div>
      <h3>${dog.name}</h3>
      <p class="card-subtitle">${dog.breed}</p>
      <p><strong>Age:</strong> ${dog.age}</p>
      <p>${dog.description}</p>
      <button class="card-btn" onclick="viewPetDetails(${dog.id})">View Details</button>
    </div>
  `).join('');
}

// ===========================
// DISPLAY SITTERS CARDS
// ===========================
function displaySitters() {
  const sittersContainer = document.getElementById('sittersContainer');
  if (!sittersContainer) return;
  
  sittersContainer.innerHTML = sitters.map(sitter => `
    <div class="card" data-type="sitter" data-name="${sitter.name.toLowerCase()}" data-specialty="${sitter.specialty.toLowerCase()}">
      <div class="card-emoji">${sitter.image}</div>
      <h3>${sitter.name}</h3>
      <p class="card-subtitle">${sitter.specialty}</p>
      <p><strong>Experience:</strong> ${sitter.experience}</p>
      <p><strong>Rating:</strong> ${sitter.rating}</p>
      <p><strong>Rate:</strong> ${sitter.rate}</p>
      <button class="card-btn" onclick="viewSitterDetails(${sitter.id})">View Details</button>
    </div>
  `).join('');
}

// ===========================
// SEARCH FUNCTIONALITY
// ===========================
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    // Clear results if search is empty
    if (query === '') {
      searchResults.innerHTML = '';
      showAllCards();
      return;
    }
    
    // Filter pets
    const matchingPets = dogs.filter(dog => 
      dog.name.toLowerCase().includes(query) || 
      dog.breed.toLowerCase().includes(query)
    );
    
    // Filter sitters
    const matchingSitters = sitters.filter(sitter => 
      sitter.name.toLowerCase().includes(query) || 
      sitter.specialty.toLowerCase().includes(query)
    );
    
    // Display search results
    displaySearchResults(matchingPets, matchingSitters);
    
    // Filter cards on the page
    filterCards(query);
  });
}

// Display search results dropdown
function displaySearchResults(pets, sitters) {
  const searchResults = document.getElementById('searchResults');
  if (!searchResults) return;
  
  searchResults.innerHTML = '';
  
  // Add pets section
  if (pets.length > 0) {
    const petsHeader = document.createElement('li');
    petsHeader.innerHTML = '<strong style="color: var(--primary); font-size: 14px; display: block; padding: 8px; border-bottom: 1px solid #e8f4f8;">🐶 Pets</strong>';
    searchResults.appendChild(petsHeader);
    
    pets.forEach(pet => {
      const li = document.createElement('li');
      li.className = 'result-item';
      li.innerHTML = `
        <span>${pet.image} ${pet.name} - ${pet.breed}</span>
        <button class="btn-ghost" style="padding: 5px 10px; font-size: 12px;" onclick="viewPetDetails(${pet.id})">View</button>
      `;
      searchResults.appendChild(li);
    });
  }
  
  // Add sitters section
  if (sitters.length > 0) {
    const sittersHeader = document.createElement('li');
    sittersHeader.innerHTML = '<strong style="color: var(--secondary); font-size: 14px; display: block; padding: 8px; border-bottom: 1px solid #e8f4f8; margin-top: 10px;">👩‍🦰 Sitters</strong>';
    searchResults.appendChild(sittersHeader);
    
    sitters.forEach(sitter => {
      const li = document.createElement('li');
      li.className = 'result-item';
      li.innerHTML = `
        <span>${sitter.image} ${sitter.name} - ${sitter.specialty}</span>
        <button class="btn-ghost" style="padding: 5px 10px; font-size: 12px;" onclick="viewSitterDetails(${sitter.id})">View</button>
      `;
      searchResults.appendChild(li);
    });
  }
  
  // No results found
  if (pets.length === 0 && sitters.length === 0) {
    searchResults.innerHTML = '<li style="padding: 12px; text-align: center; color: var(--text-muted);">No results found</li>';
  }
}

// Filter cards on the page
function filterCards(query) {
  const allCards = document.querySelectorAll('.card[data-type]');
  
  allCards.forEach(card => {
    const name = card.getAttribute('data-name');
    const breed = card.getAttribute('data-breed');
    const specialty = card.getAttribute('data-specialty');
    
    const matches = 
      name.includes(query) || 
      (breed && breed.includes(query)) || 
      (specialty && specialty.includes(query));
    
    card.style.display = matches ? 'block' : 'none';
  });
}

// Show all cards
function showAllCards() {
  const allCards = document.querySelectorAll('.card[data-type]');
  allCards.forEach(card => {
    card.style.display = 'block';
  });
}

// ===========================
// NAVIGATION FUNCTIONS
// ===========================
function viewPetDetails(id) {
  window.location.href = `pet-details.html?id=${id}`;
}

function viewSitterDetails(id) {
  window.location.href = `sitter-details.html?id=${id}`;
}

// ===========================
// PET DETAILS PAGE
// ===========================
function loadPetDetails() {
  const petDetailsContainer = document.getElementById('petDetails');
  if (!petDetailsContainer) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const petId = parseInt(urlParams.get('id'));
  const pet = dogs.find(d => d.id === petId);
  
  if (pet) {
    petDetailsContainer.innerHTML = `
      <div class="detail-card">
        <div class="detail-emoji">${pet.image}</div>
        <h2>${pet.name}</h2>
        <p class="detail-subtitle">${pet.breed}</p>
        <div class="detail-info">
          <p><strong>Age:</strong> ${pet.age}</p>
          <p><strong>Description:</strong> ${pet.description}</p>
          <p><strong>About:</strong> ${pet.details}</p>
        </div>
        <button class="card-btn" onclick="adoptPet(${pet.id}, '${pet.name}')">Adopt ${pet.name}</button>
        <button class="btn-ghost" style="margin-top: 10px;" onclick="window.location.href='home.html'">Back to Home</button>
      </div>
    `;
  } else {
    petDetailsContainer.innerHTML = '<p>Pet not found.</p>';
  }
}

// ===========================
// SITTER DETAILS PAGE
// ===========================
function loadSitterDetails() {
  const sitterDetailsContainer = document.getElementById('sitterDetails');
  if (!sitterDetailsContainer) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const sitterId = parseInt(urlParams.get('id'));
  const sitter = sitters.find(s => s.id === sitterId);
  
  if (sitter) {
    sitterDetailsContainer.innerHTML = `
      <div class="detail-card">
        <div class="detail-emoji">${sitter.image}</div>
        <h2>${sitter.name}</h2>
        <p class="detail-subtitle">${sitter.specialty}</p>
        <div class="detail-info">
          <p><strong>Experience:</strong> ${sitter.experience}</p>
          <p><strong>Rating:</strong> ${sitter.rating}</p>
          <p><strong>Rate:</strong> ${sitter.rate}</p>
          <p><strong>Availability:</strong> ${sitter.availability}</p>
          <p><strong>About:</strong> ${sitter.details}</p>
        </div>
        <button class="card-btn" onclick="bookSitter(${sitter.id}, '${sitter.name}')">Book ${sitter.name}</button>
        <button class="btn-ghost" style="margin-top: 10px;" onclick="window.location.href='home.html'">Back to Home</button>
      </div>
    `;
  } else {
    sitterDetailsContainer.innerHTML = '<p>Sitter not found.</p>';
  }
}

// ===========================
// ACTION FUNCTIONS
// ===========================
function adoptPet(id, name) {
  alert(`Great choice! You're interested in adopting ${name}. We'll contact you soon!`);
}

function bookSitter(id, name) {
  alert(`Booking ${name}! We'll confirm your appointment shortly.`);
}

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const message = document.getElementById('message').value;
    const messageElement = document.getElementById('contactMessage');
    
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:sanjay@dvorakinnovation.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    messageElement.textContent = 'Opening your email client...';
    messageElement.className = 'success';
  });
}

// ===========================
// PAGE INITIALIZATION
// ===========================
window.addEventListener('DOMContentLoaded', () => {
  // Home page initialization
  if (document.getElementById('dogsContainer')) {
    displayUserInfo();
    displayDogs();
    displaySitters();
    setupSearch();
  } 
  // Pet details page
  else if (document.getElementById('petDetails')) {
    loadPetDetails();
  } 
  // Sitter details page
  else if (document.getElementById('sitterDetails')) {
    loadSitterDetails();
  }
});