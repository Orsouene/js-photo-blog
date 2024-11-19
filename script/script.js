// container
const myCard = document.getElementById("container");
// JasonPlaceHolder
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
        images.forEach((element) => {
          element.addEventListener("click", () => {
            element.classList.toggle("resize");
          });
        });
      }
    });
  }
}
generare();
