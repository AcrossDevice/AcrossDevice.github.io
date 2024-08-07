var dataholder;
var emailvalue;
var passvalue;
var usernamevalue;




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


// checking email availablity
async function checkemail() {
    emailvalue = document.getElementById('email').value;
    await fetch('https://socialpot.pythonanywhere.com/checkemail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailvalue
        }),
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.status === false) {
            document.getElementById('emailerror').innerHTML = data.message;
        } else {
            document.getElementById('emaildiv').style.display = 'none';
            document.getElementById('otpdiv').style.display = 'flex';
            sendotp()
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}

// sending otp to email
async function sendotp() {
    emailvalue = document.getElementById('email').value;
    await fetch('https://socialpot.pythonanywhere.com/otphandler', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailvalue
        }),
    }).then(response => {
        return response.json()
    }).then(data => {
        dataholder = data;
    }).catch(error => {
        console.error('Error:', error);
    });
}

// verifying otp
function verifyotp() {
    if (document.getElementById('otp').value === dataholder.otp) {
        document.getElementById('otpdiv').style.display = 'none';
        document.getElementById('usernamediv').style.display = 'flex';
    } else {
        document.getElementById('otperror').innerHTML = 'Incorrect Otp !'
    }
}


// check username availability
async function checkusername() {
    usernamevalue = document.getElementById('username').value;
    await fetch('https://socialpot.pythonanywhere.com/checkusername', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: usernamevalue
        }),
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.status === false) {
            document.getElementById('usernameerror').innerHTML = data.message;
        } else {
            document.getElementById('usernamediv').style.display = 'none';
            document.getElementById('passworddiv').style.display = "flex";
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}


// create user
async function createuser() {
    usernamevalue = document.getElementById('username').value;
    emailvalue = document.getElementById('email').value;
    passvalue = document.getElementById('inputpassword').value;
    await fetch('https://socialpot.pythonanywhere.com/members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: usernamevalue,
            password: passvalue,
            email: emailvalue
        }),
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.status === false) {
            document.getElementById('usercreationerror').innerHTML = data.message;
        } else {
            document.getElementById('usercreationstatus').innerHTML = data.message;
            logginguser()
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}


// init login function
function initlogin() {
    usernamevalue = document.getElementById('loginusername').value;
    passvalue = document.getElementById('loginpassword').value;
    logginguser()
}


// logging in user
async function logginguser() {
    let url ='https://socialpot.pythonanywhere.com/token';
    // let url ='http://127.0.0.1:8000/token';
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: usernamevalue,
            password: passvalue,
        }),
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.status === false) {
            document.getElementById('loginerror').innerHTML = data.message;
        } else {
            console.log(data);
            if (data.access){
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                window.location.href='landingpage.html?data=authenticated';
            }else{
                document.getElementById('loginerror').innerHTML = data.detail;
            }
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}