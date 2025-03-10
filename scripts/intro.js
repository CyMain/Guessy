renderIntro();

function renderIntro(){
  html = `
  <section class="welcome fade-in-out flex-visible">Welcome To Guessy!</section>
    <form class="invisible fade-in">
      <label for="username">What's your name?</label>
      <input name="username" id="username" placeholder="Enter your name(Mike, Sonic, John Cena...)">
      <button>Done</button>
    </form>
    <section class="greeting invisible fade-in">Greetings [insert name]!!</section>
  `;

  document.querySelector('.UI-container').innerHTML = html;

  setTimeout(()=>{
    document.querySelector('.welcome'). classList.add('invisible');
    document.querySelector('.welcome'). classList.remove('flex-visible');
    document.querySelector('form').classList.add('flex-visible');
    document.querySelector('form').classList.remove('invisible');
},5000);

}

