// Navigation
function showSection(id) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Notes App
function saveNote() {
  const input = document.getElementById("inputNote");
  const value = input.value.trim();
  if (!value) return;
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(value);
  localStorage.setItem("notes", JSON.stringify(notes));
  input.value = "";
  renderNotes();
}

function renderNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const list = document.getElementById("noteList");
  list.innerHTML = "";
  notes.forEach((note, i) => {
    const li = document.createElement("li");
    li.innerText = note;
    li.onclick = () => deleteNote(i);
    list.appendChild(li);
  });
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes"));
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

renderNotes();

// Products
const products = [
  { name: "Laptop", category: "gadgets", price: 700, rating: 5 },
  { name: "Book A", category: "books", price: 20, rating: 4 },
  { name: "Tablet", category: "gadgets", price: 300, rating: 4 },
  { name: "Book B", category: "books", price: 15, rating: 3 }
];

function updateProducts() {
  const category = document.getElementById("category").value;
  const sort = document.getElementById("sort").value;

  let filtered = category === "all" ? [...products] : products.filter(p => p.category === category);

  if (sort === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  display(filtered);
}

function display(items) {
  const container = document.getElementById("output");
  container.innerHTML = "";
  items.forEach(p => {
    const card = `<div class="card">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>${"⭐".repeat(p.rating)}</p>
    </div>`;
    container.innerHTML += card;
  });
}

updateProducts();
