document.addEventListener("DOMContentLoaded", function () {
    // Select the anchor element with class "vozila"
    let Link = document.querySelector("a.radionica");

    if (Link) {
        // Add the "active" class
        Link.classList.add("active");

        // Get the href attribute
        let hrefValue = Link.getAttribute("href");
    }
});


document.addEventListener('DOMContentLoaded', () => {
  const newMechanicBtn = document.getElementById('newMechanicBtn');
  const mechanicForm = document.getElementById('mechanicForm');
  const cancelMechanicBtn = document.getElementById('cancelMechanicBtn');
  const newMechanicForm = document.getElementById('newMechanicForm');
  const formTitle = document.querySelector('.mechanic-form-container h3');
  const submitBtn = newMechanicForm.querySelector('button[type="submit"]');

  let isEditing = false;
  let editingCard = null;

  // Show/hide form handlers
  newMechanicBtn.addEventListener('click', () => {
    isEditing = false;
    formTitle.textContent = 'Novi Mehaničar';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Spremi';
    newMechanicForm.reset();
    mechanicForm.style.display = 'block';
    window.scrollTo({ top: mechanicForm.offsetTop, behavior: 'smooth' });
  });

  cancelMechanicBtn.addEventListener('click', () => {
    mechanicForm.style.display = 'none';
    newMechanicForm.reset();
    isEditing = false;
    editingCard = null;
  });

  // Form validation and submission
  newMechanicForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!isEditing && password !== confirmPassword) {
      alert('Lozinke se ne podudaraju!');
      return;
    }

    const formData = new FormData(newMechanicForm);
    const mechanicData = Object.fromEntries(formData.entries());

    if (isEditing && editingCard) {
      // Update existing mechanic card
      const mechanicInfo = editingCard.querySelector('.mechanic-info');
      mechanicInfo.querySelector('h3').textContent = `${mechanicData.firstName} ${mechanicData.lastName}`;
      mechanicInfo.querySelector('p:nth-child(2)').innerHTML = `<i class="fas fa-envelope"></i> ${mechanicData.email}`;
      mechanicInfo.querySelector('p:nth-child(3)').innerHTML = `<i class="fas fa-phone"></i> ${mechanicData.phone}`;

      // Update avatar
      const avatarUrl = `https://ui-avatars.com/api/?name=${mechanicData.firstName}+${mechanicData.lastName}`;
      editingCard.querySelector('.mechanic-avatar').src = avatarUrl;

      alert('Podaci mehaničara su uspješno ažurirani!');
    } else {
      // Create new mechanic card
      const mechanicsList = document.querySelector('.mechanics-list');
      const newCard = document.createElement('div');
      newCard.className = 'mechanic-card';
      newCard.innerHTML = `
        <img src="https://ui-avatars.com/api/?name=${mechanicData.firstName}+${mechanicData.lastName}" alt="${mechanicData.firstName} ${mechanicData.lastName}" class="mechanic-avatar">
        <div class="mechanic-info">
          <h3>${mechanicData.firstName} ${mechanicData.lastName}</h3>
          <p><i class="fas fa-envelope"></i> ${mechanicData.email}</p>
          <p><i class="fas fa-phone"></i> ${mechanicData.phone}</p>
        </div>
        <div class="mechanic-actions">
          <button class="btn-secondary">
            <i class="fas fa-edit"></i> Uredi
          </button>
          <button class="btn-secondary">
            <i class="fas fa-trash"></i> Obriši
          </button>
        </div>
      `;

      // Add event listeners to new card buttons
      addMechanicCardListeners(newCard);
      mechanicsList.appendChild(newCard);
      alert('Mehaničar je uspješno dodan!');
    }

    newMechanicForm.reset();
    mechanicForm.style.display = 'none';
    isEditing = false;
    editingCard = null;
  });

  // Function to add event listeners to mechanic card buttons
  function addMechanicCardListeners(card) {
    const buttons = card.querySelectorAll('.mechanic-actions button');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.currentTarget.textContent.trim();
        const mechanicName = card.querySelector('h3').textContent;

        if (action.includes('Uredi')) {
          isEditing = true;
          editingCard = card;

          // Fill form with current data
          const [firstName, lastName] = mechanicName.split(' ');
          const email = card.querySelector('.mechanic-info p:nth-child(2)').textContent.trim();
          const phone = card.querySelector('.mechanic-info p:nth-child(3)').textContent.trim();

          document.getElementById('firstName').value = firstName;
          document.getElementById('lastName').value = lastName;
          document.getElementById('email').value = email.replace('📧 ', '');
          document.getElementById('phone').value = phone.replace('📞 ', '');

          // Hide password fields when editing
          document.getElementById('password').parentElement.style.display = 'none';
          document.getElementById('confirmPassword').parentElement.style.display = 'none';

          // Update form title and button
          formTitle.textContent = 'Uredi Mehaničara';
          submitBtn.innerHTML = '<i class="fas fa-save"></i> Spremi Promjene';

          mechanicForm.style.display = 'block';
          window.scrollTo({ top: mechanicForm.offsetTop, behavior: 'smooth' });
        } else if (action.includes('Obriši')) {
          if (confirm(`Jeste li sigurni da želite obrisati mehaničara ${mechanicName}?`)) {
            card.remove();
            alert('Mehaničar je obrisan');
          }
        }
      });
    });
  }

  // Add event listeners to existing mechanic cards
  document.querySelectorAll('.mechanic-card').forEach(card => {
    addMechanicCardListeners(card);
  });

  // Notification Badge Click Handler
  const notificationBadge = document.querySelector('.notification-badge');
  notificationBadge.addEventListener('click', () => {
    alert('Obavijesti uskoro dolaze!');
  });
});
