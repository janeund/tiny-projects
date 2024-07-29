// Issues list - TODO
// fix (remove) hover effect on selection page tabs, which are already selected
// check values of moves and time elapsed on end game modal window
// add responsive design, check sises (6X6 font size for is giant, and grid gap is too huge)

const icons = [
  'plane', 'star', 'lemon', 'tree', 
  'umbrella', 'pen', 'cloud', 'mountain-sun', 
  'plane', 'star', 'lemon', 'tree', 
  'umbrella', 'pen', 'cloud', 'mountain-sun', 
  'plane', 'star', 'lemon', 'tree', 
  'umbrella', 'pen', 'cloud', 'mountain-sun', 
  'plane', 'star', 'lemon', 'tree', 
  'umbrella', 'pen', 'cloud', 'mountain-sun', 
];

let timer = null;

// Moves counter
let movesCount = 0;
const moveCounter = () => {
  const moves = document.querySelector('.moves')
  movesCount++;
  moves.textContent = movesCount; 
}

// Time up counter
let totalSec = 0;
const timeCounter = () => {
  const min = document.getElementById('min');
  const sec = document.getElementById('sec');
  totalSec = 0;
  timer = setInterval(() => {
    console.log(totalSec);
    totalSec++;
    min.innerHTML = pad(parseInt(totalSec / 60));
    sec.innerHTML = pad(totalSec % 60);
  }, 1000)
}

// Validate timer (add 0s before min and sec values)
const pad = (val) => {
  let valToStr = val + '';
  if (valToStr.length < 2) {
    return valToStr = '0' + valToStr
  } else {
    return valToStr
  }
}

// Restart game
const restart = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(item => item.classList.remove('flipped'));
  const moves = document.querySelector('.moves');
  moves.textContent = 0
  totalSec = 0;
  movesCount = 0;
}

// Init new game
const newGame = () => {
  clearInterval(timer);
  displaySelectionPage();
  totalSec = 0;
  movesCount = 0;
}

// Display starting page for theme and size selection
const displaySelectionPage = () => {
  const body = document.body;
  body.innerHTML = '';
  const container = document.createElement('div');
  body.classList.remove('bg-light');
  body.classList.add('bg-dark');
  container.classList.add('container');
  body.insertBefore(container, body.firstChild);

  const template = `
  <h1 class="heading-main">memory</h1>
  <div class="content">
    <div class="theme">
      <h2 class="heading-secondary">Select Theme</h2>
      <div class="section-wrapper theme-wrapper">
        <div data-type="theme" id="numbers" class="theme-item tab">Numbers</div>
        <div data-type="theme" id="icons" class="theme-item tab">Icons</div>
      </div>
    </div>
    <div class="size">
      <h2 class="heading-secondary">Grid Size</h2>
      <div class="section-wrapper size-wrapper">
        <div data-type="size" id="4" class="size-item tab">4x4</div>
        <div data-type="size" id="6" class="size-item tab">6x6</div>
      </div>
    </div>
    <button id="btn-start" class="btn btn-start" type="submit">Start Game</button>
  </div>
  `; 
  container.insertAdjacentHTML('afterbegin', template);
  setSelection();
  document.querySelector('#btn-start').addEventListener('click', startGame);
}

// Switch between selected tabs on each section
const setSelection = () => {
  const sectionWrappers = document.querySelectorAll('.section-wrapper');
  const themeTabs = document.querySelectorAll('.theme .tab');
  const sizeTabs = document.querySelectorAll('.size .tab');
  sectionWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('theme-item')) {
        themeTabs.forEach(tab => tab.classList.remove('selected'))
        e.target.classList.add('selected')
      } else if (e.target.classList.contains('size-item')) {
        sizeTabs.forEach(tab => tab.classList.remove('selected'))
        e.target.classList.add('selected')
      }
    })
  });
}

// Update page after click 'start game' depending on options selection
const startGame = () => {
  const tabs = document.querySelectorAll('.tab');
  let selectedTabs = {
    theme: null,
    size: null,
  };
  tabs.forEach(tab => {
    if (tab.classList.contains('selected') && tab.dataset.type === 'theme') {
      selectedTabs.theme = tab.id
    } else if (tab.classList.contains('selected') && tab.dataset.type === 'size') {
      selectedTabs.size = tab.id
    }
  })
  console.log(selectedTabs);
  displayGrid(selectedTabs.theme, selectedTabs.size);
  timeCounter();
}

