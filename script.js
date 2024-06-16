const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animatetext');
        } else {
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

