document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "g6htg7nRAnHgje4mKdR6pFF8WisPUXIW";

  let topics = ["dog", "cat", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
  let animal = topics[0];
  
  let queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=${API_KEY}&limit=10`;

  if (window.fetch) {
    fetch(queryURL, {
      method: "GET"
    })
      .then(result => result.json())
      .then(response => {
        // console.log(`fetch => ${response}`);
        console.log(response.data);
      });
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", queryURL);
    xhr.onload = event => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.response);
          console.log(`xhr => ${response}`);
        } else {
          console.error(xhr.responseText);
        }
      }
    };
    xhr.onerror = event => {
      console.error(xhr.responseText);
    };
    xhr.send();
  }

  const buttonClick = (event) => {
    if (event.target.type === "button") {
      console.log(event.target.textContent.replace(" ", "+"));
    }
  }

  topics.forEach(topic => {
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.innerHTML = topic;
    button.classList.add("bn", "br3", "bg-washed-blue", "black", "dib", "dim", "f6", "input-reset", "link", "lh-copy", "mb2", "mr2", "ph2", "pointer", "pv1");
    document.querySelector("header").lastElementChild.appendChild(button);
  });

  document.querySelector("#btn-search").addEventListener("click", (event) => {
    let searchValue = document.querySelector("#search").value;
    (searchValue === "") ? "" : console.log(searchValue);
  });

  document.querySelector("header").addEventListener("click", buttonClick);
});