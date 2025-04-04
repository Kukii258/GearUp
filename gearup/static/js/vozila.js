document.addEventListener("DOMContentLoaded", function () {
    // Select the anchor element with class "vozila"
    let vozilaLink = document.querySelector("a.vozila");

    if (vozilaLink) {
        // Add the "active" class
        vozilaLink.classList.add("active");

        // Get the href attribute
        let hrefValue = vozilaLink.getAttribute("href");
    }
});



document.addEventListener('DOMContentLoaded', () => {
  const newVehicleBtn = document.getElementById('newVehicleBtn');
  const vehicleForm = document.getElementById('vehicleForm');
  const cancelVehicleBtn = document.getElementById('cancelVehicleBtn');
  const newVehicleForm = document.getElementById('newVehicleForm');
  const searchInput = document.getElementById('searchInput');
  const vehicleCards = document.querySelectorAll('.vehicle-card');
  const formTitle = document.querySelector('.vehicle-form-container h2');
  const submitBtn = newVehicleForm.querySelector('button[type="submit"]');

  let isEditing = false;
  let editingCard = null;

  // Show/hide form handlers
  newVehicleBtn.addEventListener('click', () => {
    isEditing = false;
    formTitle.textContent = 'Novo Vozilo';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Spremi Vozilo';
    newVehicleForm.reset();
    vehicleForm.style.display = 'block';
    window.scrollTo({ top: vehicleForm.offsetTop, behavior: 'smooth' });
  });

  cancelVehicleBtn.addEventListener('click', () => {
    vehicleForm.style.display = 'none';
    newVehicleForm.reset();
    isEditing = false;
    editingCard = null;
  });

  // Form submission handler
  newVehicleForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(newVehicleForm);
    const vehicleData = Object.fromEntries(formData.entries());

    if (isEditing && editingCard) {
      // Update existing vehicle card
      const vehicleTitle = editingCard.querySelector('.vehicle-title h3');
      const vehicleId = editingCard.querySelector('.vehicle-id');
      const vehicleDetails = editingCard.querySelector('.vehicle-details');

      vehicleTitle.textContent = vehicleData.model;
      vehicleId.textContent = vehicleData.chassisNumber;
      vehicleDetails.innerHTML = `
        <p><strong>Proizvođač:</strong> ${vehicleData.manufacturer}</p>
        <p><strong>Model:</strong> ${vehicleData.model}</p>
        <p><strong>Boja:</strong> ${vehicleData.color}</p>
      `;

      alert('Vozilo je uspješno ažurirano!');
    } else {
      // Create new vehicle card
      const vehiclesList = document.querySelector('.vehicles-list');
      const newCard = document.createElement('div');
      newCard.className = 'vehicle-card';
      newCard.innerHTML = `
        <div class="vehicle-header">
          <div class="vehicle-title">
            <h3>${vehicleData.model}</h3>
            <span class="vehicle-id">${vehicleData.chassisNumber}</span>
          </div>
        </div>
        <div class="vehicle-details">
          <p><strong>Proizvođač:</strong> ${vehicleData.manufacturer}</p>
          <p><strong>Model:</strong> ${vehicleData.model}</p>
          <p><strong>Boja:</strong> ${vehicleData.color}</p>
        </div>
        <div class="vehicle-actions">
          <button class="btn-secondary">
            <i class="fas fa-history"></i> Povijest Servisa
          </button>
          <button class="btn-secondary">
            <i class="fas fa-edit"></i> Uredi
          </button>
          <button class="btn-secondary">
            <i class="fas fa-trash"></i> Obriši
          </button>
        </div>
      `;

      // Add event listeners to new card buttons
      addVehicleCardListeners(newCard);
      vehiclesList.appendChild(newCard);
      alert('Vozilo je uspješno dodano!');
    }

    newVehicleForm.reset();
    vehicleForm.style.display = 'none';
    isEditing = false;
    editingCard = null;
  });

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    document.querySelectorAll('.vehicle-card').forEach(card => {
      const chassisNumber = card.querySelector('.vehicle-id').textContent.toLowerCase();
      const vehicleInfo = card.querySelector('.vehicle-details').textContent.toLowerCase();

      if (chassisNumber.includes(searchTerm) || vehicleInfo.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Function to add event listeners to vehicle card buttons
  function addVehicleCardListeners(card) {
    const buttons = card.querySelectorAll('.vehicle-actions button');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.currentTarget.textContent.trim();
        const vehicleModel = card.querySelector('h3').textContent;
        const chassisNumber = card.querySelector('.vehicle-id').textContent;

        switch (true) {
          case action.includes('Povijest'):
            // Store vehicle data for history page
            const manufacturer = card.querySelector('.vehicle-details p:nth-child(1)').textContent.split(':')[1].trim();
            const model = card.querySelector('.vehicle-details p:nth-child(2)').textContent.split(':')[1].trim();
            const color = card.querySelector('.vehicle-details p:nth-child(3)').textContent.split(':')[1].trim();

            sessionStorage.setItem('vehicleHistory', JSON.stringify({
              manufacturer,
              model,
              chassisNumber,
              color
            }));

            window.location.href = 'vozilo-povijest.html';
            break;
          case action.includes('Uredi'):
            isEditing = true;
            editingCard = card;

            // Fill form with current data
            const manufacturerEdit = card.querySelector('.vehicle-details p:nth-child(1)').textContent.split(':')[1].trim();
            const modelEdit = card.querySelector('.vehicle-details p:nth-child(2)').textContent.split(':')[1].trim();
            const colorEdit = card.querySelector('.vehicle-details p:nth-child(3)').textContent.split(':')[1].trim();

            document.getElementById('manufacturer').value = manufacturerEdit;
            document.getElementById('model').value = modelEdit;
            document.getElementById('color').value = colorEdit;
            document.getElementById('chassisNumber').value = chassisNumber;

            // Update form title and button
            formTitle.textContent = 'Uredi Vozilo';
            submitBtn.innerHTML = '<i class="fas fa-save"></i> Spremi Promjene';

            vehicleForm.style.display = 'block';
            window.scrollTo({ top: vehicleForm.offsetTop, behavior: 'smooth' });
            break;
          case action.includes('Obriši'):
            if (confirm(`Jeste li sigurni da želite obrisati vozilo ${vehicleModel} (${chassisNumber})?`)) {
              card.remove();
              alert('Vozilo je obrisano');
            }
            break;
        }
      });
    });
  }

  // Add event listeners to existing vehicle cards
  document.querySelectorAll('.vehicle-card').forEach(card => {
    addVehicleCardListeners(card);
  });

  // Chassis number validation
  const chassisInput = document.getElementById('chassisNumber');
  chassisInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
  });

  // Notification Badge Click Handler
  const notificationBadge = document.querySelector('.notification-badge');
  notificationBadge.addEventListener('click', () => {
    alert('Obavijesti uskoro dolaze!');
  });
});
