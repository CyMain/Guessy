

let wordToGuess = 'SONIC';
let currEntry = '';
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const lettersInWTG =[];
let finalizedLetters = [];
console.log(wordToGuess);
renderGame();

function generateInput(letter){
  console.log('runs');
  document.querySelector('.entry').innerHTML += `
    <button class="letter">
        ${letter.toUpperCase()}
    </button> 
  `;
}

function acceptInput(letter){
  if(!(currEntry.lenght >= wordToGuess.length)){
    currEntry += letter;
  }
}

function renderGame(){
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
      generateInput(button.innerHTML);
    })
  });
}

function randizeArray(arr){
  let newArr = [];
  let curElem;
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
  randedArray.forEach((letter)=>{
    if((finalizedLetters.includes(letter)) && (randedArray.indexOf(letter)>=19)){
      let indexToBeSwapped = Math.floor(Math.random() * 19);
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
  return Math.random() *(finish - start) + start;
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
      if(letter.toUpperCase() == wordToGuess[count]){
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