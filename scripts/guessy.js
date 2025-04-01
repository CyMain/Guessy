const guessWords = [{
  word:'Sonic',
  hint:'The Fastest Thing Alive!'
}, {
  word:'Chair', 
  hint:'Something to sit on.'
}, {
  word:'IceCream',
  hint:`I scream, you scream, we all scream for...`
}, {
  word: 'Cyrus',
  hint: 'The creator of this site'
},{
  word: "Sun",
  hint:"A big ball of fire in the sky."
},{
  word: "Dog",
  hint:"A man's best friend."
},{
  word: "Fish",
  hint:"Sea creature that always looks surprised"
},{
  word: "Book",
  hint:"Has two covers... Lots of pages... Some people pretend to read it?"
},{
  word: "Car",
  hint:"A four-wheeled machine that beeps when others drive badly(not you, of course)."
}
]
let gameScore = 0;
let gameTimeID;
let timer = 5;
let usedWords = [];
let wordToGuess = '';
let currHint = '';
let currEntry = '';
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let lettersInWTG =[];
let finalizedLetters = [];
let mobileHintOpen = false;
renderSite();

function gameIntro(){
  const mainGame = document.querySelector('.main-game');
  const stageTag = document.querySelector('.intro-stage');
  const stageTagText = document.querySelector('.stage');
  const intro = document.querySelector('.game-intro');
  console.log(intro);
  const stages = ['ready', 'set', 'go!!'];
  mainGame.style.display= 'none';
  stageTagText.textContent = `Alright Cardan...`;
  setTimeout(()=>{
    setTimeout(()=>{
      stageTagText.style.transform = 'translateX(-50%)';
      for(let i = 0; i < stages.length; i++){
        setTimeout(()=>{
          stageTagText.textContent = stages[i].toUpperCase();
          if(i == 0){
            intro.style.animation = 'bounce-out-left 1s ease-in-out';
          }else if(i===1){
            intro.style.animation = 'bounce-out-right 1s ease-in-out';
          }else if(i===2){
            intro.style.animation = 'bounce-out 1s ease-in-out';
            setTimeout(()=>{
              intro.style.animation = 'fade-out 0.2s ease-in-out';
              setTimeout(()=>{
                intro.style.display = 'none';
                mainGame.style.display='flex';
                renderGame();
              }, 200)
            }, 1000);
            
          }
        }, 1000 * i);
      }
    }, 2000);
    intro.style.display = 'flex';
    stageTagText.style.transform = 'translateX(-50%)';
  }, 1000)
  
  
}

function startGame(){
  if(!gameTimeID){
    gameTimeID = setInterval(()=>{
      timer-=1;
      if(timer <= 0){
        endGame();
      }
      let timeTag = document.querySelector('.time');
      if(timeTag.style.color != 'whitesmoke' && timer>10){
        timeTag.style.color ='whitesmoke'
      } else if(timeTag.style.color != 'red' && timer<=10){
        timeTag.style.color ='red';
      }
      let timeText= `${Math.floor(timer/60) > 0 ? Math.floor(timer/60) : 0}:${(timer % 60)>=10 ? timer%60 : '0'+(timer%60)}`;
      timeTag.textContent=`${timeText}`;
    }, 1000)
  }
}

function alterMobileHint(){
  if(mobileHintOpen == true){
    document.querySelector('.mobile-hint-container').style.display = "none";
    mobileHintOpen = false;
    console.log('successful removal of hint container.');
    document.querySelector('.hint-button-img').src ="./assets/images/icons/question-mark-cartoony-icon.png";
  } else{
    document.querySelector('.mobile-hint-container').style.display = "flex";
    mobileHintOpen = true;
    console.log('successful addition of hint container.');
    document.querySelector('.hint-button-img').src ="./assets/images/icons/close-cartoony-icon.png";
  }
  console.log(mobileHintOpen);

}

function generateInput(letter){
  document.querySelector('.entry').innerHTML += `
    <button class="letter">
        ${letter.toUpperCase()}
    </button> 
  `;
}

