let counterStart = 0;
let counterEnd = 1;
let bool = true;

const sections = Array.from(document.querySelectorAll('section'));
const progress = document.querySelector('.progress h2');
const circles = Array.from(document.querySelectorAll('.circle'));
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const grapes = document.querySelector('.grapes-img');
const menuIcon = document.querySelector('.menu');
const sectionOneWrapper = document.querySelector('.section-1-wrapper');
const sectionFiveWrapper = document.querySelector('.section-5-wrapper');

sectionOneWrapper.style.transform = 'scale(1)';

const progressCounter = () => {
  progress.textContent = `${counterEnd}/${sections.length}`;

  circles.forEach((circle) => {
    circle.style.backgroundColor = 'transparent';
  });
  document.querySelector(`.circle-${counterEnd}`).style.backgroundColor =
    '#ddd';
};

const pageController = () => {
  bool = true;
  if (counterStart === 5) {
    sections.forEach((section) => {
      section.style.left = '0';
    });
    counterStart = 0;
    counterEnd = 1;
    sectionOneWrapper.style.transform = 'scale(1)';
    sectionFiveWrapper.style.transform = 'scale(1.5)';
    progressCounter();
    bool = false;
  }

  if (counterStart === -1) {
    sections.forEach((section) => {
      if (section.classList[0] === 'section-5') {
        return;
      }
      section.style.left = '100vw';
    });
    counterStart = 4;
    counterEnd = 5;
    sectionOneWrapper.style.transform = 'scale(1.5)';
    sectionFiveWrapper.style.transform = 'scale(1)';
    progressCounter();
    bool = false;
  }

  progressCounter();
  return bool;
};

window.addEventListener('wheel', (e) => {
  const deltaY = e.deltaY > 0;
  if (deltaY) {
    counterStart += 1;
    counterEnd += 1;
  } else {
    counterStart -= 1;
    counterEnd -= 1;
  }
  pageController();
  progressCounter();

  if (bool) {
    document.querySelector(
      `.section-${deltaY ? counterStart : counterEnd}`
    ).style.left = `${deltaY ? '-100vw' : '0'}`;

    document.querySelector(
      `.section-${deltaY ? counterStart : counterEnd}-wrapper`
    ).style.transform = `scale(${deltaY ? '1.5' : '1'})`;

    document.querySelector(
      `.section-${deltaY ? counterStart + 1 : counterEnd + 1}-wrapper`
    ).style.transform = `scale(${deltaY ? '1' : '1.5'})`;
  }

  // bool &&
  //   (document.querySelector(
  //     `.section-${deltaY ? counterStart : counterEnd}`
  //   ).style.left = `${deltaY ? '-100vw' : '0'}`);
});

leftBtn.addEventListener('click', () => {
  counterStart -= 1;
  counterEnd -= 1;

  pageController() &&
    (document.querySelector(`.section-${counterEnd}`).style.left = '0');

  if (bool) {
    document.querySelector(`.section-${counterEnd}-wrapper`).style.transform =
      'scale(1)';
    document.querySelector(
      `.section-${counterEnd + 1}-wrapper`
    ).style.transform = 'scale(1.5)';
  }
});

rightBtn.addEventListener('click', () => {
  counterStart += 1;
  counterEnd += 1;

  pageController() &&
    (document.querySelector(`.section-${counterStart}`).style.left = '-100vw');

  if (bool) {
    document.querySelector(`.section-${counterEnd}-wrapper`).style.transform =
      'scale(1)';
    document.querySelector(`.section-${counterStart}-wrapper`).style.transform =
      'scale(1.5)';
  }
});

grapes.addEventListener('mouseover', () => {
  document.querySelector('.section-3-wrapper').style.opacity = '.5';
});

grapes.addEventListener('mouseout', () => {
  document.querySelector('.section-3-wrapper').style.opacity = '1';
});

menuIcon.addEventListener('click', () => {
  document.querySelector('.navbar').classList.toggle('change');
});
