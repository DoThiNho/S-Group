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


// toggle menu mobile/tablet
const menuIcons = document.querySelectorAll('.header iconify-icon')
const menu = document.querySelector('.header__menu')

console.log(menu)

menuIcons.forEach(menuIcon => {
  menuIcon.addEventListener('click', () => {
    menu.classList.toggle('apperance')
  })
})



const workModal = document.querySelector('.work__modal');
const galleryImages = document.querySelectorAll('.work__gallery-link img');
const gallerys = document.querySelectorAll('.work__gallery');
const modalClosebtn = document.querySelector('.work__modal-btn');
const imgModal = document.querySelector('.work__modal-img img');
const modalCounter = document.querySelector('.work__modal-counter');
const prevbtn = document.querySelector('.prev');
const nextbtn = document.querySelector('.next');

let currentImg = 0;

gallerys.forEach((gallery, index) => {
  gallery.addEventListener('click', (event) => {
      event.preventDefault();
      imgModal.src = galleryImages[index].src;
      modalCounter.innerText = index+1;
      currentImg = index;
      workModal.classList.add('apperance-flex')
      body.style.overflowY = 'hidden';
    })
})

modalClosebtn.addEventListener('click', () => {
    workModal.classList.add('hide')
    workModal.classList.remove('apperance-flex')
    body.style.overflowY = 'visible ';
})

workModal.addEventListener('click', (e) => {
  e.stopPropagation()
  workModal.classList.add('hide')
  workModal.classList.remove('apperance-flex');
  body.style.overflowY = 'visible ';
})


prevbtn.addEventListener('click', (e) => {
  e.stopPropagation()
    if(currentImg === 0) currentImg = galleryImages.length
    imgModal.src = galleryImages[currentImg-1].src;
    currentImg--;
})


nextbtn.addEventListener('click', (e) => {
  e.stopPropagation()
  if(currentImg === galleryImages.length-1) currentImg = 0
  imgModal.src = galleryImages[currentImg+1].src;
  currentImg++;
})



