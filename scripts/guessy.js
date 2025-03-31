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
let usedWords = [];
let wordToGuess = '';
let currHint = '';
let currEntry = '';
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let lettersInWTG =[];
let finalizedLetters = [];
let mobileHintOpen = false;
renderGame();

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
  
}