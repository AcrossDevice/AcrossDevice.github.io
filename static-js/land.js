// to add active class to menu btns
document.querySelectorAll('.menubtn').forEach(item => {
    item.addEventListener('click', () => {
        removeactive();
        if (window.innerWidth < 576) {
            empty(true)
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
    try {
        displayarea = document.getElementById('displayarea');
        displayarea.removeChild(emptyimg);
    } catch (error) {
        // console.error(error.message);
    } finally {
        let items = document.getElementById('displayarea').children;
        let array = Array.from(items);
        array.forEach(item => {
            item.style.display = 'none';
        })
    }
}
function home() {
    undisplay()
    document.getElementById('mobilelandingpage').style.display = 'block';
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
function account() {
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
            handleStatus(true, 'downloading...')
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
        alert('Some Error Occured , please try Again !')
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



// handling the collaboration joining and creation
function ToggleCollab(type) {
    parent = document.getElementById('createcollab').parentElement;
    document.getElementById('createcollab').style.display = 'none';
    document.getElementById('joincollab').style.display = 'none';


    // Defining of elements
    var div = document.createElement('div');
    div.classList.add('landdiv');
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.width = '90vw';
    div.style.margin = '0px 0px';
    var span = document.createElement('span');
    span.setAttribute('class', 'material-symbols-outlined');
    span.innerHTML = 'close';
    span.style.position = 'absolute';
    span.style.left = '85vw';
    span.addEventListener('click', function () {
        const array = Array.from(div.children);
        array.forEach(element => {
            div.removeChild(element);
        })
        parent.removeChild(div);
        document.getElementById('createcollab').style.display = 'block';
        document.getElementById('joincollab').style.display = 'block';
    }
    )
    var typelabel = document.createElement('label');
    typelabel.style.marginBottom = '20px';
    typelabel.innerHTML = `${type} a Collaboration`;
    typelabel.style.color = 'grey';
    var label = document.createElement('label');
    label.innerHTML = 'Enter Collab Name:'
    var input = document.createElement('input');
    input.setAttribute('id', `${type}CollabInput`);
    input.setAttribute('list', 'suggestionList');
    input.style.padding = '10px 10px';

    // datalist
    var datalist = document.createElement('datalist');
    datalist.setAttribute('id', 'suggestionList');

    var option = document.createElement('option');
    option.setAttribute('value', 'anurag');
    datalist.appendChild(option);

    for (let i; i < 10; i++) {
        var option = document.createElement('option');
        option.setAttribute('value', 'anurag');
        datalist.appendChild(option);
    }

    var btn = document.createElement('button');
    btn.classList.add('mobilelandbtn');
    btn.innerHTML = `${type}`;
    btn.onclick = () => {
        Collab(type)
    }
    // arranging elements
    parent.appendChild(div);
    div.appendChild(span);
    div.appendChild(typelabel);
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(btn);
    div.appendChild(datalist);

}

function Collab(type) {

}

existingcollab()
existingcollab()
existingcollab()
existingcollab()
existingcollab()

function existingcollab() {
    let workplacediv = document.getElementById('workplacediv');

    let div = document.createElement('div');
    div.classList.add('landdiv');
    workplacediv.appendChild(div);

    let displaylabel = document.createElement('label');
    displaylabel.innerHTML = 'Collaboration';
    displaylabel.style.color = 'grey';
    displaylabel.style.marginBottom = '20px';
    div.append(displaylabel);

    let innerdiv = document.createElement('div');
    innerdiv.setAttribute('class', 'workplaceinnerdiv');
    div.appendChild(innerdiv);

    let span = document.createElement('span');
    span.setAttribute('class', 'material-symbols-outlined');
    span.innerHTML = 'work';
    innerdiv.appendChild(span);

    let collabname = document.createElement('label');
    collabname.innerHTML = 'Name';
    innerdiv.appendChild(collabname);

    let createrlabel = document.createElement('label');
    createrlabel.innerHTML = 'Creater';
    div.appendChild(createrlabel);

    let btndiv = document.createElement('div');
    btndiv.classList.add('workplacebtndiv');
    div.appendChild(btndiv);

    let viewbtn = document.createElement('button');
    viewbtn.setAttribute('class', 'workplacebtn');
    viewbtn.innerHTML = 'View';
    btndiv.appendChild(viewbtn);

    let leavebtn = document.createElement('button');
    leavebtn.setAttribute('class', 'workplacebtn');
    leavebtn.innerHTML = 'Leave';
    leavebtn.style.backgroundColor = '#e6e7f9';
    leavebtn.style.color = 'black';
    btndiv.appendChild(leavebtn);


}

function workplace() {
    undisplay()
}

// empty function
let emptyimg = document.createElement('img');
emptyimg.setAttribute('src', 'static/empty.png');
function empty(param) {
    let displayarea = document.getElementById('displayarea');
    if (param) {
        displayarea.prepend(emptyimg);
    // } if (!param) {
    //     displayarea.removeChild(emptyimg);
    // }
}}