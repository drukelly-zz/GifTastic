document.addEventListener("DOMContentLoaded", () => {
  let topics = ["dog", "cat", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

  const buttonClick = (event) => {
    if (event.target.type === "button") {
      console.log(event.target.textContent.replace(" ", "+"));
    }
  }

  topics.forEach(topic => {
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.innerHTML = topic;
    button.classList.add("lh-copy", "mb2", "mr2");
    document.querySelector("header").lastElementChild.appendChild(button);
  });

  document.querySelector("#btn-search").addEventListener("click", (event) => {
    let searchValue = document.querySelector("#search").value;
    (searchValue === "") ? "" : console.log(searchValue);
  });

  document.querySelector("header").addEventListener("click", buttonClick);
});