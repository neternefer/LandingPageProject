/**
 * Define Global Variables
 *
*/
document.addEventListener("DOMContentLoaded", () => {
    const linkedSections = document.getElementsByClassName("linked");
    const elementsToHide = document.querySelectorAll(".hide-on-scroll");
    let isScrolling;

    const populateList = () => {
        const menuList = document.getElementById("dynamic-menu-list");
        for(section of linkedSections) {
            let listElement = `
                <li><a href="#${section.id}" class="${section.id}">
                    ${section.dataset.nav}
                    </a>
                </li>`;
            menuList.insertAdjacentHTML("beforeend", listElement);
            menuList.querySelector(`.${section.id}`).addEventListener("click", scrollingTo);
        }
    };

    const isInViewport = (section) => {
        let sectionPosition = section.getBoundingClientRect();
        if(sectionPosition.top < window.innerHeight / 3 &&
            sectionPosition.bottom > window.innerHeight / 3) {
            return true;
        }
        return false;
    };

    const setActive = () => {
        for(section of linkedSections){
            section.classList.toggle("active", isInViewport(section));
            document.querySelector(`.${section.id}`).classList.toggle("active-link", isInViewport(section));
        }
    };

    const scrollingTo = (e) => {
        e.preventDefault();
        let anchor = document.querySelector(e.currentTarget.getAttribute("href"));
        // const offset = -120;
        const offset = -0.4 * window.innerHeight;
        const y = anchor.getBoundingClientRect().top + offset + window.pageYOffset;
        console.log(y)
        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    };

    const checkScrolling = () => {
        setDisplay(elementsToHide, "block");
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if(document.querySelector("header").getBoundingClientRect().top !== 0) {
                setDisplay(elementsToHide, "none");
            }
        }, 2250)
    };

    const scrollPast = () => {
        const scrollUpArrow = document.getElementById("scroll-up");
        scrollUpArrow.addEventListener("click", scrollingTo);
        if(window.pageYOffset > window.innerHeight) {
            setDisplay([scrollUpArrow], "block");
        } else {
            setDisplay([scrollUpArrow], "none");
        }
    };

    const toggleBlackScreen = () => {
        document.querySelector(".black-cover").classList.remove("visible");
        setDisplay([document.querySelector(".grid")], "grid");
    };

    const addListeners = () => {
        document.querySelector(".black-cover h1").addEventListener("click",
        () => toggleBlackScreen(".black-cover"));
        document.querySelector("svg").addEventListener("click",
        () => toggleSideMenu());
        document.querySelector(".close").addEventListener("click",
        () => toggleSideMenu());
    };

    const setIntroPage = () => {
        document.querySelector(".black-cover").classList.add("visible");
        setDisplay([document.querySelector(".grid")], "none");
    }

    const showNav = () => {
        if(document.querySelector("header").getBoundingClientRect.top === 0) {
            setDisplay(elementsToHide, "block");
        }
    }

    const setDisplay = (items, display) => {
        for(item of items) {
            item.style.display = `${display}`;
        }
    }

    const toggleSideMenu = () => {
        const sideMenu = document.querySelector(".black-menu");
        if(sideMenu.style.width === "" || sideMenu.style.width === "0px") {
            sideMenu.style.width = "100vw";
        } else {
            sideMenu.style.width = "0px";
        }
    };

    const main = () => {
        setIntroPage()
        addListeners();
        populateList();
        window.addEventListener("scroll", function(){
            setActive();
            checkScrolling();
            scrollPast();
        });
    };

    main();

});