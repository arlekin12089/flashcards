const showBtn = document.getElementById("show-btn");
const addContainer = document.getElementById("card-window");
const closeBtn = document.getElementById("close");
const questionFront = document.getElementById("question");
const answerBack = document.getElementById("answer");
const saveBtn = document.getElementById("save-card");
const errorMessage = document.querySelector(".error-message");
const cardWrapper = document.getElementById("card-list");
const clearBtn = document.getElementById("clear");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const searchResults = document.getElementById("results");
const errorSearch = document.getElementById("error-search");

//Show add container block
function openAddForm() {
  addContainer.classList.add("show");
  questionFront.value = "";
  errorMessage.style.display = "none";
  answerBack.value = "";
}
//Close form "add a card"
function closeAddForm() {
  addContainer.classList.remove("show");
}
showBtn.addEventListener("click", () => {
  openAddForm();
});
closeBtn.addEventListener("click", () => {
  closeAddForm();
});

//Create card element
function createCardElement(card, onDelete) {
  let cardDOM = document.createElement("div");
  cardDOM.classList.add("card");

  cardDOM.innerHTML = `
  <div class="card-container">
  		<div class="inner-card-front">
			<h2 class="mb20">Question:</h2>
			<p class="card-front">
			${card.front}
			</p>
	 	</div>
	 	<div class="inner-card-back">
	 		<h2 class="mb20">Answer:</h2>
			<p class="card-back">
			${card.back}
			</p>
  		</div>
		<div class="actions">
			<a href="#" id="delete" class="delete"><i class="far fa-trash-alt" id="remove-button"></i></a>
			<a href="#" id="flip"><i class="fas fa-redo-alt" id="flip-button"></i></a>
		</div>
	</div>
  `;

  cardDOM.addEventListener("click", () =>
    cardDOM.classList.toggle("show-answer")
  );

  //Initiate event listener for delete card
  cardDOM
    .getElementsByClassName("delete")[0]
    .addEventListener("click", onDelete);
  return cardDOM;
}

//Show array of cards on the screen
function showCards(arr) {
  cardWrapper.innerHTML = "";
  arr.forEach((card) => {
    let cardDOM = createCardElement(card, () => {
      deleteCard(card.id);
      showCards(getAllCards());
    });
    cardWrapper.appendChild(cardDOM);
  });
}

//Add card to list
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let front = questionFront.value;
  let back = answerBack.value;
  if (front !== "" && back != "") {
    createCard(front, back);
    showCards(getAllCards());
  } else {
    errorMessage.style.display = "block";
  }
  closeAddForm();
});

//Remove all cards from DOM and Local Storage
clearBtn.addEventListener("click", () => {
  cardWrapper.innerHTML = "";
  localStorage.clear();
});

//Search
searchBtn.addEventListener("click", () => {
  let searchValue = search.value;
  let searchArr = searchCard(searchValue);
  showCards(searchArr);
  if (searchArr.length === 0) {
    alert("There are no similar words!");
  }
  search.value = "";
});

showCards(getAllCards());
