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

function refreshAccessToken(refreshToken) {
    fetch('https://socialpot.pythonanywhere.com/tokenrefresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'refresh': localStorage.getItem('refresh_token')
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.access) {
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('access_token', data.access);
            window.location.href = 'landingpage.html';
        }

    }).catch(error => {
        console.error(error);
    })
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



