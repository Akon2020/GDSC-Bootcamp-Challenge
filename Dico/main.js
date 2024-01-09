const container = document.querySelector(".container"),
  searchInput = container.querySelector("input"),
  synonyms = container.querySelector(".synonyms .list"),
  infoText = container.querySelector(".info-text"),
  volumeIcon = container.querySelector(".word i"),
  searchIcon = container.querySelector(".search #search"),
  removeIcon = container.querySelector(".search span");
let audio;

function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can\'t find the meaning of ${word}. Please try for another word.`;
    infoText.style.color = "#ff0000";
  } else {
    container.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0],
      phonetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text} / `;

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions.definition;
    document.querySelector(".example span").innerText = definitions.example;
    audio = new Audio("https:" + result[0].phonetics[0].audio);

    if (definitions.synonyms[0] == undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      synonyms.parentElement.style.display = "block";
      synonyms.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        let tag = `<span onclick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]}</span>`;
        synonyms.insertAdjacentElement("beforeend, tag");
      }
    }
  }
}

function search(word) {
  searchInput.value = word;
  fetchApi(word);
  container.classList.remove("active");
}

function fetchApi(word) {
  container.classList.remove("active");
  infoText.style.color = "#4d59fb";
  infoText.innerHTML = `Searching the meaning of ${word}`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
  if (container.classList.contains("active")) {
    searchIcon.style.top = "55%";
    removeIcon.style.top = "55%";
  }
});

volumeIcon.addEventListener("click", () => {
  audio.play();
});

removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus;
  container.classList.remove("active");
  infoText.style.color = "#000";
  infoText.innerHTML =
    "Type a word and press enter to get meaning, example, pronunciation and synonyms of that typed word ASAP";
  searchIcon.style.top = "28%";
  removeIcon.style.top = "28%";
});
