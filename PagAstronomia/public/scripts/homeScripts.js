document.getElementById('translateButton').addEventListener('click', function() {
    var menu = document.getElementById('languageMenu');
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  });

  // Função de tradução (exemplo)
  function translatePage(lang) {
    // Adicione aqui a lógica para traduzir a página
    alert('Tradução para: ' + lang);
    // Fechar o menu após seleção
    document.getElementById('languageMenu').style.display = 'none';
  }

  // Fechar o menu se clicar fora dele
  window.onclick = function(event) {
    if (!event.target.matches('#translateButton')) {
      var dropdowns = document.getElementsByClassName('dropdown-content');
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === 'block') {
          openDropdown.style.display = 'none';
        }
      }
    }
  }

  function handleDownloadClick(index, url) {
    console.log(`Botão de download ${index} clicado. URL da imagem: ${url}`);
  }
  
  
