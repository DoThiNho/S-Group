const navItems = document.querySelectorAll('.header__nav-item-link');
const sections = document.querySelectorAll('section');
const html = document.documentElement;
const height = 100;

const header = document.querySelector('.header');
const home = document.querySelector('#home');

window.addEventListener('scroll', function(){
  sections.forEach((section) => {
    const top = section.offsetTop - 100;

    navItems.forEach((navItem) => {
      const hrefNav = navItem.href.match(/#[a-zA-Z]+/)[0];
      const idSection = '#' + section.id;


      if (html.scrollTop >= top && top + height >= html.scrollTop) {
        if(hrefNav === idSection){
          let idActive = document.querySelector('.header__nav-item-link.active');
          if(idActive != null) idActive.classList.remove('active');
          navItem.classList.add('active')
        } 
      } else {
        hrefNav === idSection &&
          navItem.parentElement.classList.remove('active');
      }
    });
  })

  if (html.scrollTop >= home.clientHeight/2){
    header.style.position = "fixed";
  }else {
    header.style.position = "relative";
  }

},{ passive: true }
);


// toggle card
const cards = document.querySelectorAll('.card');
const cardTexts = document.querySelectorAll('.card-text');

cards.forEach((card, index) => {

  const cardText = cardTexts[index];

    card.onclick = function () {
      cardText.classList.toggle('hide');
    }
});


// toggle video 
const btn = document.querySelector('.home__hero-video-link');
const modalVideo = document.querySelector('.video__modal');
const close = document.querySelector('.close');
const body = document.querySelector('body');

btn.addEventListener('click', () => {
  modalVideo.classList.add('show');
  body.style.overflowY = 'hidden';
});

modalVideo.addEventListener('click', () => {
  modalVideo.classList.remove('show');
  body.style.overflowY = 'visible ';
});

close.addEventListener('click', () => {
  modalVideo.classList.remove('show');
  body.style.overflowY = 'visible ';
});