// Display game page content depending on options selected
const displayGrid = (theme, size) => {
  const body = document.body;
  body.innerHTML = '';
  body.classList.remove('bg-dark');
  body.classList.add('bg-light');
  const container = document.createElement('div'); 
  container.classList.add('container-game');
  body.insertBefore(container, body.firstChild);
  const headerTemplate = `
  <header class="header">
      <a href="/memory-game/index.html" class="logo">
        <img src="./logo.svg" alt="memory">
      </a>
      <div class="buttons">
        <button class="btn restart-btn">Restart</button>
        <button class="btn new-game-btn">New Game</button>
      </div>
    </header>
  `;

  const gameContainer = document.createElement('div');
  gameContainer.classList.add('grid', `grid-${size}`);
  // const numbers = generateCardValue(size);
  // Make the array of icons shuffled 
  let shuffledCards = null;
  if (theme === 'numbers') {
    shuffledCards = shuffleCards(generateNumbers(size));
  } else {
    icons.length = size * size / 2;
    shuffledCards = shuffleCards([...icons,...icons]);
  }

  // Display pairs of numbers/icons on cards depending on chosen options
  shuffledCards.forEach((el, i) => {
    const card = document.createElement('div');
    card.classList.add('card', `card-${size}`);
    card.setAttribute('data-name', el);
    card.setAttribute('id', i);
    if (theme === 'numbers') {
      card.innerHTML = `
       <div class='front-face'></div>
       <div class='back-face'>${el}</div>`;
    } else {
      card.innerHTML = `
       <div class='front-face'></div>
       <div class='back-face'><i class="fa-solid fs-600 fa-${el}"></i></div>`;
    }
    gameContainer.appendChild(card);
  })

  const footerTemplate = `
    <footer class="footer">
      <div class="footer-container container">
        <div class="actions">
          <div class="actions-item timer">
            <div class="actions-name">Time</div>
            <div id='timer-progress' class="actions-value">
            <span id='min' class='min'>00</span> : 
            <span id='sec' class='sec'>00</span>
            </div>
          </div>
          <div class="actions-item moves-counter">
            <p class="actions-name">Moves</p>
            <p class="actions-value moves">0</p>
          </div>
        </div>
      </div>
    </footer>`;

  container.insertAdjacentHTML('afterbegin', headerTemplate); 
  container.insertAdjacentElement('beforeend', gameContainer); 
  container.insertAdjacentHTML('beforeend', footerTemplate); 
  cardClickHandler(size * size / 2);

  const restartBtn = document.querySelector('.restart-btn');
  const newGameBtn = document.querySelector('.new-game-btn');
  restartBtn.addEventListener('click', restart);
  newGameBtn.addEventListener('click', newGame);
  
}

// Click on card
const cardClickHandler = (size) => {
  const cardsContainer = document.querySelector('.grid');
  // Array of matched cards objects (!> 2)
  let match = [];
  // Array of clicked DOM elements (!> 2)
  let clicked = [];
  // Array of nested arrays with correct flipped pairs of cards (names)
  let correct = [];
  // Event delegation on cards container, listening to DOM elements inside with 'card' classname
  cardsContainer.addEventListener('click', (e) => {
    let clickedCard = e.target.parentElement;
    if (clickedCard.classList.contains('card')) {
      clickedCard.classList.toggle('flipped')
      clicked.push(clickedCard);
      match.push({name: clickedCard.dataset.name, id: clickedCard.id});
      // If pairs of clicked (flipped) cards are not matched, then flipped them back after 1sec
      // otherwise keep both flipped and add to "correct" array
      if (match.length === 2 && match[0].name !== match[1].name) {
        clicked.forEach(item => setTimeout(() => item.classList.remove('flipped'), 1000));
        match.length = 0;
        clicked.length = 0;
      } else if (match.length === 2 && match[0].name === match[1].name && match[0].id === match[1].id) {
        match.length = 0;
        clicked.length = 0;
        // correct.push([clickedCard.dataset.name, clickedCard.dataset.name]);
      } else if (match.length === 2 && match[0].name === match[1].name && match[0].id !== match[1].id) {
        match.length = 0;
        clicked.length = 0;
        correct.push([clickedCard.dataset.name, clickedCard.dataset.name]);
      }
      moveCounter();
    }
      console.log(match, clicked, correct, correct.length, size);
      if (correct.length === size && clicked.length === 0) {
        setTimeout(() => showModal(), 1500)
      }
  })
}


// Show modal with results if all cards pairs are flipped
const showModal = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
  <div class="modal-inner">
      <h3 class="modal-heading">You did it!</h3>
      <p class="modal-text">Game over! Here’s how you got on…</p>
      <div class="actions actions-modal">
        <div class="actions-item actions-item-modal timer">
          <p class="actions-name">Time Elapsed</p>
          <p class="actions-value">1:25</p>
        </div>
        <div class="actions-item actions-item-modal moves-counter">
          <p class="actions-name">Moves Taken</p>
          <p class="actions-value">15 Moves</p>
        </div>
      </div>
      <div class="buttons buttons-modal">
        <button class="btn restart-btn btn-modal">Restart</button>
        <button class="btn new-game-btn btn-modal">Setup New Game</button>
      </div>
    </div>`;
    document.querySelector('.container').appendChild(modal);
}

// Generate random card value 
const generateNumbers = (size) => {
  // let cardsArrLength = size;
  const values = [];
  for (let i = size * size / 2; i > 0; i--) {
    let random = Math.floor(Math.random() * 100) + 1;
    values.push(random, random);
  }
  return values; 
}

// Shuffle cards
const shuffleCards = (arr) => {
  let currentIndex = arr.length;
  // While there are any elements in array...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element
   [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], [arr[currentIndex]]]
  }
  return arr;
}

const init = () => {
  displaySelectionPage();
}

document.addEventListener('DOMContentLoaded', init)