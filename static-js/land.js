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
        localStorage.setitem('refresh_token',data.refresh);
    } catch (error) {
        console.error('Token refresh error:', error);
        localStorage.clear()
        window.location.href ='auth.html';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const accessToken = localStorage.getItem('access_token');

    if (isTokenExpired(accessToken)) {
        console.log('Access token expired');
        if (localStorage.getItem('refresh_token')) {
            refreshAccessToken(localStorage.getItem('refresh_token'));
        }
        else{
            window.location.href = 'auth.html';
        }
    }
});



// keep links is active
document.querySelector('.leftpane').children[0].children[1].children[0].classList.add('active');
undisplay()
document.querySelector('.displayarea').children[0].style.display='flex';


// to add active class to menu btns
document.querySelectorAll('.menubtn').forEach(item => {
    item.addEventListener('click', () => {
        removeactive();
        item.classList.add('active');
    })
})
// remove active from menu btns
function removeactive(){
    document.querySelectorAll('.menubtn').forEach(item =>{
        item.classList.remove('active');
    })
}

// to remove all children from displayarea
function undisplay(){
    let items =document.querySelector('.displayarea').children ;
    let array = Array.from(items);
    array.forEach(item=>{
        item.style.display = 'none';
    })   
}

function Navigate(child){
    undisplay();
    document.querySelector('.displayarea').children[child].style.display='flex';
}

function getlinks(){
    undisplay()
    for(let i = 0;i<10;i++){
        Createitem()
    }   
}

function getfiles(){
    undisplay()
    for(let i = 0;i<10;i++){
        createfilesitems()
    }  
}


function Createitem(){
    // creating elements to show the backend data
    let displayarea = document.querySelector('.displayarea');
    let displaydiv = document.createElement('div');
    let input = document.createElement('input');
    let btndiv = document.createElement('div');
    let copy = document.createElement('button');
    let deletebtn = document.createElement('button');

    // arranging the elements
    displayarea.appendChild(displaydiv);
    displaydiv.appendChild(input);
    displaydiv.appendChild(btndiv);
    btndiv.appendChild(copy);
    btndiv.appendChild(deletebtn);

    // setting values in btns
    copy.innerHTML='Copy';
    deletebtn.innerHTML='Delete';
    deletebtn.setAttribute('type','del');
    input.disabled=true;


    // adding styles
    displaydiv.classList.add('displaydiv');
    btndiv.classList.add('btndiv');
}

function createfilesitems(){
    // creating elements
    let displayarea = document.querySelector('.displayarea');
    let displaydiv = document.createElement('div');
    let nameinput = document.createElement('input');
    let btndiv = document.createElement('div');
    let download = document.createElement('button');
    let view = document.createElement('button');
    let delbtn = document.createElement('button');

    // setting values
    download.innerHTML = 'Download';
    view.innerHTML = 'View';
    delbtn.innerHTML = 'Delete';

    // setting properties
    displaydiv.classList.add('displaydiv');
    nameinput.disabled=true;
    btndiv.classList.add('btndiv');
    delbtn.setAttribute('type','del');

    //arranging items
    displayarea.appendChild(displaydiv) ;
    displaydiv.appendChild(nameinput);
    displaydiv.appendChild(btndiv);
    btndiv.appendChild(download);
    btndiv.appendChild(view);
    btndiv.appendChild(delbtn);

}