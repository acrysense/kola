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
            if (window.pageYOffset > 0) {
                header.classList.add('header--background')
            } else {
                header.classList.remove('header--background')
            }
        })
    }

    // SCROLL TO
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }
    
    
    function elmYPosition(eID) {
        var elm = document.getElementById(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    
    function smoothScroll(eID) {
        var startY = currentYPosition();
        var stopY = elmYPosition(eID) - Number(header.clientHeight);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    document.querySelector('.offer__arrow-down').addEventListener('click', (event) => {
        event.preventDefault()

        smoothScroll('about')
    })
});