const ImgXadrez = document.getElementById("Xadrez");
const box1 = document.getElementById("box1");
const boxCalculadora = document.getElementById("boxCalculadora");

ImgXadrez.addEventListener('click', function() {

    if (boxCalculadora.style.display === 'block') {
        boxCalculadora.style.display = 'none';
      } else {
        boxCalculadora.style.display = 'block';
      }
      if (box1.style.display === 'block') {
        box1.style.display = 'none';
      } 

      
});