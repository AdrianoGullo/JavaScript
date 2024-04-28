document.addEventListener("DOMContentLoaded", function() {
    // Adiciona os event listeners aos botões
    var btnFav1 = document.getElementById('btnFav1');
    var btnFav2 = document.getElementById('btnFav2');
    var btnFav3 = document.getElementById('btnFav3');

    changeButton(btnFav1, btnFav2, btnFav3);
});

function changeButton(btnFav1, btnFav2, btnFav3) {

    btnFav1.addEventListener('click', function() {
        //botões
        btnFav1.classList.remove('btn-secundary');
        btnFav1.classList.add('btn-light');
        btnFav2.classList.remove('btn-light');
        btnFav2.classList.add('btn-secundary');
        btnFav3.classList.remove('btn-light');
        btnFav3.classList.add('btn-secundary');
    });

    btnFav2.addEventListener('click', function() {
        btnFav2.classList.remove('btn-secundary');
        btnFav2.classList.add('btn-light');
        btnFav1.classList.remove('btn-light');
        btnFav1.classList.add('btn-secundary');
        btnFav3.classList.remove('btn-light');
        btnFav3.classList.add('btn-secundary');
    });

    btnFav3.addEventListener('click', function() {
        btnFav3.classList.remove('btn-secundary');
        btnFav3.classList.add('btn-light');
        btnFav1.classList.remove('btn-light');
        btnFav1.classList.add('btn-secundary');
        btnFav2.classList.remove('btn-light');
        btnFav2.classList.add('btn-secundary');
    });
}