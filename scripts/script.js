const showBtn = document.getElementById('show-btn');
const addContainer = document.getElementById('card-window');
const closeBtn = document.getElementById('close');
const questionFront = document.getElementById('question');
const answerBack = document.getElementById('answer');
const saveBtn = document.getElementById('save-card');
const errorMessage = document.querySelector('.error-message');
const cardList = document.getElementById('card-list');
const clearBtn = document.getElementById('clear');

// Store DOM cards
const cardsList = [];

//Show add container block
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
closeBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Store cards
const cardsInfo = getCardsInfo();

// Create all cards
function createCards() {
  cardsInfo.forEach((info, index) => createCard(info, index));
}

// Create a single card in DOM
function createCard(info, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="card-container">
  <div class="inner-card-front">
    <p class="card-front">
      ${info.front}
    </p>
  </div>
  <div class="inner-card-back">
    <p class="card-back">
      ${info.back}
    </p>
  </div>
  <a href="#" id="delete"><i class="far fa-trash-alt icon" id="remove-button"></i></a>
  <a href="#" id="flip"><i class="fas fa-redo-alt icon" id="flip-button"></i></a>
</div>
  `;
  card.addEventListener('click', () => card.classList.toggle('show-answer'));
  // Add to DOM cards
  cardsList.push(card);
  cardList.appendChild(card);
}

// Get cards from local storage
function getCardsInfo() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsInfo(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Add new card
saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const front = questionFront.value;
  const back = answerBack.value;
  if (front !== '' && back !== '') {
    const newCard = { front, back };
    createCard(newCard);
    front.value = '';
    back.value = '';
    addContainer.classList.remove('show');
    const deleteBtn = document.getElementById('delete');
    // Clear cards button

    deleteBtn.addEventListener('click', () => {
      localStorage.clear();
      cardList.innerHTML = '';
      window.location.reload();
    });

    front.value = '';
    back.value = '';
    addContainer.classList.remove('show');
    cardsInfo.push(newCard);
    setCardsInfo(cardsInfo);
  } else {
    errorMessage.classList.add('show');
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardList.innerHTML = '';
  window.location.reload();
});
