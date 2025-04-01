import { storeUserName } from "./data/data.js";

renderIntro();

function acceptName(){
  const greeting = document.querySelector('.greeting');
  const form = document.querySelector('form');
  let sName = document.querySelector('input').value;
  if(sName != ''){
    greeting.innerHTML = `Greetings, ${sName}`;
  form.classList.add('invisible');
  form.classList.remove('flex-visible');
  greeting.classList.add('flex-visible');
  greeting.classList.remove('invisible');
  setTimeout(() => {
    window.location = "./guessy.html";
  }, 4100)
  storeUserName(sName);
  } else {
    let nameWarning = document.querySelector('.name-warning');
    nameWarning.innerHTML = `Please enter a name.`
    nameWarning.style.display='flex';
  }
}

function renderIntro(){
  let html = `
  <section class="welcome fade-in-out flex-visible">Welcome To Guessy!</section>
    <form class="invisible fade-in" method="dialog">
      <label for="username">What's your name?</label>
      <input autocomplete="off" type="text" maxlength="20" name="username" id="username" pattern="[^ ]+" placeholder="Enter your name(Mike, Sonic, John Cena...)">
      <p class="name-warning">
        That character isn't allowed~
      </p>
      <input value="Done" type="submit" class="name-submit">
    </form>
    <section class="greeting invisible fade-in">Greetings [insert name]!!</section>
  `;

  document.querySelector('.UI-container').innerHTML = html;
  document.getElementById('username').addEventListener('keydown', function(event){
    const forbiddenChars = ['@', '#', '$', '%', '^', '&', '*', '!', '(', ')', '/', '\\', '.', ',', ';', ':', '[', ']',  '|', '`', '~', '-', '+', '=', "'", ">", "<", "{", "}", "?", '"'];
    if(forbiddenChars.includes(event.key) || ((event.key === " ") && (this.value.length === 0))){
      event.preventDefault();
      let nameWarning = document.querySelector('.name-warning');
      nameWarning.innerHTML = `That character isn't allowed~`;
      nameWarning.style.display='flex';
    };
  })
  document.querySelector('.name-submit').addEventListener('click', ()=>{
    acceptName();
  })

  setTimeout(()=>{
    document.querySelector('.welcome'). classList.add('invisible');
    document.querySelector('.welcome'). classList.remove('flex-visible');
    document.querySelector('form').classList.add('flex-visible');
    document.querySelector('form').classList.remove('invisible');
},5000);

}

