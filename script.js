const carro = document.querySelector('.carro');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;


function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 300) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 35;
          carro.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 35;
      carro.style.bottom = position + 'px';
    }
  }, 35);
}

function createdino() {
  const dino = document.createElement('div');
  let dinoPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  dino.classList.add('dino');
  background.appendChild(dino);
  dino.style.left = dinoPosition + 'px';

  let leftTimer = setInterval(() => {
    if (dinoPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(dino);
    } else if (dinoPosition > 0 && dinoPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      dinoPosition -= 10;
      dino.style.left = dinoPosition + 'px';
    }
  }, 20);

  setTimeout(createdino, randomTime);
}

createdino();
document.addEventListener('keyup', handleKeyUp);