function acceptInput(letter){
  if(letter == wordToGuess[currEntry.length]){
    currEntry += letter;
    gameScore += 100;
    if(currEntry.length == wordToGuess.length){
      document.querySelectorAll('.letter').forEach((button) => {
        button.style.pointerEvents = 'none';
      });
      congratulate();
      setTimeout(()=> {
        document.querySelectorAll('.letter').forEach((button) => {
          button.style.pointerEvents = 'auto';
        });
      }, 3000);
      setTimeout(()=> {
        resetGame();
      }, 2000);
    }
    generateInput(letter);
  } else{
    gameScore -= randInt(50, 60);
    console.log('Incorrect input');
  }
  document.querySelectorAll('.score').forEach((score)=>{
    score.textContent = gameScore;
  })
}

function resetGame(){
  lettersInWTG = [];
  currEntry = '';
  renderGame();
};

function renderSite(){
  const html = `
    <div class="main-game">
      <div class="confetti-wrapper">
        <!-- Confetti elements will be created using CSS -->
      </div>
      <div class="mobile-hint-container">
        <div class="hint-container">
          <p class="hint">
          </p>
        </div>
      </div>
      <div class="overall">
        <div class="score-and-timer">
          <div class="curr-score">
            Score: <span class="score">0</span>
          </div>
          <div class="timer">
            Time Remaining: <span class="time">00:10</span>
          </div>
        </div>
        <button class="hint-button">
          <img class="hint-button-img" src="./assets/images/icons/question-mark-cartoony-icon.png" alt="show hint button.">
        </button>
        <div class="hint-container">
          <p class="hint wide-screen">
          </p>
        </div>
        <div class="container">
      
        </div>
        <div class="hint-container">
          <p class="hint wide-screen">
          </p>
        </div>
      </div>
    </div>
    <div class="end-game">
      <div class="game-comment">
        Congrats.
      </div>
      <div class="score-display">
        Your Score is: <span class="player-score">200</span>
      </div>
    </div>
    `;
  document.querySelector('main').innerHTML += html;
  gameIntro();
}

function renderGame(){
  setGuessWord();
  let html = `
    <div class="entry flex-visible">

    </div>
    <div class="letters">
           
    </div>
  `;
  document.querySelector('.container').innerHTML = html;
  const lettersHTML = document.querySelector('.letters'); 
  let displayLetters = randLettersDisplayArr();
  lettersHTML.innerHTML += lettersHtml(displayLetters);

  document.querySelectorAll('.letter').forEach((button) => {
    button.addEventListener('click', () => {
      acceptInput(button.innerText);
    })
  });
  document.querySelector('.hint-button').removeEventListener('click',alterMobileHint);
  document.querySelector('.hint-button').addEventListener('click', alterMobileHint);
  hintHTML();

  window.addEventListener("resize", () => {
    if(mobileHintOpen == true && window.matchMedia("(min-width: 600.5px)").matches){
      alterMobileHint();  
    }
  })
  if(window.matchMedia("(max-width: 600px)").matches){
    alterMobileHint();  
  }

  startGame();
}

