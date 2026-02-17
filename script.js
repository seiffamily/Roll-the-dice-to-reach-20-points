let users = [];          // Loaded from users.json
let currentUser = null;  // Logged-in user
let playerNames = [];
let scores = [];
let currentPlayer = 0;
const winningScore = 20;

// Load users.json
async function loadUsers() {
    const response = await fetch('users.json');
    users = await response.json();
}
loadUsers();

// LOGIN
function login() {
    const name = document.getElementById('name').value.trim();
    if(!name){
        alert("Enter your name!");
        return;
    }

    currentUser = users.find(u => u.name === name);

    if(!currentUser){
        alert("Name not found!");
        return;
    }

    document.getElementById('login').style.display = 'none';
    document.getElementById('friends').style.display = 'block';
    updateFriendList();
}

// SHOW FRIENDS
function updateFriendList() {
    document.getElementById('friendList').textContent =
        "Your friends: " + currentUser.friends.join(", ");
}

// START GAME
function startGame() {
    playerNames = [currentUser.name, ...currentUser.friends];
    scores = Array(playerNames.length).fill(0);
    currentPlayer = 0;

    document.getElementById('friends').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('winner').textContent = "";
    updateDisplay();
}

// ROLL DICE
function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    scores[currentPlayer] += roll;
    document.getElementById('dice').textContent = ['⚀','⚁','⚂','⚃','⚄','⚅'][roll-1];

    if(scores[currentPlayer] >= winningScore){
        document.getElementById('winner').textContent = `${playerNames[currentPlayer]} WINS! 🎉`;
        document.querySelector('button[onclick="rollDice()"]').disabled = true;
    } else {
        currentPlayer = (currentPlayer + 1) % playerNames.length;
        updateDisplay();
    }
}

// UPDATE DISPLAY
function updateDisplay() {
    document.getElementById('turn').textContent = `${playerNames[currentPlayer]}'s Turn`;
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = playerNames.map((p,i)=>`${p} Score: ${scores[i]}`).join("<br>");
}

// RESTART GAME
function restartGame() {
    scores = Array(playerNames.length).fill(0);
    currentPlayer = 0;
    document.querySelector('button[onclick="rollDice()"]').disabled = false;
    document.getElementById('winner').textContent = "";
    updateDisplay();
}
