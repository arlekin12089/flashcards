const showBtn = document.getElementById('show-btn');
const addContainer = document.getElementById('card-window');
const closeBtn = document.getElementById('close');
//Show add container block

showBtn.addEventListener('click', () => addContainer.classList.add('show'));
closeBtn.addEventListener('click', () => addContainer.classList.remove('show'));
