// container
const myCard = document.getElementById("container");
// JsonPlaceHolder
const url = "https://jsonplaceholder.typicode.com/";
const endPoint = "photos";
const querrString = "?_limit=6";
//  nuovo index
let newIndex = 0;
// Generare per ogni card un'immagine, un commento, l'immagine della card precedente e quella successiva
function generare() {
  let template = "";
  axios.get(url + endPoint + querrString).then((res) => {
    console.log(res.data);
    // Ho generato tutte le card con i loro commenti
    for (let i = 0; i < res.data.length; i++) {
      template += `<div class="debug " id="card"> <span> <img id="pin" src="./img/pin.svg" alt="" /></span>
       <img src="${res.data[i].url}" alt="" id="img" class="imgs" />
        <p id="comment" class="comments">
      ${
        res.data[i].title.charAt(0).toUpperCase() + res.data[i].title.slice(1)
      }</p> </div>`;
      // esco Quando avro 6 risposte(6 img e 6 commenti)
      if (i === 5) {
        myCard.innerHTML += template;
      }
    }
    //Seleziono tutte le immagini generate
    const images = document.querySelectorAll(".imgs");
    // Overlay
    const overLay = document.getElementById("overlay");
    //  Ciclo nella Node-list 'image' con un indice"
    images.forEach((element, index) => {
      element.addEventListener("click", () => {
        // rimuovo il d-none dal overlay
        overLay.classList.remove("d-none");
        newIndex = index;
        // Aggiornare il resultato del overlay
        overlay(res.data, index);
      });
    });
    // Faccio apparire l'immagine selezionata dopo il click
    function overlay(mydata, index) {
      // Visualizzare l'immagine successiva
      let suggestion = "";
      if (index < 5) {
        suggestion = `
            <img id="suggestion" src="${mydata[index + 1].url}" alt="" />
          `;
      }
      //Tornare alla prima immagine
      else {
        suggestion = `
          <img id="suggestion" src="${mydata[index - 5].url}" alt="" />
        `;
      }
      // Visualizzare l'immagine precedente
      let suggestion2 = "";
      if (index > 0) {
        suggestion2 = `
            <img id="suggestion2" src="${mydata[index - 1].url}" alt="" />
          `;
      }
      //Accedere all'ultima immagine.
      else {
        suggestion2 = `
          <img id="suggestion2" src="${mydata[index + 5].url}" alt="" />
        `;
      }
      // Visualizzare l'immagine selezionata nell'overlay con il 3 bottone e il 2 suggestion
      overLay.innerHTML = ` 
            <button type="button" id="button"> <span class="span">Home</span></button>
             <img class="overlay-img" src="${mydata[index].url}" alt=""  /> 
             <div class=" allButtons">
             ${suggestion2}
            <button type="button" id="buttonPrev"> <span class="span">Prev</span></button>
             <button type="button" id="buttonSucc"> <span class="span">Succ</span></button>${suggestion}  
             </div>`;
      //  Button prev
      const buttonPrev = document.getElementById("buttonPrev");
      buttonPrev.addEventListener("click", () => {
        if (newIndex > 0) {
          newIndex--;
        } else {
          newIndex = mydata.length - 1;
        }
        // Aggiornare il resultato del overlay
        overlay(mydata, newIndex);
      });
      //  Button succ
      const buttonSucc = document.getElementById("buttonSucc");
      buttonSucc.addEventListener("click", () => {
        if (newIndex < mydata.length - 1) {
          newIndex++;
        } else {
          newIndex = 0;
        }
        // Aggiornare il resultato del overlay
        overlay(mydata, newIndex);
      });
      // button Home
      const button = document.getElementById("button");
      // Cliccando sul bottone, aggiungo la classe 'd-none' all'overlay (facendo sparire l'overlay)
      button.addEventListener("click", () => {
        overLay.classList.add("d-none");
      });
    }
  });
}

// Tempo di attesa prima di caricare la pagina
// Load-spinner
const load = document.getElementById("loader");
setTimeout(() => {
  load.classList.add("d-none");
}, 1000);
// Il tempo di attesa prima di eseguire la funzione.
const clock = setTimeout(generare, 1000);
