document.addEventListener("DOMContentLoaded", function() {
    var btnCuriosity = document.getElementById('btnCuriosity');
    var btnOpportunity = document.getElementById('btnOpportunity');
    var btnSpirit = document.getElementById('btnSpirit');
    var btnSearch = document.getElementById('btnSearch');
    let rover, MarsDate;
    let page = 1;

    changeButtonVisibility(btnCuriosity, btnOpportunity, btnSpirit, rover);

    const numberInput = document.getElementById('numberInput');
    numberInput.addEventListener('click', function() {
        MarsDate = numberInput.value;
    });

    btnSearch.addEventListener('click', function() { 
        if(btnCuriosity.classList.contains('btn-light')) rover = 'curiosity';
        else if(btnOpportunity.classList.contains('btn-light')) rover = 'opportunity';
        else if(btnSpirit.classList.contains('btn-light')) rover = 'spirit';
        Mars_apiRequest(rover, page, MarsDate)
    });

    var btnShowMore = document.getElementById('showMoreBtn');
    btnShowMore.addEventListener('click', async function(){
        await Mars_apiRequest(rover, page++, MarsDate);
    })
});

function changeButtonVisibility(btnCuriosity, btnOpportunity, btnSpirit, rover) {
    btnCuriosity.addEventListener('click', function() {
        btnCuriosity.classList.remove('btn-secundary');
        btnCuriosity.classList.add('btn-light');
        btnCuriosity.classList.remove('text-white');
        btnCuriosity.classList.add('text-black');

        btnOpportunity.classList.remove('btn-light');
        btnOpportunity.classList.add('btn-secundary');
        btnOpportunity.classList.remove('text-black');
        btnOpportunity.classList.add('text-white');

        btnSpirit.classList.remove('btn-light');
        btnSpirit.classList.add('btn-secundary');
        btnSpirit.classList.remove('text-black');
        btnSpirit.classList.add('text-white');
    });

    btnOpportunity.addEventListener('click', function() {
        btnOpportunity.classList.remove('btn-secundary');
        btnOpportunity.classList.add('btn-light');
        btnCuriosity.classList.remove('text-black');
        btnCuriosity.classList.add('text-white');

        btnCuriosity.classList.remove('btn-light');
        btnCuriosity.classList.add('btn-secundary');
        btnOpportunity.classList.remove('text-white');
        btnOpportunity.classList.add('text-black');
        
        btnSpirit.classList.remove('btn-light');
        btnSpirit.classList.add('btn-secundary');
        btnSpirit.classList.remove('text-black');
        btnSpirit.classList.add('text-white');
    });

    btnSpirit.addEventListener('click', function() {
        btnSpirit.classList.remove('btn-secundary');
        btnSpirit.classList.add('btn-light');
        btnCuriosity.classList.remove('text-black');
        btnCuriosity.classList.add('text-white');

        btnCuriosity.classList.remove('btn-light');
        btnCuriosity.classList.add('btn-secundary');
        btnOpportunity.classList.remove('text-black');
        btnOpportunity.classList.add('text-white');

        btnOpportunity.classList.remove('btn-light');
        btnOpportunity.classList.add('btn-secundary');
        btnSpirit.classList.remove('text-white');
        btnSpirit.classList.add('text-black');
    });
};

function adicionaFotoNoAlbum(album, foto){
    //cria elementos para representar a foto e infos
    const cardCol = document.createElement('div');
    cardCol.classList.add('col');

    const card = document.createElement('div');
    card.classList.add('card', 'shadow-sm');
    card.style.width = '300x';
    card.style.height = '400px';
    card.style.marginTop = '30px';
        
    const cardImg = document.createElement('img');
    cardImg.classList.add('bd-placeholder-img', 'card-img-top');
    cardImg.setAttribute('src', foto.img_src);
    cardImg.style.width = '100%';
    cardImg.style.height = '300px';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = 'Descrição da foto';

    const cardBtnGroup = document.createElement('div');
    cardBtnGroup.classList.add('btn-group');

    const btnFav = document.createElement('button');
    btnFav.setAttribute('type', 'button');
    btnFav.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    btnFav.textContent = 'Fav';

    const btnShare = document.createElement('button');
    btnShare.setAttribute('type', 'button');
    btnShare.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    btnShare.textContent = 'Share';

    const cardTime = document.createElement('small');
    cardTime.classList.add('text-body-secondary');
    cardTime.textContent = '9 mins';
    
    // Adiciona elementos à carta
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardBtnGroup);
    cardBody.appendChild(cardTime);
    cardBtnGroup.appendChild(btnFav);
    cardBtnGroup.appendChild(btnShare);
    cardCol.appendChild(card);
    album.appendChild(cardCol);
};

function changeCameraBtnText(text) {
    document.getElementById('dropdownMenuButton').textContent = text;
}