const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const timerElement = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');
const modal = document.getElementById('victory-modal');
const playAgainBtn = document.getElementById('play-again-btn');
const finalTimeElement = document.getElementById('final-time');
const finalMovesElement = document.getElementById('final-moves');

// Supabase Configuration
// Supabase Configuration
// Keys are loaded from config.js
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Game State
let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let timeStart = null;
let timerInterval = null;
let matchedPairs = 0;
const totalPairs = 8;

// Card Data (Emojis)
const emojis = ['🚀', '🐱', '🍕', '🌵', '🎸', '🍦', '💎', '🎈'];

function initGame() {
    // Reset state
    cards = [...emojis, ...emojis]; // Duplicate for pairs
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    moves = 0;
    matchedPairs = 0;
    stopTimer();
    movesElement.textContent = '0';
    timerElement.textContent = '00:00';
    modal.classList.add('hidden');

    // Clear board
    gameBoard.innerHTML = '';

    // Shuffle
    shuffle(cards);

    // Create cards
    cards.forEach(emoji => {
        const card = createCard(emoji);
        gameBoard.appendChild(card);
    });

    startTimer();
}

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;

    const frontFace = document.createElement('div');
    frontFace.classList.add('card-face', 'card-front');

    const backFace = document.createElement('div');
    backFace.classList.add('card-face', 'card-back');
    backFace.textContent = emoji;

    card.appendChild(frontFace);
    card.appendChild(backFace);

    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    incrementMoves();
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    matchedPairs++;
    resetBoard();

    if (matchedPairs === totalPairs) {
        setTimeout(endGame, 500);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function incrementMoves() {
    moves++;
    movesElement.textContent = moves;
}

function startTimer() {
    timeStart = Date.now();
    timerInterval = setInterval(() => {
        const now = Date.now();
        const diff = now - timeStart;
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        timerElement.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

async function endGame() {
    stopTimer();
    finalTimeElement.textContent = timerElement.textContent;
    finalMovesElement.textContent = moves;

    // Calculate seconds
    const timeSeconds = Math.floor((Date.now() - timeStart) / 1000);

    // Save to Supabase
    await saveScore(moves, timeSeconds);

    // Fetch and display leaderboard
    await fetchLeaderboard();

    modal.classList.remove('hidden');
}

async function saveScore(moves, timeSeconds) {
    try {
        const { data, error } = await supabase
            .from('game_scores')
            .insert([
                { moves: moves, time_seconds: timeSeconds }
            ]);

        if (error) throw error;
        console.log('Score saved successfully:', data);
    } catch (error) {
        console.error('Error saving score:', error.message);
    }
}

async function fetchLeaderboard() {
    try {
        const { data, error } = await supabase
            .from('game_scores')
            .select('*')
            .order('moves', { ascending: true })
            .order('time_seconds', { ascending: true })
            .limit(5);

        if (error) throw error;

        displayLeaderboard(data);
    } catch (error) {
        console.error('Error fetching leaderboard:', error.message);
    }
}

function displayLeaderboard(scores) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';

    scores.forEach((score, index) => {
        const date = new Date(score.created_at).toLocaleDateString();
        const minutes = Math.floor(score.time_seconds / 60);
        const seconds = score.time_seconds % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.moves}</td>
            <td>${timeString}</td>
            <td>${date}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Event Listeners
restartBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

// Start game on load
initGame();
