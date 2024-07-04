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
        localStorage.setItem('refresh_token',data.refresh);
    } catch (error) {
        console.error('Token refresh error:', error);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const accessToken = localStorage.getItem('access_token');

    if (isTokenExpired(accessToken)) {
        console.log('Access token expired');
        if (localStorage.getItem('refresh_token')) {
            refreshAccessToken(localStorage.getItem('refresh_token'));
        }


    } else {
        // Access token is valid, proceed with your application logic
        console.log('Access token valid');
        window.location.href = 'landingpage.html?data=authenticated';
    }
});





// getting the parameter and deciding what to do
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const data = getURLParameter('data');
const decodedData = decodeURIComponent(data);

if (decodedData === 'requestsignin') {
    signin()
} if (decodedData === 'requestsignup') {
    signup()
} else {
    signin()
}

function signin() {
    document.getElementById('signindiv').style.display = 'block';
    document.getElementById('signupdiv').style.display = 'none';
    document.getElementById('btnholder').children[1].classList.add('active');
    document.getElementById('btnholder').children[0].classList.remove('active');
}

function signup() {
    document.getElementById('signindiv').style.display = 'none';
    document.getElementById('signupdiv').style.display = 'block';
    document.getElementById('btnholder').children[0].classList.add('active');
    document.getElementById('btnholder').children[1].classList.remove('active');
}

function submititems(item) {
    if (item === 'password') {
        document.getElementById('passworddiv').style.display = 'none';
        document.getElementById('termsdiv').style.display = 'flex';
    }
}

// previous function
function previous(from, to) {
    console.log(from, to);
    document.getElementById(from).style.display = 'none';
    document.getElementById(to).style.display = 'flex';
}

// eye btn code 
var visible = false;
function toggleeye() {
    if (visible === false) {
        document.querySelectorAll('.toggleeye').forEach(item => {
            item.innerHTML = 'Hide password';
        })
        document.querySelectorAll('.passwordinput').forEach(item => {
            item.type = 'text';
            visible = true;
        })
    }
    else {
        document.querySelectorAll('.toggleeye').forEach(item => {
            item.innerHTML = 'Show password';
        })
        document.querySelectorAll('.passwordinput').forEach(item => {
            item.type = 'password';
            visible = false;
        })
    }
}
