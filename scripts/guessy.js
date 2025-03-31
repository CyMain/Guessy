const guessWords = [{
  word:'Sonic',
  hint:'The Fastest Thing Alive! Or the blue Blur'
}, {
  word:'Chara', 
  hint:'The First Human to fall into the Underground.'
}, {
  word:'Dipper',
  hint:`"The Pines Boy"`
}, {
  word: 'Cyrus',
  hint: 'The creator of this site'
},{
  word: "Frisk",
  hint:"The saviour of the undeground"

},
{
  word: "Link",
  hint: "the hero of time"
}
]
let wordToGuess = '';
let currHint = '';
let currEntry = '';
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let lettersInWTG =[];
let finalizedLetters = [];
let mobileHintOpen = false;
renderGame();

function alterMobileHint(){
  if(mobileHintOpen ==true){
    document.querySelector('.mobile-hint-container').style.display = "none";
    mobileHintOpen = false;
    document.querySelector('.hint-button-img').src ="./assets/images/icons/question-mark-cartoony-icon.png";
  } else{
    document.querySelector('.mobile-hint-container').style.display = "flex";
    mobileHintOpen = true;
    document.querySelector('.hint-button-img').src ="./assets/images/icons/close-cartoony-icon.png";
  }

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
    if(currEntry.length == wordToGuess.length){
       ('congrats, you got the word!!');

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
    console.log('Incorrect input');
  }
}

function resetGame(){
  lettersInWTG = [];
  currEntry = '';
  renderGame();
};

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
  document.querySelector('.hint-button').addEventListener('click', ()=>{
    alterMobileHint();
  })
  hintHTML();

  window.addEventListener("resize", () => {
    if(mobileHintOpen == true){
      alterMobileHint();  
    }
  })
  if(window.matchMedia("(max-width: 600px)").matches){
    alterMobileHint();  
  }
}

function randizeArray(arr){
  let newArr = [];
  for(let i = 0; i < arr.length; i++){
    let currElem = arr[Math.floor(Math.random() * (arr.length))];
    let repeat = false;
    if(newArr.includes(currElem)){
      repeat = true;
    }
    while(repeat == true){
      if(newArr.includes(currElem)){
        repeat = true;
        currElem = arr[Math.floor(Math.random() * (arr.length))];
      } else {
        repeat = false;
      }
    }
    newArr.push(currElem);
  }
  return newArr;
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
 
  let randedArray = randizeArray(lettersArray);
  let lettersInWTGindexes = [];
  finalizedLetters.forEach((letter)=>{
    if(randedArray.indexOf(letter) <= 19){
      lettersInWTGindexes.push(randedArray.indexOf(letter));
    }
  });
  
  randedArray.forEach((letter)=>{
    if((finalizedLetters.includes(letter)) && (randedArray.indexOf(letter)>=19)){
      let indexToBeSwapped = Math.floor(Math.random() * 18);
      while(lettersInWTGindexes.includes(indexToBeSwapped)){
        indexToBeSwapped = Math.floor(Math.random() * 18);
      }
      randedArray = swapIndexPosition(randedArray, randedArray.indexOf(letter), indexToBeSwapped);
    }
  });
  
  randedArray.forEach((letter) => {
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
  let wordObject = guessWords[randInt(0, guessWords.length)];
  wordToGuess = wordObject.word.toUpperCase();
  currHint = wordObject.hint;
}

function congratulate() {
  console.log("Congrats, you got it!");

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
  console.log(`Elements before removal: ${elements.length}`);

  let targetElement = elements.find(ele => Number(ele.dataset.id) === n);

  if (targetElement) {
    targetElement.remove(); // Remove from DOM
    console.log(`Removed confetti with dataset id: ${n}`);
  } else {
    console.warn(`No confetti piece found with dataset id: ${n}`);
  }
}

// Helper function to generate a random color
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