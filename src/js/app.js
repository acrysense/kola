document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'))

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    function resizeMobileHeight() {
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }

    // HEIGHT RIVERS CONTENT
    const riversContentMobile = document.querySelector('.rivers--mobile')

    if (riversContentMobile) {
        if (window.innerWidth > 1023) {
            let heightRiversContent = riversContentMobile.clientHeight;
            riversContentMobile.style.setProperty('margin-bottom', `-${heightRiversContent}px`);
        } else {
            riversContentMobile.style.setProperty('margin-bottom', `-${0}px`);
        }
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1023) {
                let heightRiversContent = riversContentMobile.clientHeight;
                riversContentMobile.style.setProperty('margin-bottom', `-${heightRiversContent}px`);
            } else {
                riversContentMobile.style.setProperty('margin-bottom', `-${0}px`);
            }
        });
    }

    // SMOOTH SCROLL
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
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID) - Number(header.clientHeight);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // SLIDE UP
    let slideUp = (target, duration = 500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout( () => {
              target.style.display = 'none';
              target.style.removeProperty('height');
              target.style.removeProperty('padding-top');
              target.style.removeProperty('padding-bottom');
              target.style.removeProperty('margin-top');
              target.style.removeProperty('margin-bottom');
              target.style.removeProperty('overflow');
              target.style.removeProperty('transition-duration');
              target.style.removeProperty('transition-property');
        }, duration);
    }

    // SLIDE DOWN 
    let slideDown = (target, duration = 500) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout( () => {
          target.style.removeProperty('height');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
        }, duration);
    }

    // TOGGLE
    var slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none') {
          return slideDown(target, duration);
        } else {
          return slideUp(target, duration);
        }
    }

    // SLIM SELECT
    new SlimSelect({
        select: '#select-residence'
    });
    new SlimSelect({
        select: '#select-role'
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

    // SCROLL TO NEXT SECTION
    const offerArrowDown = document.querySelector('.offer__arrow-down')

    if (offerArrowDown) {
        offerArrowDown.addEventListener('click', (event) => {
            event.preventDefault()
    
            smoothScroll('about')
        })
    }

    // FORM JOIN
    const formJoin = document.querySelector('.form-join')
    const formJoinDetailsBtn = document.querySelector('.form-join__btn--details')

    if (formJoinDetailsBtn) {
        formJoinDetailsBtn.addEventListener('click', (event) => {
            event.preventDefault()

            slideUp(formJoinDetailsBtn, 250);
            formJoin.classList.remove('form-join--hidden')
        })
    }

    // POPUP
    const popupBtn = document.querySelectorAll('.popup-btn'),
        popup = document.querySelectorAll('.popup'),
        popupClose = document.querySelectorAll('.popup__close'),
        popupOverlay = document.querySelector('.popup-overlay')
    
    if (popupBtn) {
        popupBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                if (!popupOverlay.classList.contains('popup-overlay--active')) {
                    popupOverlay.classList.add('popup-overlay--active')
                }
                document.body.classList.add('scroll-disabled');
                popup[i].classList.add('popup--active');
            });
        });
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (popup && popupOverlay.classList.contains('popup-overlay--active')) {
            if (key == 27) {
                document.body.classList.remove('scroll-disabled');
                document.querySelectorAll('.popup.popup--active').forEach((child) => child.classList.remove('popup--active'));
                document.querySelector('.popup-overlay').classList.remove('popup-overlay--active');
            };
        }
    }, false);


    if (popupOverlay) {
        popupOverlay.addEventListener('click', () => {
            if (popup && popupOverlay.classList.contains('popup-overlay--active')) {
                document.body.classList.remove('scroll-disabled');
                document.querySelectorAll('.popup.popup--active').forEach((child) => child.classList.remove('popup--active'));
                document.querySelector('.popup-overlay').classList.remove('popup-overlay--active');
            }
        });
    }

    if (popupClose) {
        popupClose.forEach((item) => {
            item.addEventListener('click', () => {
                document.body.classList.remove('scroll-disabled');
                document.querySelectorAll('.popup.popup--active').forEach((child) => child.classList.remove('popup--active'));
                popupOverlay.classList.remove('popup-overlay--active');
            });
        });
    }

    // TABS
    const tabsItems = document.querySelectorAll('.tabs__item')

    if (tabsItems) {
        tabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.tabs__item').forEach((child) => child.classList.remove('tabs__item--active'))
                document.querySelectorAll('.tabs__content').forEach((child) => child.classList.remove('tabs__content--active'))
    
                item.classList.add('tabs__item--active')
                document.querySelectorAll('.tabs__content')[i].classList.add('tabs__content--active')
            })
        })
    }
});