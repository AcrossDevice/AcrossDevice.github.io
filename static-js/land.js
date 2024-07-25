// to add active class to menu btns
document.querySelectorAll('.menubtn').forEach(item => {
    item.addEventListener('click', () => {
        removeactive();
        if (window.innerWidth < 576) {
            closemenu()
        }
        item.classList.add('active');
    })
})
// remove active from menu btns
function removeactive() {
    document.querySelectorAll('.menubtn').forEach(item => {
        item.classList.remove('active');
    })
    handleStatus(true, "")
}

// to remove all children from displayarea
function undisplay() {
    let items = document.querySelector('.displayarea').children;
    let array = Array.from(items);
    array.forEach(item => {
        item.style.display = 'none';
    })
}
function home() {
    undisplay()
    document.querySelector('.displayarea').children[0].style.display = 'block';
}

function Navigate(child) {
    undisplay();
    document.querySelector('.displayarea').children[child].style.display = 'flex';
}

function getlinks() {
    undisplay()
    getapi('https://socialpot.pythonanywhere.com/linkhandler', 'link');
}

function gettext() {
    undisplay()
    getapi('https://socialpot.pythonanywhere.com/texthandler', 'text');
}

function getfiles() {
    undisplay()
    getapi('https://socialpot.pythonanywhere.com/filehandler', 'file');
    // getapi('http://127.0.0.1:8000/filehandler', 'file');
}


// settings tab
function settings() {
    undisplay()
}



// logout function
function logout() {
    document.querySelector('.confirmlogout').style.display = 'flex'
}
function LO(param) {
    if (param === 0) {
        document.querySelector('.confirmlogout').style.display = 'none';
    } if (param === 1) {
        localStorage.clear()
        window.location.href = 'auth.html';
    }
}


// open menu
function openmenu() {
    document.getElementById('menuicon').style.display = 'none';
    document.getElementById('closeicon').style.display = 'block';
    document.querySelector('.leftpane').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('.leftpane').style.transform = 'translate(0vw,0vw)';
    }, 250);
    handleStatus(true, '')
}
function closemenu() {
    document.getElementById('menuicon').style.display = 'block';
    document.getElementById('closeicon').style.display = 'none';
    document.querySelector('.leftpane').style.transform = 'translate(-100vw,0vw)';
    setTimeout(() => {
        document.querySelector('.leftpane').style.display = 'none';
    }, 250);
}


// adjusting the keep files page
if (window.innerWidth < 576) {
    document.getElementById('keepfilediv').children[0].classList.remove('displaydiv');
    document.getElementById('keepfilediv').children[0].classList.add('keepfilediv');
    document.getElementById('keepfilediv').parentElement.style.alignItems = 'flex-start';
}


function copyvalue(param) {
    navigator.clipboard.writeText(param).then(() => {
        handleStatus(true, 'Item Copied')
    })
}

function del(id, item) {
    deleteitems(item, id)
}

function goto(param) {
    window.open(`${param}`, '_blank');
}


// function to download files
function downloadfile(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            handleStatus(true,'downloading...')
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            a.click();
            URL.revokeObjectURL(a.href);

        })
        .catch(error => console.error('Error downloading the file:', error));
}


// onpressing back in browser
if (window.innerWidth <= 576) {
    window.history.replaceState(null, document.title, window.location.href);
    window.addEventListener('popstate', (event) => {
        home();
        window.history.pushState(null, document.title, window.location.href);
    });
    window.history.pushState(null, document.title, window.location.href);
}


// function handling status
function handleStatus(param, message) {
    console.log(message)
    if (message == undefined) {
        checkaccess()
        handleStatus(false, 'Too many requests, kindly wait for few seconds and try again...');
    } else {
        switch (param) {
            case true:
                document.getElementById('statusred').innerHTML = '';
                document.getElementById('statusgreen').innerHTML = message;
                break;
            case false:
                document.getElementById('statusgreen').innerHTML = '';
                document.getElementById('statusred').innerHTML = message;
                break;
            default:
                document.getElementById('statusgreen').innerHTML = '';
                document.getElementById('statusred').innerHTML = 'some error occured';
        }
    }
}