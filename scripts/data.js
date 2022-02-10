/*
Data view

Card structure:
{
	id: 0,
	front: "Question",
	back: "Answer"
}
*/

//Features: create a card, delete a card, search a card, remove all cards, get all cards from Local Storage
let currentIdCard = 0;
function createCard(front, back) {
  let card = { id: currentIdCard, front: String(front), back: String(back) };
  let cardJSON = JSON.stringify(card);
  localStorage.setItem(card.id, cardJSON);
  currentIdCard++; //increase card's id every time when func calls
  return card;
}

function deleteCard(id) {
  localStorage.removeItem(id);
}

function searchCard(searchText) {
  let arr = getAllCards();
  return arr.filter((card) => {
    return card.front.includes(searchText) || card.back.includes(searchText);
  });
}

function deleteAllCards() {
  localStorage.clear();
}

function getAllCards() {
  let keys = Object.keys(localStorage);
  return keys.map((key) => {
    return JSON.parse(localStorage.getItem(key)); //convert keys array to objects array
  });
}
