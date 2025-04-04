document.addEventListener("DOMContentLoaded", function () {
    // Select the anchor element with class "vozila"
    let Link = document.querySelector("a.popravci");

    if (Link) {
        // Add the "active" class
        Link.classList.add("active");

        // Get the href attribute
        let hrefValue = Link.getAttribute("href");
    }
});


document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const repairCards = document.querySelectorAll('.repair-card');

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    repairCards.forEach(card => {
      const chassisNumber = card.querySelector('.repair-details').textContent.toLowerCase();
      if (chassisNumber.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Repair action buttons handlers
  document.querySelectorAll('.repair-actions button').forEach(button => {
    button.addEventListener('click', (e) => {
      const action = e.currentTarget.textContent.trim();
      const repairCard = e.currentTarget.closest('.repair-card');
      const carModel = repairCard.querySelector('h3').textContent;
      const repairId = repairCard.querySelector('.repair-id').textContent;

      switch (true) {
        case action.includes('Detalji'):
          window.location.href = 'popravak-detalji.html';
          break;
        case action.includes('Uredi'):
          // Store repair data in sessionStorage
          const chassisNumber = repairCard.querySelector('.repair-details p:nth-child(1)').textContent.split(':')[1].trim();
          const date = repairCard.querySelector('.repair-details p:nth-child(2)').textContent.split(':')[1].trim();
          const kilometers = repairCard.querySelector('.repair-details p:nth-child(3)').textContent.split(':')[1].trim();
          const description = repairCard.querySelector('.repair-details p:nth-child(4)').textContent.split(':')[1].trim();

          sessionStorage.setItem('editRepairData', JSON.stringify({
            repairId,
            chassisNumber,
            date,
            kilometers,
            description
          }));

          // Redirect to novi-popravak.html with edit mode
          window.location.href = 'novi-popravak.html?mode=edit';
          break;
        case action.includes('Obriši'):
          if (confirm(`Jeste li sigurni da želite obrisati popravak za ${carModel} (${repairId})?`)) {
            alert('Popravak je obrisan');
            repairCard.remove();
          }
          break;
      }
    });
  });

  // Notification Badge Click Handler
  const notificationBadge = document.querySelector('.notification-badge');
  notificationBadge.addEventListener('click', () => {
    alert('Obavijesti uskoro dolaze!');
  });
});
