document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "g6htg7nRAnHgje4mKdR6pFF8WisPUXIW";
  let topics = ["flossing", "carlton dance", "teach me how to dougie", "breakdance", "macarena", "shuffling", "tap dance", "running man", "cabbage patch dance", "vogue", "hotline bling", "shiggy"];
  let search = topics[Math.floor(Math.random() * Math.floor(topics.length))];
  let container = document.querySelector("#content");
  const callAPI = (search) => {
    search = search.replace(" ", "+");
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}&limit=10&rating=g`;
    if (window.fetch) {
      fetch(queryURL, {
        method: "GET"
      })
        .then(result => result.json())
        .then(response => {
          // console.log(`fetch => ${response}`);
          renderGifs(response);
        });
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", queryURL);
      xhr.onload = event => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.response);
            // console.log(`xhr => ${response.data}`);
            renderGifs(response);
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
  const addTopic = (item) => {
    topics.push(item);
    renderButtons();
    document.querySelector("form").reset();
  }
  const buttonClick = (event) => {
    if (event.target.type === "button") {
      callAPI(event.target.textContent.replace(" ", "+"));
    }
  }
  const renderButtons = () => {
    document.querySelector("nav").innerHTML = "";
    topics.forEach(topic => {
      let button = document.createElement("button");
      button.setAttribute("type", "button");
      button.innerHTML = topic;
      button.classList.add("bn", "br3", "bg-washed-blue", "black", "dib", "dim", "f6", "input-reset", "link", "lh-copy", "mb2", "mr2", "ph2", "pointer", "pv1");
      document.querySelector("header").lastElementChild.appendChild(button);
    });
  }
  const renderGifs = (response) => {
    let results = response.data;
    results.forEach(result => {
      let div = document.createElement("div"),
        cardCopyDiv = document.createElement("div"),
        image = document.createElement("img"),
        ratingP = document.createElement("p");
      div.classList.add("gif-item", "dib", "mb3", "mr3");
      image.setAttribute("src", result.images.fixed_width_still.url);
      image.classList.add("br2", "br--top", "bn", "bt", "db", "pointer");
      image.addEventListener("click", toggleAnimation);
      cardCopyDiv.classList.add("bg-white", "br2", "br--bottom", "bt", "b--black-10", "flex", "mt0", "pa2");
      ratingP.classList.add("ma0");
      ratingP.innerHTML = `<strong>Rating</strong> ${result.rating.toUpperCase()}`;
      div.appendChild(image);
      div.appendChild(cardCopyDiv);
      cardCopyDiv.appendChild(ratingP);
      container.prepend(div);
    });
  }
  const resetAllGifs = () => {
    let allGifs = document.querySelectorAll(".gif-item");
    allGifs.forEach(gif => {
      let imageURL = gif.firstElementChild.getAttribute("src");
      gif.firstElementChild.setAttribute("src", imageURL.replace(".webp", "_s.gif"));
    });
  }
  const toggleAnimation = (event) => {
    event.preventDefault();
    resetAllGifs();
    let imageURL = event.target.getAttribute("src");
    if (imageURL.substr(imageURL.length-6) === "_s.gif") {
      event.target.setAttribute("src", imageURL.replace("_s.gif", ".webp"));
    }
    if (imageURL.substr(imageURL.length-5) === ".webp") {
      event.target.setAttribute("src", imageURL.replace(".webp", "_s.gif"));
    }
  }
  callAPI(search);
  renderButtons();
  document.querySelector("#btn-search").addEventListener("click", (event) => {
    let searchValue = document.querySelector("#search").value.trim();
    (searchValue === "") ? "" : addTopic(searchValue);
  });
  document.querySelector("header").addEventListener("click", buttonClick);
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
  });
});