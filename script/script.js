// container
const myCard = document.getElementById("container");
// JsonPlaceHolder
const url = "https://jsonplaceholder.typicode.com/";
const endPoint = "photos";

// Generare per ogni card un immagine e un commento
function generare() {
  let template = "";
  for (let i = 0; i < 6; i++) {
    axios.get(url + endPoint + "?_limit=6").then((res) => {
      console.log(res.data);
      template += `<div class="debug " id="card"> <span> <img id="pin" src="./img/pin.svg" alt="" /></span> <img src="${
        res.data[i].url
      }" alt="" id="img" class="imgs" /> <p id="comment" class="comments">
      ${
        res.data[i].title.charAt(0).toUpperCase() + res.data[i].title.slice(1)
      }</p> </div>`;
      // esci   Quando avro 6 risposte
      if (i === 5) {
        myCard.innerHTML += template;
        // Faccio il resize dell img selezioanata dopo un  click
        const images = document.querySelectorAll(".imgs");
        // Overlay
        const overLay = document.getElementById("overlay");

        //  ciclo nella node liste "image" con un "index"
        images.forEach((element, index) => {
          element.addEventListener("click", () => {
            // rimuovo il d-none dal overlay
            overLay.classList.remove("d-none");
            overLay.innerHTML = `<button type="button" id="button">Indietro</button> <img src="${res.data[index].url}" alt="" /> `;
            // button
            const button = document.getElementById("button");
            // clickando al buttone agguingo il d-none al overlay ( faccio sparire l'overlay)
            button.addEventListener("click", () => {
              overLay.classList.add("d-none");
            });
          });
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
