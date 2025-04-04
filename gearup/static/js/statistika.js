document.addEventListener("DOMContentLoaded", function () {
    // Select the anchor element with class "vozila"
    let Link = document.querySelector("a.statistika");

    if (Link) {
        // Add the "active" class
        Link.classList.add("active");

        // Get the href attribute
        let hrefValue = Link.getAttribute("href");
    }
});


document.addEventListener('DOMContentLoaded', () => {
  // Initialize all charts
  initializeRevenueChart();
  initializeRepairsChart();

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

  // Period Button Handlers
  const periodBtns = document.querySelectorAll('.period-btn');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Only update buttons for the same chart
      const chartType = btn.dataset.chart;
      document.querySelectorAll(`.period-btn[data-chart="${chartType}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update chart based on type and period
      if (chartType === 'revenue') {
        updateRevenueChart(btn.dataset.period);
      } else if (chartType === 'repairs') {
        updateRepairsChart(btn.dataset.period);
      }
    });
  });

  // Notification Badge Click Handler
  const notificationBadge = document.querySelector('.notification-badge');
  notificationBadge.addEventListener('click', () => {
    alert('Obavijesti uskoro dolaze!');
  });
});

function initializeRevenueChart() {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  window.revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'],
      datasets: [{
        label: 'Prihod (kn)',
        data: generateRandomData(7, 10000, 25000),
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
}

function initializeRepairsChart() {
  const ctx = document.getElementById('repairsChart').getContext('2d');
  window.repairsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'],
      datasets: [{
        label: 'Broj Popravaka',
        data: generateRandomData(7, 5, 15),
        backgroundColor: '#22c55e',
        borderRadius: 4
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
            stepSize: 1
          }
        }
      }
    }
  });
}

function updateRevenueChart(period) {
  let labels, data;

  switch(period) {
    case 'week':
      labels = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
      data = generateRandomData(7, 10000, 25000);
      break;
    case 'month':
      labels = Array.from({length: 30}, (_, i) => i + 1);
      data = generateRandomData(30, 8000, 30000);
      break;
    case 'year':
      labels = ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'];
      data = generateRandomData(12, 200000, 400000);
      break;
  }

  window.revenueChart.data.labels = labels;
  window.revenueChart.data.datasets[0].data = data;
  window.revenueChart.update();
}

function updateRepairsChart(period) {
  let labels, data;

  switch(period) {
    case 'week':
      labels = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
      data = generateRandomData(7, 5, 15);
      break;
    case 'month':
      labels = Array.from({length: 30}, (_, i) => i + 1);
      data = generateRandomData(30, 3, 12);
      break;
    case 'year':
      labels = ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip', 'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'];
      data = generateRandomData(12, 80, 150);
      break;
  }

  window.repairsChart.data.labels = labels;
  window.repairsChart.data.datasets[0].data = data;
  window.repairsChart.update();
}

function generateRandomData(length, min, max) {
  return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}
