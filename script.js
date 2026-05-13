let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

// Base URL for the Marvel characters API on localhost:5500
// const baseUrl = "http://172.20.122.241:5500/api/marvel-characters";
const baseUrl = "http://localhost:5500/api/superhero-characters";

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

// Autocomplete: fetch a Marvel character based on user input
input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return;
  }

  // Fetch character data from our Express API
  const url = `${baseUrl}/${input.value}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Error fetching character data.");
      return;
    }
    const character = await response.json();
    
    // Create a single autocomplete suggestion based on the returned character name
    let name = character.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", `displayWords('${name}')`);
    let word = "<b>" + name.substr(0, input.value.length) + "</b>" + name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  } catch (error) {
    console.error("Error:", error);
  }
});

// Button click: fetch and display the Marvel character details
button.addEventListener("click", async () => {
  if (input.value.trim().length < 1) {
    alert("Input cannot be blank");
    return;
  }
  showContainer.innerHTML = "";
  const url = `${baseUrl}/${input.value}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      showContainer.innerHTML = "<p>Character not found</p>";
      return;
    }
    const character = await response.json();
    showContainer.innerHTML = `<div class="card-container">
      <div class="container-character-image">
        <img src="${character.image}" alt="${character.name}" />
      </div>
      <div class="character-name">${character.name}</div>
      <div class="character-description">${character.description}</div>
    </div>`;
  } catch (error) {
    console.error("Error:", error);
  }
});

// Optionally, run an initial fetch on window load if desired.
window.onload = () => {
  // You can trigger a default search or simply clear the display.
};