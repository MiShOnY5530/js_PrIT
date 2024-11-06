document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const gameModeSelect = document.getElementById("game-mode");
    const themeSelect = document.getElementById("theme");
    const startGameButton = document.getElementById("start-game");
    const timeDisplay = document.getElementById("time");
    const movesDisplay = document.getElementById("moves");

    let timer, moves, gridSize, emptyTile;
    let startTime;

    function initializeGame() {
        gridSize = parseInt(gameModeSelect.value);
        gameBoard.innerHTML = "";
        gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        startTime = Date.now();
        moves = 0;
        updateStats();
        setupTiles();
    }

    function setupTiles() {
        let numbers = [...Array(gridSize * gridSize).keys()];
        numbers.shift();
        numbers.push(null);

        numbers = shuffle(numbers);
        numbers.forEach((number, i) => {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.textContent = number !== null ? number : "";
            tile.dataset.index = i;
            if (number === null) emptyTile = i;
            tile.addEventListener("click", () => moveTile(i));
            gameBoard.appendChild(tile);
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function moveTile(index) {
        const [emptyRow, emptyCol] = [Math.floor(emptyTile / gridSize), emptyTile % gridSize];
        const [tileRow, tileCol] = [Math.floor(index / gridSize), index % gridSize];
        const distance = Math.abs(emptyRow - tileRow) + Math.abs(emptyCol - tileCol);

        if (distance === 1) {
            const tiles = document.querySelectorAll(".tile");
            [tiles[emptyTile].textContent, tiles[index].textContent] = [tiles[index].textContent, ""];
            emptyTile = index;
            moves++;
            updateStats();
            checkWin();
        }
    }

    function checkWin() {
        const tiles = [...document.querySelectorAll(".tile")].map(tile => parseInt(tile.textContent));
        const isSorted = tiles.every((val, i) => i === 0 || val === i || val === null);
        if (isSorted) {
            clearInterval(timer);
            alert(`Ви виграли за ${Math.round((Date.now() - startTime) / 1000)} секунд і ${moves} перестановок!`);
        }
    }

    function updateStats() {
        timeDisplay.textContent = Math.round((Date.now() - startTime) / 1000);
        movesDisplay.textContent = moves;
    }

    startGameButton.addEventListener("click", () => {
        initializeGame();
        document.body.className = themeSelect.value === "dark" ? "dark-theme" : "light-theme";
        timer = setInterval(updateStats, 1000);
    });
});