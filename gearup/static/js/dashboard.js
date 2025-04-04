document.addEventListener("DOMContentLoaded", function () {
    // Select the anchor element with class "vozila"
    let Link = document.querySelector("a.dashboard");

    if (Link) {
        // Add the "active" class
        Link.classList.add("active");

        // Get the href attribute
        let hrefValue = Link.getAttribute("href");
    }
});
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Revenue Chart
  const ctx = document.getElementById('revenueChart').getContext('2d');
  const revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'],
      datasets: [{
        label: 'Prihod (kn)',
        data: generateRandomData(),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString() + ' kn';
            }
          }
        }
      }
    }
  });

  // Period Button Handlers
  const periodBtns = document.querySelectorAll('.period-btn');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update chart data based on period
      const newData = generateRandomData();
      revenueChart.data.datasets[0].data = newData;
      revenueChart.update();
    });
  });

  // Helper function to generate random data
  function generateRandomData() {
    return Array.from({length: 7}, () => Math.floor(Math.random() * 15000) + 7500);
  }

  // Service item click handler
  document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', () => {
      // Get service details
      const date = item.querySelector('.date').textContent;
      const time = item.querySelector('.time').textContent;
      const vehicle = item.querySelector('h4').textContent;
      const description = item.querySelector('p').textContent;
      const status = item.querySelector('.service-status').textContent;

      // Store service details for editing
      sessionStorage.setItem('serviceDetails', JSON.stringify({
        vehicle,
        date,
        time,
        description,
        status
      }));

      // Navigate to edit mode
      window.location.href = 'nadolazeci-servisi.html?mode=edit';
    });
  });

  // Repair item click handler
  document.querySelectorAll('.repair-item').forEach(item => {
    item.addEventListener('click', () => {
      // Get repair details
      const title = item.querySelector('h4').textContent;
      const description = item.querySelector('p').textContent;
      const repairId = item.querySelector('.repair-id').textContent;
      const status = item.querySelector('.status').textContent;
      const time = item.querySelector('.time').textContent;

      // Store repair details for the details page
      sessionStorage.setItem('repairDetails', JSON.stringify({
        title,
        description,
        repairId,
        status,
        time
      }));

      // Navigate to repair details page
      window.location.href = 'popravak-detalji.html';
    });
  });

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

  // Notification Badge Click Handler
  const notificationBadge = document.querySelector('.notification-badge');
  notificationBadge.addEventListener('click', () => {
    alert('Obavijesti uskoro dolaze!');
  });

  // Message Popup Handler
  const messageBadge = document.querySelector('.message-badge');
  const messagePopup = document.querySelector('.message-popup');

  if (messageBadge && messagePopup) {
    messageBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      messagePopup.classList.toggle('show');
    });

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
      if (!messagePopup.contains(e.target) && !messageBadge.contains(e.target)) {
        messagePopup.classList.remove('show');
      }
    });
  }

  // Message item click handler
  document.querySelectorAll('.message-item').forEach(item => {
    item.addEventListener('click', () => {
      window.location.href = 'messages.html';
    });
  });

  // Search Input Handler
  const searchInput = document.querySelector('.header-search input');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        alert(`Pretraživanje za: ${searchInput.value}`);
      }
    });
  }
});
