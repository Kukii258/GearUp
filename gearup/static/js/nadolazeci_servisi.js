document.addEventListener("DOMContentLoaded", function () {
    // Select the anchor element with class "vozila"
    let Link = document.querySelector("a.nadolazeci-servisi");

    if (Link) {
        // Add the "active" class
        Link.classList.add("active");

        // Get the href attribute
        let hrefValue = Link.getAttribute("href");
    }
});


document.addEventListener('DOMContentLoaded', () => {
  const newServiceBtn = document.getElementById('newServiceBtn');
  const serviceForm = document.getElementById('serviceForm');
  const cancelServiceBtn = document.getElementById('cancelServiceBtn');
  const newServiceForm = document.getElementById('newServiceForm');


    // Mobile Navigation Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const sidebar = document.getElementById('sidebar');

  if (mobileNavToggle && sidebar) {
    mobileNavToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      const icon = mobileNavToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 &&
          sidebar &&
          !sidebar.contains(e.target) &&
          mobileNavToggle &&
          !mobileNavToggle.contains(e.target) &&
          sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        const icon = mobileNavToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  }


  // Set min date to today for service date input
  const serviceDateInput = document.getElementById('serviceDate');
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  serviceDateInput.min = `${year}-${month}-${day}T${hours}:${minutes}`;

  // Check if we're in edit mode
  const urlParams = new URLSearchParams(window.location.search);
  const isEditMode = urlParams.get('mode') === 'edit';

  if (isEditMode) {
    const editData = JSON.parse(sessionStorage.getItem('serviceDetails'));
    if (editData) {
      // Update form title
      const formTitle = document.querySelector('.service-form-container h2');
      formTitle.textContent = 'Uredi Servis';

      // Show form
      serviceForm.style.display = 'block';
      window.scrollTo({ top: serviceForm.offsetTop, behavior: 'smooth' });

      // Populate form fields
      document.getElementById('carModel').value = editData.vehicle;
      document.getElementById('serviceDescription').value = editData.description;
      document.getElementById('serviceStatus').value = editData.status.toLowerCase();

      // Format and set date
      if (editData.date) {
        const [day, month] = editData.date.split('.');
        const [hours, minutes] = editData.time.split(':');
        serviceDateInput.value = `${year}-${month.trim().padStart(2, '0')}-${day.trim().padStart(2, '0')}T${hours}:${minutes}`;
      }

      // Update submit button
      const submitButton = document.querySelector('.service-form button[type="submit"]');
      submitButton.innerHTML = '<i class="fas fa-save"></i> Spremi Promjene';

      // Clear stored data
      sessionStorage.removeItem('serviceDetails');
    }
  }

  // Show/hide form handlers
  newServiceBtn.addEventListener('click', () => {
    serviceForm.style.display = 'block';
    window.scrollTo({ top: serviceForm.offsetTop, behavior: 'smooth' });
  });

  cancelServiceBtn.addEventListener('click', () => {
    serviceForm.style.display = 'none';
    newServiceForm.reset();
  });

  // Form submission handler
  newServiceForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(newServiceForm);
    const serviceData = Object.fromEntries(formData.entries());

    // Here you would typically send this data to your backend
    console.log('Service Data:', serviceData);

    // For demo purposes, show success message and reset form
    alert(isEditMode ? 'Servis je uspješno ažuriran!' : 'Servis je uspješno zakazan!');
    newServiceForm.reset();
    serviceForm.style.display = 'none';

    // Redirect back to services list
    window.location.href = 'nadolazeci-servisi.html';
  });

  // Status change handlers
  document.querySelectorAll('.status-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const card = e.target.closest('.service-card');
      const statusBadge = card.querySelector('.service-status');
      const newStatus = e.target.value;

      // Update status badge
      statusBadge.className = `service-status ${newStatus}`;
      statusBadge.textContent = e.target.options[e.target.selectedIndex].text;
    });
  });

  // Edit and Delete button handlers
  document.querySelectorAll('.service-actions button').forEach(button => {
    button.addEventListener('click', (e) => {
      const action = e.currentTarget.textContent.trim();
      const serviceCard = e.currentTarget.closest('.service-card');
      const carModel = serviceCard.querySelector('h3').textContent;

      if (action.includes('Uredi')) {
        // Store service data for editing
        const date = serviceCard.querySelector('.service-details p:nth-child(2)').textContent.split(':')[1].trim();
        const [dateStr, timeStr] = date.split(' ');
        const description = serviceCard.querySelector('.service-details p:nth-child(3)').textContent.split(':')[1].trim();
        const status = serviceCard.querySelector('.service-status').textContent;

        sessionStorage.setItem('serviceDetails', JSON.stringify({
          vehicle: carModel,
          date: dateStr,
          time: timeStr,
          description,
          status
        }));

        // Redirect to edit mode
        window.location.href = 'nadolazeci-servisi.html?mode=edit';
      } else if (action.includes('Obriši')) {
        if (confirm(`Jeste li sigurni da želite obrisati servis za ${carModel}?`)) {
          serviceCard.remove();
          alert('Servis je obrisan');
        }
      }
    });
  });

  // Notification Badge Click Handler
  const notificationBadge = document.querySelector('.notification-badge');
  notificationBadge.addEventListener('click', () => {
    alert('Obavijesti uskoro dolaze!');
  });
});