function randizeArray(arr){
  for (let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function swapIndexPosition(arr, index1, index2){
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
  return arr;
}

function lettersHtml(lettersArray){
  let html = `
    
  `;
  let count = 0;

  finalizedLetters = [...new Set(lettersArray)];
  let insertedIndexes = new Set();

  finalizedLetters.forEach((element) =>{
    for(let i = 0; i < 20; i++){
      if(!insertedIndexes.has(i)){
        lettersArray[i] = element;
        insertedIndexes.add(i);
        break;
      }
    }
  })

  let firstPart = lettersArray.slice(0, 20);
  randizeArray(firstPart);
  lettersArray.splice(0, 20, ...firstPart);

  randizeArray(lettersArray.slice(0, 20));
  lettersArray.forEach((letter) => {
    while(count <= 19){
      html += `
        <button class="letter">
          ${letter.toUpperCase()}
        </button> 
      `;
      count++;
      break;
  }
 });
 return html;
}

function randInt(start, finish){
  return Math.floor(Math.random() * (finish - start)) + start;
}

function randLettersDisplayArr(){
  getValidLetters();
  let newArr = lettersInWTG.copyWithin();
  let count = 0;
  let found = false;
  alphabets.forEach((letter)=> {
    for(let i = 0; i < newArr.length; i++){
      if(letter == newArr[i]){
        found = true;
      }
    }
    if(found == false){
      newArr.push(letter);
    }
    found = false;
  });
  return newArr;
}

function getValidLetters(){
  let count = 0;
  let found = false;
  alphabets.forEach((letter)=> {
    while (found == false & count < wordToGuess.length){
      if((letter.toUpperCase() == wordToGuess[count]) && (!(lettersInWTG.includes(letter)))){
        lettersInWTG.push(letter);
        found = true;
        break;
      }
      count++;
    }
    found = false;
    count = 0;
  });
  finalizedLetters = lettersInWTG.filter(num => num !="");
}

function setGuessWord(){
  if(usedWords.length == guessWords.length){
    usedWords = [];
  }
  let wordObject = guessWords[randInt(0, guessWords.length)];
  if(usedWords.includes(wordObject.word)){
    while(usedWords.includes(wordObject.word)){
      wordObject = guessWords[randInt(0, guessWords.length)];
    }
  }
  wordToGuess = wordObject.word.toUpperCase();
  currHint = wordObject.hint;
  usedWords.push(wordObject.word);
}

function congratulate() {
  const confettiWrapper = document.querySelector(".confetti-wrapper");
  if (!confettiWrapper) {
    console.warn("Confetti wrapper not found.");
    return;
  }

  // Generate confetti
  for (let i = 0; i < 140; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");
    confetti.style.left = `${Math.random() * 100}%`;

    const fallDur = Math.random() * 3 + 3; // Duration between 3s and 6s
    confetti.dataset.id = i; // Set dataset id

    confetti.style.setProperty("--fall-duration", `${fallDur}s`);
    confetti.style.setProperty("--confetti-color", getRandomColor());

    confettiWrapper.appendChild(confetti);

    // Ensure the correct `i` value is passed to setTimeout by using a closure
    setTimeout((confettiId) => {
      removeNthInstance(".confetti-piece", confettiId);
    }, fallDur * 1000 - 200, i);
  }
}

function removeNthInstance(selector, n) {
  let elements = Array.from(document.querySelectorAll(selector)); // Convert NodeList to array

  let targetElement = elements.find(ele => Number(ele.dataset.id) === n);

  if (targetElement) {
    targetElement.remove(); // Remove from DOM
  } else {
    console.warn(`No confetti piece found with dataset id: ${n}`);
  }
}

function getRandomColor() {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function hintHTML (){
  let html = `
    Hint: <span class="act-hint">${currHint}</span>
    `;
  document.querySelectorAll('.hint').forEach((hint) =>{
    hint.innerHTML = html;
  })
}

function endGame(){
  clearInterval(gameTimeID);
  document.querySelectorAll('.letter').forEach((button) => {
    button.style.pointerEvents = 'none';
  });
  let mainGame = document.querySelector('.main-game');
  let endGameTag = document.querySelector('.end-game');
  let endComment = document.querySelector('.game-comment');
  let playerScore = document.querySelector('.player-score');
  mainGame.style.animation = 'fade-out 2s ease-in-out';
  commentGenerator(gameScore, endComment, playerScore);
  setTimeout(()=>{
    mainGame.style.display ='none';
    console.log('main game gone')
  }, 2000);
  setTimeout(()=>{
    console.log('end-game in.')
    endGameTag.style.display="flex";
    playerScore.textContent = `${gameScore}`;
    endGameTag.style.animation = 'fade-in 4s ease-in-out';
    timer = 0;
  gameScore = 0; 
  }, 3000);
  /*
  <div class="end-game">
      <div class="game-comment">
        Congrats.
      </div>
      <div class="score-display">
        Your Score is: <span class="player-score">200</span>
      </div>
    </div>*/
}

function commentGenerator(gameScore, endComment, playerScore){
  if(gameScore>1000){
    endComment.textContent = `How'd you even get this!?`
  }else if(gameScore>900){
    endComment.textContent = `Congrats!`
  }else if(gameScore>600){
    endComment.textContent = `Not Bad.`
  }else if(gameScore>=300){
    endComment.textContent = `You can do better.`
  }else{
    endComment.textContent = `Just Terrible.`
  }

  if(gameScore>600){
    playerScore.style.color = 'light-green';
  } else if(gameScore>=300){
    playerScore.style.color = 'orange';
  }else{
    playerScore.style.color = 'red';
  }
}