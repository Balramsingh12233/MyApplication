document.addEventListener('DOMContentLoaded', function() {
  // Navigation between pages
  function showLoginPage() {
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('register-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'none';
  }

  function showRegisterPage() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('register-page').style.display = 'block';
    document.getElementById('game-page').style.display = 'none';
  }

  function showGamePage() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('register-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
  }

  // Event listeners for links
  document.getElementById('register-link').addEventListener('click', function() {
    showRegisterPage();
  });

  document.getElementById('login-link').addEventListener('click', function() {
    showLoginPage();
  });

  // Register User
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (localStorage.getItem(username)) {
      alert('Username already taken!');
    } else {
      localStorage.setItem(username, password);
      alert('Registration successful! Please log in.');
      showLoginPage();
    }
  });

  // Login User
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
      alert('Login successful!');
      document.getElementById('usernameDisplay').textContent = username;
      showGamePage();
    } else {
      alert('Invalid username or password!');
    }
  });

  // Game Logic
  let currentPlayer = 'X';
  const cells = document.querySelectorAll('[data-cell]');
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      alert(currentPlayer + ' Wins!');
      resetGame();
    } else if (isDraw()) {
      alert('It\'s a Draw!');
      resetGame();
    } else {
      swapTurns();
    }
  }

  function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {
      return combination.every(index => {
        return cells[index].textContent === currentPlayer;
      });
    });
  }

  function isDraw() {
    return [...cells].every(cell => cell.textContent === 'X' || cell.textContent === 'O');
  }

  function resetGame() {
    cells.forEach(cell => {
      cell.textContent = '';  // Clear the text inside each cell
      cell.removeEventListener('click', handleClick); // Remove old event listeners
      cell.addEventListener('click', handleClick, { once: true }); // Add new event listeners
    });
    currentPlayer = 'X';  // Reset the player to 'X'
  }

  // Initialize the game
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });

  // Attach resetGame to the reset button
  document.getElementById('resetBtn').addEventListener('click', resetGame);

  showLoginPage(); // Start with the login page
});
