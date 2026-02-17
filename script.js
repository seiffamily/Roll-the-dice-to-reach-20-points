let accounts = {}; 
let friends = []; 
let playerNames = [];
let scores = [];
let currentPlayer = 0;
const winningScore = 20;

function createAccount() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    if(!email || !name){
        document.getElementById('accountMsg').textContent = "Enter both email and name!";
        return;
    }
    accounts[email] = name;
    document.getElementById('accountMsg').textContent = `Account created for ${name}!`;
    document.getElementById('setup').style.display = 'none';
    document.getElementById('friends').style.display = 'block';
}

function addFriend() {
    const friendEmail = document.getElementById('friendEmail').value;
    if(!friendEmail || !(friendEmail in accounts)){
        alert("Friend must have an account!");
        return;
    }
    if(!friends.includes(friendEmail)){
        friends.push(friendEmail);
        document.getElementById('friendList').textContent = "Your friends: " + friends.map(f=>accounts[f]).join(", ");
    }
}

function startGameSetup() {
    if(friends.length < 1){
        alert("Add at least 1 friend!");
        return;
    }
    document.getElementById('friends').style.display = 'none';
    document.getElementById('gameSetup').style.display = 'block';
}

function startGame() {
    let numPlayers = parseInt(document.getElementById('numPlayers').value);
    if(numPlayers < 2) numPlayers = 2;
    if(numPlayers > friends.length + 1) numPlayers = friends.length + 1;

    playerNames = [accounts[Object.keys(accounts)[0]]]; 
    for(let i=0; i<numPlayers-1; i++){
        playerNames.push(accounts[friends[i]]);
    }

    scores = Array(playerNames.length).fill(0);
    currentPlayer = 0;

    document.getElementById('gameSetup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('winner').textContent = "";
    updateDisplay();
}

function rollDice() {
    const roll = Math.floor(Math.random()*6)+1;
    scores[currentPlayer] += roll;
    document.getElementById('dice').textContent = ['⚀','⚁','⚂','⚃','⚄','⚅'][roll-1];

    if(scores[currentPlayer]>=winningScore){
        document.getElementById('winner').textContent = `${playerNames[currentPlayer]} WINS! 🎉`;
        document.querySelector('button[onclick="rollDice()"]').disabled = true;
    } else {
        currentPlayer = (currentPlayer + 1) % playerNames.length;
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('turn').textContent = `${playerNames[currentPlayer]}'s Turn`;
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = playerNames.map((p,i)=>`${p} Score: ${scores[i]}`).join("<br>");
}

function restartGame() {
    scores = Array(playerNames.length).fill(0);
    currentPlayer = 0;
    document.querySelector('button[onclick="rollDice()"]').disabled = false;
    document.getElementById('winner').textContent = "";
    updateDisplay();
}

function addPlayer() {
    if(friends.length+1 >= playerNames.length + 1){
        playerNames.push(accounts[friends[playerNames.length-1]]);
        scores.push(0);
        updateDisplay();
    } else {
        alert("No more friends to add!");
    }
}
