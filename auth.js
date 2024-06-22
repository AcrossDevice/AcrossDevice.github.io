// getting the parameter and deciding what to do
function getURLParameter(name){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const data = getURLParameter('data');
const decodedData = decodeURIComponent(data);

if(decodedData==='requestsignin'){
    signin()
}if(decodedData==='requestsignup'){
    signup()
}else{
    signin()
}

function signin(){
    document.getElementById('signindiv').style.display='block';
    document.getElementById('signupdiv').style.display='none';
    document.getElementById('btnholder').children[1].classList.add('active');
    document.getElementById('btnholder').children[0].classList.remove('active');
}

function signup(){
    document.getElementById('signindiv').style.display='none';
    document.getElementById('signupdiv').style.display='block';
    document.getElementById('btnholder').children[0].classList.add('active');
    document.getElementById('btnholder').children[1].classList.remove('active');
}