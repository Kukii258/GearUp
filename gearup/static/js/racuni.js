document.addEventListener("DOMContentLoaded", function () {
    // Select the anchor element with class "vozila"
    let Link = document.querySelector("a.racuni");

    if (Link) {
        // Add the "active" class
        Link.classList.add("active");

        // Get the href attribute
        let hrefValue = Link.getAttribute("href");
    }
});


document.addEventListener('DOMContentLoaded', () => {
  const newInvoiceBtn = document.getElementById('newInvoiceBtn');
  const invoiceForm = document.getElementById('invoiceForm');
  const cancelInvoiceBtn = document.getElementById('cancelInvoiceBtn');
  const newInvoiceForm = document.getElementById('newInvoiceForm');
  const searchInput = document.getElementById('searchInput');
  const invoiceCards = document.querySelectorAll('.invoice-card');
  const fileInput = document.getElementById('invoiceImage');
  const uploadBtn = document.querySelector('.upload-btn');
  const fileName = document.querySelector('.file-name');

  // Set default date to today
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;

  // Show/hide form handlers
  newInvoiceBtn.addEventListener('click', () => {
    invoiceForm.style.display = 'block';
    window.scrollTo({ top: invoiceForm.offsetTop, behavior: 'smooth' });
  });

  cancelInvoiceBtn.addEventListener('click', () => {
    invoiceForm.style.display = 'none';
    newInvoiceForm.reset();
    fileName.textContent = 'Nije odabrana datoteka';
  });

  // File upload handlers
  uploadBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      fileName.textContent = e.target.files[0].name;
    } else {
      fileName.textContent = 'Nije odabrana datoteka';
    }
  });

  // Form submission handler
  newInvoiceForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(newInvoiceForm);
    const invoiceData = Object.fromEntries(formData.entries());

    // Here you would typically send this data to your backend
    console.log('Invoice Data:', invoiceData);

    // For demo purposes, show success message and reset form
    alert('Račun je uspješno spremljen!');
    newInvoiceForm.reset();
    fileName.textContent = 'Nije odabrana datoteka';
    invoiceForm.style.display = 'none';
  });

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    invoiceCards.forEach(card => {
      const invoiceId = card.querySelector('.invoice-title h3').textContent.toLowerCase();
      const repairId = card.querySelector('.repair-ref').textContent.toLowerCase();

      if (invoiceId.includes(searchTerm) || repairId.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Invoice action buttons handlers
  document.querySelectorAll('.invoice-actions button').forEach(button => {
    button.addEventListener('click', (e) => {
      const action = e.currentTarget.textContent.trim();
      const invoiceCard = e.currentTarget.closest('.invoice-card');
      const invoiceId = invoiceCard.querySelector('.invoice-title h3').textContent;
      const repairRef = invoiceCard.querySelector('.repair-ref').textContent;
      const amount = invoiceCard.querySelector('.invoice-amount').textContent;
      const date = invoiceCard.querySelector('.invoice-details p:nth-child(1)').textContent.split(':')[1].trim();
      const status = invoiceCard.querySelector('.status').textContent;

      switch (true) {
        case action.includes('Pregled'):
          // Store invoice data for details page
          sessionStorage.setItem('invoiceDetails', JSON.stringify({
            id: invoiceId,
            repairId: repairRef,
            amount: amount,
            date: date,
            status: status
          }));
          window.location.href = 'racun-detalji.html';
          break;
        case action.includes('Preuzmi'):
          alert(`Preuzimanje PDF-a za račun ${invoiceId}`);
          break;
        case action.includes('Obriši'):
          if (confirm(`Jeste li sigurni da želite obrisati račun ${invoiceId}?`)) {
            alert('Račun je obrisan');
            invoiceCard.remove();
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
