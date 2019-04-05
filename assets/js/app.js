document.addEventListener("DOMContentLoaded", () => {
  // Store API Giphy Key
  const API_KEY = "g6htg7nRAnHgje4mKdR6pFF8WisPUXIW";
  // Set initial array of topics
  let topics = ["flossing", "carlton dance", "teach me how to dougie", "breakdance", "macarena", "shuffling", "tap dance", "running man", "cabbage patch dance", "vogue", "hotline bling", "shiggy"];
  // Let search be random onload
  let search = topics[Math.floor(Math.random() * Math.floor(topics.length))];
  // main#content
  let container = document.querySelector("#content");
  // callAPI function with the search term as the argument
  const callAPI = (search) => {
    // Replace space with + to conform to API's search term guidelines
    search = search.replace(" ", "+");
    // A pointer to the queryURL
    // This variable will account for the `search` term and API_KEY
    // limit=10 is hard-coded and so is the rating (G)
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}&limit=10&rating=g`;
    // If browser supports fetch
    if (window.fetch) {
      fetch(queryURL, {
        method: "GET"
      })
        .then(result => result.json())
        .then(response => {
          // console.log(`fetch => ${response}`);
          // See function below for detailed line-by-line comments
          renderGifs(response);
        });
    // Use XML Http Request Protocol instead of fetch
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", queryURL);
      xhr.onload = event => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.response);
            // console.log(`xhr => ${response.data}`);
            // See function below for detailed line-by-line comments
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
  // Add a topic into the `topics` array
  const addTopic = (item) => {
    topics.push(item);
    // Render buttons once more based on the addition of the latest topic added
    renderButtons();
    // Reset form
    document.querySelector("form").reset();
  }
  // Button click function
  const buttonClick = (event) => {
    if (event.target.type === "button") {
      // Call the API with the clicked button as the topic/search term
      callAPI(event.target.textContent.replace(" ", "+"));
    }
  }
  // Function to render the button
  const renderButtons = () => {
    // Empty the nav
    document.querySelector("nav").innerHTML = "";
    // Loop through the topics array
    topics.forEach(topic => {
      let button = document.createElement("button");
      button.setAttribute("type", "button");
      button.innerHTML = topic;
      button.classList.add("bn", "br3", "bg-washed-blue", "black", "dib", "dim", "f6", "input-reset", "link", "lh-copy", "mb2", "mr2", "ph2", "pointer", "pv1");
      document.querySelector("header").lastElementChild.appendChild(button);
    });
  }
  // Function to render the gifs into target container
  const renderGifs = (response) => {
    // Store data into results variable
    let results = response.data;
    // Loop through the results
    results.forEach(result => {
      // Determine the necessary parts that make up a gif-item
      // A still image
      // A div that has a p with a text of the corresponding rating
      let div = document.createElement("div"),
        cardCopyDiv = document.createElement("div"),
        image = document.createElement("img"),
        ratingP = document.createElement("p");
      div.classList.add("gif-item", "dib", "mb3", "mr3");
      image.setAttribute("src", result.images.fixed_width_still.url);
      image.classList.add("br2", "br--top", "bn", "bt", "db", "pointer");
      // A click handler that will toggle the animation from still <-> animated (webp)
      image.addEventListener("click", toggleAnimation);
      cardCopyDiv.classList.add("bg-white", "br2", "br--bottom", "bt", "b--black-10", "flex", "mt0", "pa2");
      ratingP.classList.add("ma0");
      ratingP.innerHTML = `<strong>Rating</strong> ${result.rating.toUpperCase()}`;
      // Assemble the elements!
      div.appendChild(image);
      div.appendChild(cardCopyDiv);
      cardCopyDiv.appendChild(ratingP);
      container.prepend(div);
    });
  }
  // A function that will loop through the gifs rendered into the DOM
  // and change the .webp file extension into the still image gif
  const resetAllGifs = () => {
    let allGifs = document.querySelectorAll(".gif-item");
    allGifs.forEach(gif => {
      let imageURL = gif.firstElementChild.getAttribute("src");
      gif.firstElementChild.setAttribute("src", imageURL.replace(".webp", "_s.gif"));
    });
  }
  // A function that will toggle the animation
  // still gif <-> webp
  const toggleAnimation = (event) => {
    event.preventDefault();
    let imageURL = event.target.getAttribute("src");
    // If event.target is still image, change it to animated
    if (imageURL.substr(imageURL.length-6) === "_s.gif") {
      // resetAllGifs function will ensure only one gif is playing at a time
      resetAllGifs();
      event.target.setAttribute("src", imageURL.replace("_s.gif", ".webp"));
    }
    // If event.target is animated, change it to still image
    if (imageURL.substr(imageURL.length-5) === ".webp") {
      event.target.setAttribute("src", imageURL.replace(".webp", "_s.gif"));
    }
  }
  // Call the API onload with a random search term
  callAPI(search);
  // Render the buttons onload
  renderButtons();
  // Click handler for the add button. Also works when user
  // inputs text into the text field and hits Enter/Return
  document.querySelector("#btn-add").addEventListener("click", (event) => {
    // Trim unnecessary leading/trailing spaces for `searchValue`
    let searchValue = document.querySelector("#search").value.trim();
    // If searchValue is nothing, do nothing, otherwise, addTopic() of `searchValue`
    (searchValue === "") ? "" : addTopic(searchValue);
  });
  // Bubble up to header with the buttonClick function
  document.querySelector("header").addEventListener("click", buttonClick);
  // Prevent form's default behavior
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
  });
});