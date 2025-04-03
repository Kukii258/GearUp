document.addEventListener('DOMContentLoaded', () => {
  const toolIcons = document.querySelectorAll('.tool-icon');

  // Add floating animation to tool icons
  toolIcons.forEach((icon, index) => {
    icon.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
  });

  // Form submission handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.href = 'dashboard.html';
    });
  }
});
