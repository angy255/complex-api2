

document.querySelector("button").addEventListener("click", convertWordToAudio);

function convertWordToAudio() {
const word = document.getElementById("word").value;

  //dictionary api website https://dictionaryapi.dev/

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then((res) => 
      res.json())

    .then((data) => {
      console.log(
        "dictionary sends info", data
      );

      console.log('show me the data', data);

      // document.querySelector("h2").innerText = data[0].phonetic;
      document.querySelector("h2").innerText = ` ${data[0].meanings[0].partOfSpeech} ${data[0].meanings[0].definitions[0].definition} ${data[0].meanings[0].definitions[0]?.example || data[0].meanings[0].definitions[1]?.example || ''}`;
      // here we use || and '' to make sure it populates one or the other or just not undefined if no example exists (for [0] or [1]) the ? makes sure it doesn't crash....found this explanation on chatgpt and reused it for adding audio part below


// find a way to clean up the dom so after a new word is shown, another one appears

      // adding audio here
      const audioUrl = data[0].phonetics[0]?.audio || data[0].phonetics[1]?.audio;

      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play ();
      
      document.querySelector("h3").innerText = `<audio controls src="${audioUrl}"></audio>`;
      } else {
        document.querySelector("h3").innerText = "No audio avaiable.";
        } 
    })
    .catch((err) => {
      console.error("error", err);
    });
 

// next api that uses gif to pull video


const urlNew = `https://api.giphy.com/v1/gifs/search?api_key=e55YGccgW3ta0PpM7qrpU4mdbUlOSIpL&q=${word}}`;

  fetch(urlNew)
    .then((res) => 
      res.json())

    .then((data) => {
      console.log(
        "giphy sends info", data
      );

      console.log('show me the giphs', data);

      // document.querySelector("p").innerText += ` ${data[0].embed_url[0]} `;
      // document.querySelector("p").innerText += ` ${data[1].embed_url[1]} `;
      // document.querySelector("p").innerText += ` ${data[2].embed_url[2]} `;

      document.querySelector("p").innerHTML = `<iframe src="${data.data[0].embed_url}"></iframe>`;


    })
    .catch((err) => {
      console.error("error", err);
    });


}
