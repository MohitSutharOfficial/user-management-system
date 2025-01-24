/* ...existing code... */
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        window.location.href = 'login.html';
      }
    })
    .catch(err => console.error('Error:', err));
  });
  
  document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        window.location.href = 'dashboard.html';
      }
    })
    .catch(err => console.error('Error:', err));
  });
  