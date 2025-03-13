renderIntro();

let uName;

function renderIntro(){
  let html = `
  <section class="welcome fade-in-out flex-visible">Welcome To Guessy!</section>
    <form class="invisible fade-in" method="dialog">
      <label for="username">What's your name?</label>
      <input name="username" id="username" placeholder="Enter your name(Mike, Sonic, John Cena...)">
      <button onclick='
        acceptName();
      '>Done</button>
    </form>
    <section class="greeting invisible fade-in">Greetings [insert name]!!</section>
  `;

  document.querySelector('.UI-container').innerHTML = html;

  document.querySelector('button').addEventListener('click', ()=>{
    acceptName();
  })

  setTimeout(()=>{
    document.querySelector('.welcome'). classList.add('invisible');
    document.querySelector('.welcome'). classList.remove('flex-visible');
    document.querySelector('form').classList.add('flex-visible');
    document.querySelector('form').classList.remove('invisible');
},5000);

}

function acceptName(){
  const greeting = document.querySelector('.greeting');
  const form = document.querySelector('form');
  let sName = document.querySelector('input').value;
  greeting.innerHTML = `Greetings ${sName}`;
  form.classList.add('invisible');
  form.classList.remove('flex-visible');
  greeting.classList.add('flex-visible');
  greeting.classList.remove('invisible');
  setTimeout(() => {
    window.location = "./guessy.html";
  }, 4000)
  uName = sName;
}