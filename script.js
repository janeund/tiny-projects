const startBtn = document.getElementById('btn-start');
const gameContainer = document.getElementById('container');
const gameContent = document.querySelector('.content');
const sectionWrappers = document.querySelectorAll('.section-wrapper');
const sections = ['theme', 'size'];
const tabs = document.querySelectorAll('.tab');
const themeTabs = document.querySelectorAll('.theme .tab');
const sizeTabs = document.querySelectorAll('.size .tab');


// Update page after click 'start game' depending on options selection
const startGame = () => {
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

// Display game page content depending on options selected
const gameVersion = (theme, size) => {
  // if (theme === 'numbers' && size === '4x4') {
    
  // }
}

// Switch between selected tabs on each section
const setSelection = () => {
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

setSelection();

startBtn.addEventListener('click', startGame);