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
    threshold: 0.5
}

const observer = new IntersectionObserver(callback, options);

const targets = document.querySelectorAll('.heading');



targets.forEach(target => {
    observer.observe(target)
})


// code to to update navbar
const callbacknav =(entries,observerofsection)=>{
    entries.forEach(entry=>{
        if (entry.target.id==='hero' && entry.isIntersecting ){
            RemoveActive()
            document.getElementById('navhome').classList.add('active');
        }if(entry.target.id==='ctasection' && entry.isIntersecting){
            RemoveActive()
            document.getElementById('navctasection').classList.add('active');
        }if(entry.target.id==="signupsection" && entry.isIntersecting){
            RemoveActive()
            document.getElementById('navsignup').classList.add('active');
        }if(entry.target.tagName==="P" && entry.isIntersecting){
            RemoveActive()
            document.getElementById('navfeatures').classList.add('active');
        }
    })
    
}

const observerofsection = new IntersectionObserver(callbacknav,options);

const sections = document.querySelectorAll('.navview');

sections.forEach(section => {
    observerofsection.observe(section)
})


// scroll to section
function scrolltoelement(sectionID) {
    const element = document.getElementById(sectionID);
    console.log(element);
    console.log(typeof element);
    element.scrollIntoView({ behavior: 'smooth' })
}

// use parameters while navigating
function navwithparam(code){
    // const encodedData = encodeURIComponent(code);
    window.location.href='auth.html?data=${code}';
}