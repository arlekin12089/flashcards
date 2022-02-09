const showBtn = document.getElementById('show-btn');
const addContainer = document.getElementById('card-window');
const closeBtn = document.getElementById('close');
const questionFront = document.getElementById('question');
const answerBack = document.getElementById('answer');
const saveBtn = document.getElementById('save-card');
const errorMessage = document.querySelector('.error-message');
const cardWrapper = document.getElementById("card-list");
const clearBtn = document.getElementById("clear");
const search = document.getElementById("search");

// Store DOM cards
let cardsList = [];

// Store card info
let cardsInfo = getCardsData();

//Show add container block
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
closeBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Create a single card in DOM
function createCard(info, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-container">
  		<div class="inner-card-front">
			<h2 class="mb20">Question:</h2>
			<p class="card-front">
			${info.front}
			</p>
	 	</div>
	 	<div class="inner-card-back">
	 		<h2 class="mb20">Answer:</h2>
			<p class="card-back">
			${info.back}
			</p>
  		</div>
		<div class="actions">
			<a href="#" id="delete" class="delete"><i class="far fa-trash-alt" id="remove-button"></i></a>
			<a href="#" id="flip"><i class="fas fa-redo-alt" id="flip-button"></i></a>
		</div>
	</div>
  `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM cards
  cardsList.push(card);
  cardWrapper.appendChild(card);

  const deleteCard = card.getElementsByClassName("delete");
  deleteCard[0].addEventListener("click", (e) => {
    cardsList.splice(index, 1);
    cardWrapper.removeChild(card);
    cardsInfo.splice(index, 1); //remove from localStorage data
    setCardsData(cardsInfo); //update Local storage
  });
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

// Add new card
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let front = questionFront.value;
  let back = answerBack.value;
  if (front !== "" && back !== "") {
    const newCard = { front, back };
    createCard(newCard);
    questionFront.value = "";
    answerBack.value = "";
    addContainer.classList.remove("show");
    cardsInfo.push(newCard);
    setCardsData(cardsInfo);
  } else {
    errorMessage.classList.add("show");
  }
});

// Create all cards
function createCards() {
  cardsInfo.forEach((info, index) => createCard(info, index));
}
createCards();

// Clear cards button
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardWrapper.innerHTML = "";
  window.location.reload();
});