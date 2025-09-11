const reveal = Array.from(
  document.getElementsByClassName("reveal_to_l")
).concat(
  Array.from(document.getElementsByClassName("reveal_to_r")).concat(
    Array.from(document.getElementsByClassName("reveal_to_t"))
  )
);
console.log(reveal);

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
