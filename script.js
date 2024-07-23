
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

  gameVersion(selectedTabs.theme, selectedTabs.size);
}

// Initilize game with selected options
const gameVersion = (theme, size) => {
  if (theme === 'numbers' && size === '4x4') {
    displayGrid('numbers', 4)
  }
  if (theme === 'numbers' && size === '6x6') {
    displayGrid('numbers', 6)
  }
  if (theme === 'icons' && size === '4x4') {
    displayGrid('icons', 4)
  }
  if (theme === 'icons' && size === '6x6') {
    displayGrid('icons', 6)
  }
}

// Display starting page for theme and size selection
const displaySelectionPage = () => {
  const container = document.createElement('div');
  const body = document.body;
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
        <div data-type="size" id="4x4" class="size-item tab">4x4</div>
        <div data-type="size" id="6x6" class="size-item tab">6x6</div>
      </div>
    </div>
    <button id="btn-start" class="btn btn-start" type="submit">Start Game</button>
  </div>
  `; 
  container.insertAdjacentHTML('afterbegin', template);
  document.querySelector('#btn-start').addEventListener('click', startGame);
}



// Display game page content depending on options selected
const displayGrid = (theme, size) => {
  const body = document.body;
  body.innerHTML = '';
  const container = document.createElement('div'); 
  container.classList.add('container');
  body.insertBefore(container, body.firstChild);
  const headerTemplate = `
  <header class="header">
      <a href="/" class="logo">
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
  for (let i = 1; i < size * size + 1; i++) {
    const card = document.createElement('div');
    card.classList.add('card', `card-${size}`);
    card.textContent = Math.ceil(i / 2);
    console.log(Math.round(i / 2));
    gameContainer.appendChild(card);
  }

  const footerTemplate = `
    <footer class="footer">
      <div class="footer-container container">
        <div class="actions">
          <div class="actions-item timer">
            <p class="actions-name">Time</p>
            <p class="actions-value">1:25</p>
          </div>
          <div class="actions-item moves-counter">
            <p class="actions-name">Moves</p>
            <p class="actions-value">15</p>
          </div>
        </div>
      </div>
    </footer>`;

  container.insertAdjacentHTML('afterbegin', headerTemplate); 
  container.insertAdjacentElement('beforeend', gameContainer); 
  container.insertAdjacentHTML('beforeend', footerTemplate); 
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

displaySelectionPage();

setSelection();

// document.addEventListener('DOMContentLoaded', init)