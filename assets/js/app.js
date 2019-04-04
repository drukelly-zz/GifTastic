document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "g6htg7nRAnHgje4mKdR6pFF8WisPUXIW";

  let topics = ["flossing", "carlton dance", "doughie", "electric slide", "two step", "breakdance", "pop and locking", "nae nae", "macarena", "shuffling", "tap", "running man", "cabbage patch dance"];
  let search = topics[Math.floor(Math.random() * Math.floor(topics.length))];
  let container = document.querySelector("#content");

  let queryURL = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}&limit=10&rating=g`;

  const callAPI = () => {
    if (window.fetch) {
      fetch(queryURL, {
        method: "GET"
      })
        .then(result => result.json())
        .then(response => {
          // console.log(`fetch => ${response}`);
          renderGrid(response);
        });
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", queryURL);
      xhr.onload = event => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.response);
            // console.log(`xhr => ${response.data}`);
            renderGrid(response);
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
  }
  callAPI();
  const buttonClick = (event) => {
    if (event.target.type === "button") {
      console.log(event.target.textContent.replace(" ", "+"));
    }
  }
  const renderGrid = (response) => {
    let results = response.data;
    results.forEach(result => {
      let div = document.createElement("div"),
        cardCopyDiv = document.createElement("div"),
        image = document.createElement("img"),
        ratingP = document.createElement("p"),
        faveP = document.createElement("p");
      div.classList.add("dib", "mb3", "mr3");
      image.setAttribute("src", result.images.fixed_width_still.url);
      image.classList.add("br2", "br--top", "bn", "bt", "db", "pointer");
      cardCopyDiv.classList.add("bg-white", "br2", "br--bottom", "flex", "mt0", "pa2");
      ratingP.classList.add("ma0");
      ratingP.innerHTML = `<strong>Rating</strong> ${result.rating.toUpperCase()}`;
      faveP.classList.add("ma0", "ml-auto");
      faveP.innerHTML = `<a href="#" class="btn-favorite gray"><i class="demo-icon icon-heart"></i></a>`;
      div.appendChild(image);
      div.appendChild(cardCopyDiv);
      cardCopyDiv.appendChild(ratingP);
      cardCopyDiv.appendChild(faveP);
      container.prepend(div);
    });
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