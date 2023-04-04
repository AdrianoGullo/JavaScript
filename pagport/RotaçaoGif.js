//ROTAÇÃO AUTOMÁTICA DOS TEMAS DE ACORDO COM A HORA DO DIA//
let body = document.querySelector('body');
let hora = new Date().getHours();

if (hora >= 5 && hora < 7) {
body.style.backgroundImage = "url('Imagens/quasemanha.gif')";
}else if (hora >= 7 && hora < 11) {
  body.style.backgroundImage = "url('Imagens/manhazinha.gif')";
} else if (hora >= 11 && hora < 17) {
  body.style.backgroundImage = "url('Imagens/dia.gif')";
} else if (hora >= 17 && hora < 19){
  body.style.backgroundImage = "url('Imagens/finaldatarde.gif')";
} else{
    body.style.backgroundImage = "url('Imagens/212876.gif')";
}



//SUBLISTA NÃO VISIVEL INICIALMENTE
var menubox = document.getElementById("menu-box")
var menu1 = document.getElementById("Menu1");
var sublista = document.querySelector(".sublista");

menu1.addEventListener("click", function() {
    sublista.classList.toggle("visivel");
    menuBox.classList.toggle('expandido');
});


//TROCA DE BACKGROUND PELO USUÁRIO//
// Obtém uma referência à lista de imagens na sublista
const imgList = document.querySelectorAll('#SublistaMenu1 img');

// Adiciona um evento de clique para cada imagem
imgList.forEach(img => {
  img.addEventListener('click', function() {
    // Obtém a referência ao elemento body
    const body = document.querySelector('body'); 
    // Atualiza o background-image do body com a URL do gif correspondente
    switch (this.id) {
        case 'ImgDia':
            body.style.backgroundImage = 'url("Imagens/dia.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        case 'ImgQuaseDia':
            body.style.backgroundImage = 'url("Imagens/manhazinha.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        case 'ImgQuaseManha':
            body.style.backgroundImage = 'url("Imagens/quasemanha.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        case 'ImgFinalDaTarde':
            body.style.backgroundImage = 'url("Imagens/finaldatarde.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        case 'ImgNoite':
            body.style.backgroundImage = 'url("Imagens/212876.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        case 'ImgMoonLake':
            body.style.backgroundImage = 'url("Imagens/moonlake.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        case 'ImgSpaceGate':
            body.style.backgroundImage = 'url("Imagens/spacegate.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        case 'ImgAurora':
            body.style.backgroundImage = 'url("Imagens/AuroraBoreal.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        case 'ImgRuinedCastle':
            body.style.backgroundImage = 'url("Imagens/ruinedcastle.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        case 'ImgViking':
            body.style.backgroundImage = 'url("Imagens/tumuloviking.gif")';
            sublista.classList.toggle("visivel");
            menuBox.classList.toggle('expandido');
            break;
        default:
            break;
        }
    });
});
