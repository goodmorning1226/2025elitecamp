const card_colors = ["#FFF4E2", "#FED7CC", "#FAC2BF", "#B8A9DC", "#58A1CA"];

const card_container = document.getElementById("card-container");

if (card_container) {
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
}

const reveal = Array.from(
  document.getElementsByClassName("reveal_to_l")
).concat(Array.from(document.getElementsByClassName("reveal_to_r")));

if (reveal.length > 0) {
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  reveal.forEach((elem) => io.observe(elem));
}

const reveal_to_t = Array.from(document.getElementsByClassName("reveal_to_t"));

if (reveal_to_t.length > 0) {
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveal_to_t.forEach((elem) => io.observe(elem));
}

const thumbnail_to_r = Array.from(
  document.getElementsByClassName("thumbnail_to_r")
);
const thumbnail_to_l = Array.from(
  document.getElementsByClassName("thumbnail_to_l")
);

if (thumbnail_to_r) {
  thumbnail_to_r.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.cursor = "pointer";
      item.getElementsByTagName("div")[0].style.opacity = "0.8";
      item.getElementsByTagName("div")[0].style.transform = "translateX(0)";
    });
    item.addEventListener("mouseleave", () => {
      item.getElementsByTagName("div")[0].style.opacity = "0";
      item.getElementsByTagName("div")[0].style.transform = "translateX(-100%)";
    });
  });
}
if (thumbnail_to_l) {
  thumbnail_to_l.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.cursor = "pointer";
      item.getElementsByTagName("div")[0].style.opacity = "0.8";
      item.getElementsByTagName("div")[0].style.transform = "translateX(0)";
    });
    item.addEventListener("mouseleave", () => {
      item.getElementsByTagName("div")[0].style.opacity = "0";
      item.getElementsByTagName("div")[0].style.transform = "translateX(100%)";
    });
  });
}
