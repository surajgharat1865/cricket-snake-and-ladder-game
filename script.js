let players = [1, 1, 1, 1]; // positions of 4 players
let currentPlayer = 0; // 0 = player1

const colors = ["player1", "player2", "player3", "player4"];

const events = {
    3: "Caught",
    5: "Run-out",
    13: "LBW",
    18: "Caught",
    28: "LBW",
    31: "Bowled",
    38: "LBW",
    48: "Run-out",
    59: "Caught",
    67: "Bowled",
    71: "Run-out",
    74: "Run-out",
    80: "Bowled",
    87: "Hit Wicket",
    93: "Stumped",
    98: "Hit Wicket",
    95: "Six"
};

const board = document.getElementById("board");

// Create board
for (let i = 1; i <= 100; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = "cell-" + i;

    if (events[i]) {
        cell.classList.add("special");
        cell.innerText = events[i];
    } else {
        cell.innerText = i;
    }

    board.appendChild(cell);
}

// Update board UI
function updateBoard() {
    document.querySelectorAll(".cell").forEach(c => {
        c.classList.remove("player1", "player2", "player3", "player4");
    });

    players.forEach((pos, i) => {
        let cell = document.getElementById("cell-" + pos);
        if (cell) cell.classList.add(colors[i]);

        document.getElementById("p" + (i + 1)).innerText = pos;
    });
}

// Roll dice
function rollDice() {
    let dice = Math.floor(Math.random() * 6) + 1;

    document.getElementById("diceSound").play();

    // Show dice for current player (DO NOT clear others)
    document.getElementById("d" + (currentPlayer + 1)).innerText = dice;

    movePlayer(currentPlayer, dice);
    updateBoard();
}
// Move logic
function movePlayer(playerIndex, dice) {
    let pos = players[playerIndex];
    let newPos = pos + dice;

    if (newPos <= 100) {
        pos = newPos;
    }

    // Check event
    if (events[pos]) {
        if (events[pos] === "Six") {
            alert("🔥 Player " + (playerIndex + 1) + " got SIX! Extra turn!");
        } else {
            document.getElementById("outSound").play();
            alert("❌ Player " + (playerIndex + 1) + " OUT! " + events[pos]);
            pos = 1;
            currentPlayer = (currentPlayer + 1) % 4;
        }
    } else {
        currentPlayer = (currentPlayer + 1) % 4;
    }

    players[playerIndex] = pos;

    // Win check
    if (pos === 100) {
        document.getElementById("winSound").play();
        alert("🎉 Player " + (playerIndex + 1) + " Wins!");
        location.reload();
    }

    document.getElementById("turn").innerText =
        "Player " + (currentPlayer + 1) + " Turn";
}