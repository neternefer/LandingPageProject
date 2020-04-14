/**
 * Define Global Variables
 *
*/
document.addEventListener("DOMContentLoaded", () => {
    const menuList = document.getElementById("dynamic-menu-list");
    const linkedSections = document.getElementsByClassName("linked");
    const headerHeight = 160;



/**
 * End Global Variables
 * Start Helper Functions
 *
*/
    const populateList = () => {
        for(section of linkedSections) {
            let listElement = `
                <li><a href="#${section.id}" class="${section.id}">
                    ${section.dataset.nav}
                    </a>
                </li>`;
            menuList.insertAdjacentHTML("beforeend", listElement);
            menuList.querySelector(`.${section.id}`).addEventListener("click", scrollTo);
        }
    }

    const isInViewport = (section) => {
        let sectionPosition = section.getBoundingClientRect();
        if(sectionPosition.top <= headerHeight + 0.5 &&
            sectionPosition.bottom >= headerHeight + 0.5) {
            return true;
        }
        return false;
    };

    const setActive = () => {
        for(section of linkedSections){
            section.classList.toggle('active', isInViewport(section));
            document.querySelector(`.${section.id}`).classList.toggle('active', isInViewport(section));
        }
    };

    const scrollTo = (e) => {
        console.log(e.target)
        e.preventDefault();
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    }

    populateList();
    document.addEventListener("scroll", function(){
        setActive();
    });









/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
})