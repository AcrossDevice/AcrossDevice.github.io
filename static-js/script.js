// to handle animations of underlines
console.log(typeof document.getElementById('hero').id);
function RemoveActive() {
    document.getElementById('navhome').classList.remove('active');
    document.getElementById('navfeatures').classList.remove('active');
    document.getElementById('navctasection').classList.remove('active');
    document.getElementById('navsignup').classList.remove('active');
}


const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animatetext');
        }
        else {
            entry.target.classList.remove('animatetext');
        }
    })
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
}

const observer = new IntersectionObserver(callback, options);

const targets = document.querySelectorAll('.heading');



targets.forEach(target => {
    observer.observe(target)
})


// code to to update navbar
const callbacknav = (entries, observerofsection) => {
    entries.forEach(entry => {
        if (entry.target.id === 'hero' && entry.isIntersecting) {
            RemoveActive()
            document.getElementById('navhome').classList.add('active');
        } if (entry.target.id === 'ctasection' && entry.isIntersecting) {
            RemoveActive()
            document.getElementById('navctasection').classList.add('active');
        } if (entry.target.id === "signupsection" && entry.isIntersecting) {
            RemoveActive()
            document.getElementById('navsignup').classList.add('active');
        } if (entry.target.tagName === "P" && entry.isIntersecting) {
            RemoveActive()
            document.getElementById('navfeatures').classList.add('active');
        }
    })

}

const observerofsection = new IntersectionObserver(callbacknav, options);

const sections = document.querySelectorAll('.navview');

sections.forEach(section => {
    observerofsection.observe(section)
})


// scroll to section
function scrolltoelement(sectionID) {
    if (window.innerWidth <= 768) {
        parameter = false
        menuopen()
        const element = document.getElementById(sectionID);
        console.log(element);
        console.log(typeof element);
        element.scrollIntoView({ behavior: 'smooth' })
    }else{
        const element = document.getElementById(sectionID);
        console.log(element);
        console.log(typeof element);
        element.scrollIntoView({ behavior: 'smooth' })
    }
}



// use parameters while navigating
function navwithparam(code) {
    if (code === 'requestsignup'){
        window.location.href='auth.html?data=requestsignup';
    }
    else{
        window.location.href='auth.html?data=requestsignin';
    }
}


// handling the nav bar when device is mobile
var parameter = true;
function menuopen() {
    if (parameter === true) {
        var header = document.getElementById('header');
        var menu = document.getElementById('menu');
        header.style.display = 'block';
        header.children[1].style.display = 'flex';
        menu.style.margin = '30px';
        parameter = false;
    }
    else {
        var header = document.getElementById('header');
        var menu = document.getElementById('menu');
        menu.style.margin = '0px';
        menu.style.marginLeft = 'auto';
        header.children[1].style.display = 'none';
        header.style.display = 'flex';
        parameter = true;
    }
}
