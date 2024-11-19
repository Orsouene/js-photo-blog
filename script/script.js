// Immagine
const img = document.getElementById("img");
const imgs = document.querySelectorAll(".imgs");
// Comment
const comment = document.getElementById("comment");
const comments = document.querySelectorAll(".comments");
const url = "https://jsonplaceholder.typicode.com/";
const endPoint = "photos";
// Generare per ogni card un immagine e un commento
for (let i = 0; i < 6; i++) {
  axios.get(url + endPoint + "?_limit=6").then((res) => {
    console.log(res.data);
    imgs[i].src = res.data[i].url;
    comments[i].innerHTML = res.data[i].title;
  });
}
