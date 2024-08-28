function showContent(contentId, element) {
    // Esconder todos os blocos de conteúdo
    document.getElementById('events').style.display = 'none';
    document.getElementById('launches').style.display = 'none';
    
    // Mostrar o bloco de conteúdo correspondente
    document.getElementById(contentId).style.display = 'block';
    
    // Remover a classe 'active' de todos os nav-links
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Adicionar a classe 'active' ao nav-link clicado
    if (element) {
      element.classList.add('active');
    }
  }

  // Chamar a função para exibir 'events' como padrão ao carregar a página
  document.addEventListener('DOMContentLoaded', function() {
    showContent('events', document.getElementById('eventsTab'));
  });