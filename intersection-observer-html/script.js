const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      // if(entry.isIntersecting){
      //     observer.unobserve(entry.target)
      // }
    });
    console.log(entries);
  },
  { threshold: 1 }
);

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelectorAll(".card:last-child")[0]);
  },
  { rootMargin: "200px" }
);

lastCardObserver.observe(document.querySelectorAll(".card:last-child")[0]);

cards.forEach((card) => {
  observer.observe(card);
});

const cardContainer = document.querySelectorAll(".card-container")[0];

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}
