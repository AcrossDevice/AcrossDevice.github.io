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

// api refreshtoken api calling function
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
        }else{
            window.location.href  = 'auth.html';
        }

    }).catch(error => {
        console.error(error);
    })
}

// checking if the access token is expired
function checkaccess() {
    if (isTokenExpired(localStorage.getItem('access_token'))) {
        if (localStorage.getItem('refresh_token')) {
            refreshAccessToken(localStorage.getItem('refresh_token'));
        }
        else {
            window.location.href = 'auth.html';
        }
    } 
};


checkaccess()

setInterval(()=>{
    checkaccess()
},600000)