// container
const myCard = document.getElementById("container");
// JsonPlaceHolder
const url = "https://jsonplaceholder.typicode.com/";
const endPoint = "photos";
//  nuovo index
let newIndex = 0;

// Generare per ogni card un immagine  un commento e l'img della card precedente
function generare() {
  let template = "";
  for (let i = 0; i < 6; i++) {
    axios.get(url + endPoint + "?_limit=6").then((res) => {
      console.log(res.data);
      // Generato tutti i cards con il loro commento
      template += `<div class="debug " id="card"> <span> <img id="pin" src="./img/pin.svg" alt="" /></span> <img src="${
        res.data[i].url
      }" alt="" id="img" class="imgs" /> <p id="comment" class="comments">
      ${
        res.data[i].title.charAt(0).toUpperCase() + res.data[i].title.slice(1)
      }</p> </div>`;
      // esci   Quando avro 6 risposte(6 img e 6 commenti)
      if (i === 5) {
        myCard.innerHTML += template;
      }
      //tutti l'img generate
      const images = document.querySelectorAll(".imgs");
      // Overlay
      const overLay = document.getElementById("overlay");

      //  ciclo nella node liste "image" con un "index"
      images.forEach((element, index) => {
        element.addEventListener("click", () => {
          // rimuovo il d-none dal overlay
          overLay.classList.remove("d-none");
          newIndex = index;
          overlay(res.data, index);
        });
      });
      // Faccio apparire l'img selezioanata dopo il click
      function overlay(mydata, index) {
        let suggestion = "";
        if (index > 0) {
          suggestion = `
            <img id="suggestion" src="${mydata[index - 1].url}" alt="" />
          `;
        } else {
          suggestion = `
          <img id="suggestion" src="${mydata[index + 5].url}" alt="" />
        `;
        }
        overLay.innerHTML = ` <div class=" allButtons">
            <button type="button" id="buttonPrev"> <span class="span">Prev</span></button>
            <button type="button" id="button"> <span class="span">Home</span></button> 
             <button type="button" id="buttonSucc"> <span class="span">Succ</span></button>
             </div>
             <img class="overlay-img" src="${mydata[index].url}" alt=""  /> ${suggestion}
                `;

        //  Button prev
        const buttonPrev = document.getElementById("buttonPrev");
        buttonPrev.addEventListener("click", () => {
          if (newIndex > 0) {
            newIndex--;
          } else {
            newIndex = mydata.length - 1;
          }
          overlay(mydata, newIndex);
        });
        //  Button succ
        const buttonSucc = document.getElementById("buttonSucc");
        buttonSucc.addEventListener("click", () => {
          if (newIndex < mydata.length) {
            newIndex++;
          } else {
            newIndex = 0;
          }
          overlay(mydata, newIndex);
        });
        // button Home
        const button = document.getElementById("button");
        // clickando sul buttone agguingo il d-none al overlay ( faccio sparire l'overlay)
        button.addEventListener("click", () => {
          overLay.classList.add("d-none");
        });
      }
    });
  }
}
// tempo di attesa prima di carica la paggina
const load = document.getElementById("loader");
setInterval(() => {
  load.classList.add("d-none");
}, 1000);
const clock = setTimeout(generare, 1000);
