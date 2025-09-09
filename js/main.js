const card_colors = ["#FFF4E2", "#FED7CC", "#FAC2BF", "#B8A9DC", "#58A1CA"];

const card_container = document.getElementById("card-container");

card_colors.forEach((color) => {
  let card = document.createElement("div");
  card.className = "card";
  card.style.backgroundColor = color;
  let card_compon1 = document.createElement("div");
  card_compon1.className = "card-compon1";
  card.appendChild(card_compon1);
  let card_compon2 = document.createElement("div");
  card_compon2.className = "card-compon2";
  card.appendChild(card_compon2);
  card_container.appendChild(card);
});
card_container.innerHTML += card_container.innerHTML;

const scrollWidth = card_container.scrollWidth / 2;
card_container.scrollLeft = scrollWidth / 7; //need to adjust

card_container.addEventListener("scroll", () => {
  if (card_container.scrollLeft >= scrollWidth - 0) {
    card_container.scrollLeft -= scrollWidth;
  }
  if (card_container.scrollLeft <= 0) {
    card_container.scrollLeft += scrollWidth;
  }
});
