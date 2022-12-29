const navItems = document.querySelectorAll('.header__nav-item-link');
const sections = document.querySelectorAll('section');
const html = document.documentElement;
const height = 100;

window.addEventListener('scroll', function(){
  sections.forEach((section) => {
    const top = section.offsetTop - 100;

    navItems.forEach((navItem) => {
      const hrefNav = navItem.href.match(/#[a-zA-Z]+/)[0];
      const idSection = '#' + section.id;


      if (html.scrollTop >= top && top + height >= html.scrollTop) {
        if(hrefNav === idSection) console.log(navItem);
        hrefNav === idSection
          ? navItem.classList.add('active')
        : navItem.classList.remove('active');
      } else {
        hrefNav === idSection &&
          navItem.parentElement.classList.remove('active');
      }
    });
  })
},{ passive: true }
);
