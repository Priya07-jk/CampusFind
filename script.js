const itemInput = document.getElementById("itemInput");
const locationInput = document.getElementById("locationInput");
const typeSelect = document.getElementById("typeSelect");
const contactInput = document.getElementById("contact");
const addBtn = document.getElementById("addBtn");
const itemsList = document.getElementById("itemsList");
const searchInput = document.getElementById("searchInput");

// Load items
let items = JSON.parse(localStorage.getItem("campusItems")) || [];

// Render items
function renderItems(filteredItems = items) {
  itemsList.innerHTML = "";

  filteredItems.forEach((item, index) => {
    const div = document.createElement("div");

    let statusClass = item.claimed ? "claimed" : item.type.toLowerCase();
    div.className = `item ${statusClass}`;

    div.innerHTML = `
      <span>
        <b>${item.claimed ? "CLAIMED" : item.type}:</b>
        ${item.name} @ ${item.location}<br>
        📞 <em>${item.contact}</em><br>
        <small>(${item.time})</small>
      </span>

      <div>
        ${
          item.claimed
            ? ""
            : `<button onclick="markClaimed(${index})">Claimed</button>`
        }
        <button onclick="deleteItem(${index})">Delete</button>
      </div>
    `;

    itemsList.appendChild(div);
  });

  localStorage.setItem("campusItems", JSON.stringify(items));
}

// Add item
addBtn.addEventListener("click", () => {
  const name = itemInput.value.trim();
  const location = locationInput.value.trim();
  const type = typeSelect.value;
  const contact = contactInput.value.trim();

  if (!name || !location || !contact) {
    alert("Please fill all fields");
    return;
  }

  const time = new Date().toLocaleString();

  items.push({
    name,
    location,
    type,
    contact,
    time,
    claimed: false
  });

  renderItems();

  itemInput.value = "";
  locationInput.value = "";
  contactInput.value = "";
});

// Mark item as claimed
function markClaimed(index) {
  items[index].claimed = true;
  renderItems();
}

// Delete item
function deleteItem(index) {
  items.splice(index, 1);
  renderItems();
}

// Search
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(value) ||
    item.location.toLowerCase().includes(value)
  );

  renderItems(filtered);
});

// Initial render
renderItems();
