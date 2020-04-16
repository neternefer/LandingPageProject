document.addEventListener('DOMContentLoaded', () => {
    //sections linked to dynamically created menu
    const linkedSections = document.getElementsByClassName('linked');
    //top menu elements + hamburger icon
    const elementsToHide = document.querySelectorAll('.hide-on-scroll');
    const header = document.querySelector('header').getBoundingClientRect().height;
    let isScrolling;

    const populateList = () => {
        //get ul element to populate
        const menuList = document.getElementById('dynamic-menu-list');
        //iterate through the sections and create li element for each
        for(section of linkedSections) {
            let listElement = `
                <li><a href="#${section.id}" class="${section.id}">
                    ${section.dataset.nav}
                    </a>
                </li>`;
            //insert li element into ul
            menuList.insertAdjacentHTML('beforeend', listElement);
            //attach event listener to each li element
            menuList.querySelector(`.${section.id}`).addEventListener('click', scrollingTo);
        }
    };

    const isInViewport = (section) => {
        //get current section rect object
        let sectionPosition = section.getBoundingClientRect();
        //if section top in the upper part of the page (100px offset)
        //and section bottom less than window height
        if(sectionPosition.top <= window.innerHeight / 2  &&
            sectionPosition.top >= header  &&
            sectionPosition.bottom <= window.innerHeight + header) {
            return true;
        }
        return false;
    };

    const setActive = () => {
        //iterate through sections and add active class to section and corresponding links
        for(section of linkedSections) {
            section.classList.toggle('active', isInViewport(section));
            document.querySelector(`.${section.id}`).classList.toggle('active-link', isInViewport(section));
        }
    };

    const scrollingTo = (e) => {
        //scroll to correct element with top offset to clear the header
        e.preventDefault();
        let anchor = document.querySelector(e.currentTarget.getAttribute('href'));
        const offset = -header;
        const y = anchor.getBoundingClientRect().top + offset + window.pageYOffset;
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    };

    const checkScrolling = () => {
        //check if the user is scrolling
        //keep top menu visible if scrlled all the way up
        setDisplay(elementsToHide, 'block');
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if(document.querySelector('header').getBoundingClientRect().top !== 0) {
                setDisplay(elementsToHide, 'none');
            }
        }, 2250);
    };

    const scrollPast = () => {
        //check if user scrolled to the bottom
        //show back-to-top arrow
        const scrollUpArrow = document.getElementById('scroll-up');
        scrollUpArrow.addEventListener('click', scrollingTo);
        if(window.pageYOffset > window.innerHeight) {
            setDisplay([scrollUpArrow], 'block');
        } else {
            setDisplay([scrollUpArrow], 'none');
        }
    };

    const toggleBlackScreen = () => {
        //remove black intro screen
        document.querySelector('.black-cover').classList.remove('visible');
        setDisplay([document.querySelector('.grid')], 'grid');
    };

    const addListeners = () => {
        //add event listeners for intro screen, hamburger and close icon
        document.querySelector('.black-cover h1').addEventListener('click',
        () => toggleBlackScreen('.black-cover'));
        document.querySelector('svg').addEventListener('click',
        () => toggleSideMenu());
        document.querySelector('.close').addEventListener('click',
        () => toggleSideMenu());
    };

    const setIntroPage = () => {
        //make balck intro page visible
        document.querySelector('.black-cover').classList.add('visible');
        setDisplay([document.querySelector('.grid')], 'none');
    };

    const setDisplay = (items, display) => {
        //helper function for setting element(s) display
        for(item of items) {
            item.style.display = `${display}`;
        }
    };

    const toggleSideMenu = () => {
        //show or hide side menu
        const sideMenu = document.querySelector('.black-menu');
        if(sideMenu.style.width === '' || sideMenu.style.width === '0px') {
            sideMenu.style.width = '100vw';
        } else {
            sideMenu.style.width = '0px';
        }
    };

    const main = () => {
        setIntroPage()
        addListeners();
        populateList();
        window.addEventListener('scroll', function(){
            setActive();
            checkScrolling();
            scrollPast();
        });
    };

    main();

});