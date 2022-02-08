const showBtn = document.getElementById("show-btn");
const addContainer = document.getElementById("card-window");
const closeBtn = document.getElementById("close");
const saveBtn = document.getElementById("save-card");

//Show add container block
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
closeBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new card

saveBtn.addEventListener("click", () => {});