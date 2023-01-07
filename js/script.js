const selectTag = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const translatebtn = document.querySelector("button");
const exchangeIcon = document.querySelector(".fa-exchange-alt");
const icons = document.querySelectorAll(".icons");
const transBox = document.querySelector(".trans-box");
const container = document.querySelector(".container");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "es-ES") {
      selected = "selected";
    }
    const html = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML(`beforeend`, html);
  }
});

exchangeIcon.addEventListener("click", () => {
  [fromText.value, toText.value] = [toText.value, fromText.value];
  [selectTag[0].value, selectTag[1].value] = [
    selectTag[1].value,
    selectTag[0].value,
  ];
});

translatebtn.addEventListener("click", function (e) {
  e.preventDefault();
  let text = fromText.value;
  if (!text) return;
  let translateFrom = selectTag[0].value;
  let translateTo = selectTag[1].value;
  const apiurl = `https:api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  fetch(apiurl)
    .then((res) => {
      responseClone = res.json();
      return responseClone;
    })
    .then(
      (data) => {
        toText.value = data.responseData.translatedText;
      },
      function (rejectionReason) {
        // 3
        console.log(
          "Error parsing JSON from response:",
          rejectionReason,
          responseClone
        ); // 4
        responseClone
          .text() // 5
          .then(function (bodyText) {
            console.log(
              "Received the following instead of valid JSON:",
              bodyText
            ); // 6
          });
      }
    );

  const after = `<br /><br />
      <div class="word-by-word">Word by word</div><br />
      <hr /><br />`;

  // additional
  const wordByWord = async function () {
    const words = fromText.value.split(" ");
    for (let word in words) {
      const apiurl = `https:api.mymemory.translated.net/get?q=${words[word]}&langpair=${translateFrom}|${translateTo}`;

      const res = await fetch(apiurl);
      const data = await res.json();

      const html = ` <textarea class="trans from" readonly>${words[word]}</textarea>
        <textarea class="trans to" readonly>${data.responseData.translatedText}</textarea>`;

      transBox.insertAdjacentHTML("beforeend", html);
    }
  };

  transBox.innerHTML = "";
  transBox.insertAdjacentHTML("beforeend", after);

  wordByWord();
});

icons.forEach((icons) => {
  icons.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.classList.contains("from")) {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      if ("speechSynthesis" in window) {
        let utterance;
        if (target.classList.contains("from")) {
          utterance = new SpeechSynthesisUtterance(fromText.value);
          utterance.lang = selectTag[0].value;
        } else {
          utterance = new SpeechSynthesisUtterance(toText.value);
          utterance.lang = selectTag[1].value;
        }
        speechSynthesis.speak(utterance);
      } else {
        alert("Speech synthesis is not supported in this browser.");
      }
    }
  });
});
