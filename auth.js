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
    if (item === 'email') {
        var email = document.getElementById('email').value;
        document.getElementById('emaildiv').style.display = 'none';
        document.getElementById('otpdiv').style.display = 'flex';
    }
    if (item === 'username') {
        var username = document.getElementById('username').value;
        document.getElementById('usernamediv').style.display = 'none';
        document.getElementById('passworddiv').style.display = "flex";
    }
    if (item === 'password') {
        // var password = document.getElementById('password').value;
        document.getElementById('passworddiv').style.display = 'none';
        document.getElementById('termsdiv').style.display = 'flex';
    }
    if (item === 'agree') {
        finalsubmit()
    }
}

// previous function
function previous(from, to) {
    console.log(from,to);
    document.getElementById(from).style.display = 'none';
    document.getElementById(to).style.display = 'flex';
}

// verify otp
function verifyotp(){
    document.getElementById('otpdiv').style.display='none';
    document.getElementById('usernamediv').style.display='flex';
}

// final submit
function finalsubmit() {
    // final code comes here
    alert('working');
    

}
