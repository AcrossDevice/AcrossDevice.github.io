// getting items (links and text)
function getapi(param, item) {
    fetch(param, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.status === 200) {
            if (data.data.length === 0) {
                empty(true);
                handleStatus(true,'No items Stored')
            }
            else {
                handleStatus(true,data.message)
                array = data.data;
                if (item === 'file') {
                    array.forEach(element => {
                        createfilesitems(element);
                    })
                }else {
                    array.forEach(element => {
                        Createitem(element, item);
                    });
                }
            }
        } else {
            handleStatus(false,data.message)
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}


function Createitem(param, item) {
    // creating elements to show the backend data
    let displayarea = document.querySelector('.displayarea');
    let displaydiv = document.createElement('div');
    let input = document.createElement('input');
    let btndiv = document.createElement('div');
    let copy = document.createElement('img');
    let deletebtn = document.createElement('img');


    // arranging the elements
    displayarea.appendChild(displaydiv);
    displaydiv.prepend(input);
    displaydiv.appendChild(btndiv);
    btndiv.appendChild(copy);
    btndiv.appendChild(deletebtn);

    // setting values in btns
    copy.setAttribute('class','icon');
    copy.setAttribute('src','static/icon/copy-icon.png');
    if (item === 'link') {
        copy.onclick = function () {
            copyvalue(param.Link);
        }
    } else {
        copy.onclick = function () {
            copyvalue(param.Text);
        }
    }
    deletebtn.setAttribute('src','static/icon/delete-icon.png')
    deletebtn.setAttribute('class','icon')
    deletebtn.onclick = function () {
        del(param.id, item)
    }
    deletebtn.setAttribute('type', 'del');
    input.disabled = true;
    if (item === 'link') {
        input.value = param.Link;
    } else {
        input.value = param.Text;
    }

    // adding styles
    if (window.innerWidth < 576) {
        displaydiv.classList.add('filediv');
    } else {
        displaydiv.classList.add('displaydiv');
    }
    btndiv.classList.add('icondiv');
    if (item === 'link') {
        let go = document.createElement('img');
        go.setAttribute('class','icon');
        go.setAttribute('src','static/icon/open-icon.png');
        go.onclick = function () {
            goto(param.Link)
        }
        btndiv.prepend(go);

    }
}


// file creatation api
function createfilesitems(param) {
    // creating elements
    let displayarea = document.querySelector('.displayarea');
    let displaydiv = document.createElement('div');
    let nameinput = document.createElement('input');
    let btndiv = document.createElement('div');
    let download = document.createElement('img');
    let view = document.createElement('img');
    let delbtn = document.createElement('img');
    let link = document.createElement('a');
    url = 'https://socialpot.pythonanywhere.com' + param.File;

    // setting values
    download.setAttribute('class','icon')
    download.setAttribute('src','static/icon/download-icon.png')
    nameinput.value = param.Filename;

    download.onclick = function(){
        url = 'https://socialpot.pythonanywhere.com' + param.File;
        downloadfile(url,param.Filename)
    }
    view.setAttribute('class','icon');
    view.setAttribute('src','static/icon/open-icon.png');
    view.onclick = function () {
        url = 'https://socialpot.pythonanywhere.com' + param.File;
        window.open(url, "_blank")
    }
    delbtn.setAttribute('src','static/icon/delete-icon.png');
    delbtn.setAttribute('class','icon');
    delbtn.onclick = function () {
        del(param.id,'file')
    }

    // setting properties
    link.classList.add('downloadlink');
    if (window.innerWidth < 576) {
        displaydiv.classList.add('filediv');
    } else {
        displaydiv.classList.add('displaydiv');
    }
    nameinput.disabled = true;
    btndiv.classList.add('icondiv');
    delbtn.setAttribute('type', 'del');

    //arranging items
    displayarea.appendChild(displaydiv);
    displaydiv.appendChild(nameinput);
    displaydiv.appendChild(btndiv);
    btndiv.appendChild(download);
    btndiv.appendChild(view);
    btndiv.appendChild(delbtn);
    download.appendChild(link);

}


function postapi(param) {

    link = document.getElementById('link').value;
    input = document.getElementById('text').value;

    fetch(param, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            'Link': `${link}`,
            'Text': `${input}`
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.status === 200) {
            handleStatus(true,data.message)
            document.getElementById('text').value = '';
            document.getElementById('link').value = '';
        } else {
            handleStatus(false,data.message)
        }
    }).catch(error => {
        console.error(error);
    })
}



// accessing the files provided in the input element
function getfiletopost() {
    file = document.getElementById('file').files[0];
    const formdata = new FormData();
    formdata.append('File',file);
    formdata.append('Filename',`${document.getElementById('filename').value}`);
    postfiles(formdata)
    alert('Uploading file...')
    handleStatus(true,'Uploading...')
}



// post api for files
async function postfiles(formdata) {
    let url = 'https://socialpot.pythonanywhere.com/filehandler'
    // let url  = 'http://127.0.0.1:8000/filehandler'
    await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: formdata 
    }).then(response =>{
        return response.json()
    }).then(data =>{
        if(data.status ===200){
            handleStatus(true,data.message)
            document.getElementById('file').innerHTML = '';
            document.getElementById('filename').innerHTML='';
        }else{
            handleStatus('','')
        }
        alert('file upload successful!')
    }).catch(error=>{
        console.error(error);
        alert('some error occured')
    })
}

// delete api

function deleteitems(item, id) {
    let url;
    if (item === 'link') {
        url = 'https://socialpot.pythonanywhere.com/linkhandler';
    } if (item === 'text') {
        url = 'https://socialpot.pythonanywhere.com/texthandler';
    }if(item === 'file'){
        url = 'https://socialpot.pythonanywhere.com/filehandler';
    }
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            'id': `${id}`
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.status === 200) {
            undisplay()
            getapi(url, item)
            handleStatus(true,data.message)
        } else {
            handleStatus(false,data.message)
        }
    })
}
