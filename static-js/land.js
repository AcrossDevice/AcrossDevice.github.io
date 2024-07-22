// funtion to check expiry of token
function isTokenExpired(token) {
    if (!token) {
        return true;
    }
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        return true;
    }
    const payload = JSON.parse(atob(tokenParts[1]));
    const tokenExp = payload.exp;
    return tokenExp < Date.now() / 1000;
}


async function refreshAccessToken(refreshToken) {
    try {
        const response = await fetch('https://socialpot.pythonanywhere.com/tokenrefresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
        });
        if (!response.ok) {
            throw new Error('Token refresh failed');
        }
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setitem('refresh_token', data.refresh);
    } catch (error) {
        console.error('Token refresh error:', error);
        localStorage.clear()
        window.location.href = 'auth.html';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const accessToken = localStorage.getItem('access_token');

    if (isTokenExpired(accessToken)) {
        console.log('Access token expired');
        if (localStorage.getItem('refresh_token')) {
            refreshAccessToken(localStorage.getItem('refresh_token'));
        }
        else {
            window.location.href = 'auth.html';
        }
    }
});

// onchange of screen width





// keep links is active
if (window.innerWidth < 576) {
    undisplay()
} else {
    document.querySelector('.leftpane').children[0].children[1].children[0].classList.add('active');
}



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
    document.getElementById('statusgreen').innerHTML = '';
}

// to remove all children from displayarea
function undisplay() {
    let items = document.querySelector('.displayarea').children;
    let array = Array.from(items);
    array.forEach(item => {
        item.style.display = 'none';
    })
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
    document.querySelector('.leftpane').style.display = 'block';
}
function closemenu() {
    document.getElementById('menuicon').style.display = 'block';
    document.getElementById('closeicon').style.display = 'none';
    document.querySelector('.leftpane').style.display = 'none';
}


// adjusting the keep files page
if (window.innerWidth < 576) {
    document.getElementById('keepfilediv').children[0].classList.remove('displaydiv');
    document.getElementById('keepfilediv').children[0].classList.add('keepfilediv');
    document.getElementById('keepfilediv').parentElement.style.alignItems = 'flex-start';
}


function copyvalue(param) {
    navigator.clipboard.writeText(param).then(() => {
        document.getElementById('statusgreen').innerHTML = 'Item copied ';
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
    link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
}