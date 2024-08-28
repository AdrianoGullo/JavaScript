    document.getElementById('curiosityTab').addEventListener('click', function() {
        showTab('curiosityBody', this);
    });

    document.getElementById('opportunityTab').addEventListener('click', function() {
        showTab('opportunityBody', this);
    });

    document.getElementById('spiritTab').addEventListener('click', function() {
        showTab('spiritBody', this);
    });

    function showTab(tabId, tabElement) {
        // Esconder todos os corpos de cards
        document.getElementById('curiosityBody').style.display = 'none';
        document.getElementById('opportunityBody').style.display = 'none';
        document.getElementById('spiritBody').style.display = 'none';
        
        // Mostrar o corpo do card correspondente
        document.getElementById(tabId).style.display = 'block';

        // Remover a classe 'active' de todos os links e adicionar ao link clicado
        document.querySelectorAll('.nav-link').forEach(function(link) {
        link.classList.remove('active');
        });
        tabElement.classList.add('active');
    }

    document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('thumbnailContainer');
      
        container.addEventListener('scroll', function() {
          const firstChild = container.firstElementChild;
          const lastChild = container.lastElementChild;
      
          // Verifica se o container está próximo do final do primeiro filho
          if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
            // Move o primeiro filho para o final
            container.appendChild(firstChild);
            // Reseta a rolagem
            container.scrollLeft -= firstChild.offsetWidth;
          }
      
          // Verifica se o container está rolando para o início
          if (container.scrollLeft === 0) {
            // Move o último filho para o início
            container.insertBefore(lastChild, firstChild);
            // Ajusta a rolagem para corresponder à nova posição do último filho
            container.scrollLeft += lastChild.offsetWidth;
          }
        });
      });
      
      document.addEventListener('DOMContentLoaded', function() {
        // Inicializa o carrossel
        const carousel = new bootstrap.Carousel(document.getElementById('carouselExample'));
      
        // Adiciona o evento de clique nas miniaturas
        document.getElementById('thumbnailContainer').addEventListener('click', function(event) {
          if (event.target.classList.contains('thumbnail')) {
            const index = event.target.getAttribute('data-bs-slide-to');
            if (index !== null) {
              carousel.to(parseInt(index));
            }
          }
        });
      });
      
      
      