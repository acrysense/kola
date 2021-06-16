document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'))

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // SLIM SELECT
    new SlimSelect({
        select: '#select1'
    });
    new SlimSelect({
        select: '#select2'
    });
    
    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const overlay = document.querySelector('.overlay')

    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('hamburger--active') && overlay.classList.contains('overlay--open')) {
            hamburger.classList.remove('hamburger--active')
            overlay.classList.remove('overlay--open')
            document.body.classList.remove('scroll-disabled')
        } else {
            hamburger.classList.add('hamburger--active')
            overlay.classList.add('overlay--open')
            document.body.classList.add('scroll-disabled')
        }
    });
    
    // HEADER STICKY
    const header = document.querySelector('.header')

    if (header) {
        window.addEventListener('scroll', () => {
            console.log(window.pageYOffset)
            if (window.pageYOffset > 0) {
                header.classList.add('header--background')
            } else {
                header.classList.remove('header--background')
            }
        })
    }
});