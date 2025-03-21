const guessWords = ['SONIC', 'CHARA', 'CYRUS', 'DIPPER'];
let wordToGuess = '';
let currEntry = '';
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let lettersInWTG =[];
let finalizedLetters = [];
console.log(wordToGuess);
renderGame();



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
      console.log('congrats, you got the word!!');

      document.querySelectorAll('.letter').forEach((button) => {
        button.style.pointerEvents = 'none';
      });
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
    console.log(currEntry);
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
  console.log(wordToGuess);
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
      console.log(randedArray.indexOf(letter));
    }
  });
  
  randedArray.forEach((letter)=>{
    if((finalizedLetters.includes(letter)) && (randedArray.indexOf(letter)>=19)){
      console.log(`current randedArray is: ${randedArray}`);
      let indexToBeSwapped = Math.floor(Math.random() * 18);
      while(lettersInWTGindexes.includes(indexToBeSwapped)){
        indexToBeSwapped = Math.floor(Math.random() * 18);
        console.log(indexToBeSwapped);
      }
      randedArray = swapIndexPosition(randedArray, randedArray.indexOf(letter), indexToBeSwapped);
      console.log(`current randedArray is: ${randedArray}`);
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
  console.log(`The new letterInWTG is ${lettersInWTG}`);
  
  finalizedLetters = lettersInWTG.filter(num => num !="");
}

function setGuessWord(){
  wordToGuess = guessWords[randInt(0, guessWords.length)];
  console.log(wordToGuess);
}