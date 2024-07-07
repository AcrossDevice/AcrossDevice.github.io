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
            if (data.data.length ===0) {
                document.getElementById('statusgreen').innerHTML = 'No items stored';
            }
            else {
                document.getElementById('statusgreen').innerHTML = data.message;
                array = data.data;
                array.forEach(element => {
                    Createitem(element, item);
                });
            }
        } else {
            document.getElementById('statusgreen').innerHTML = '';
            document.getElementById('statusred').innerHTML = data.message;
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
    let copy = document.createElement('button');
    let deletebtn = document.createElement('button');


    // arranging the elements
    displayarea.appendChild(displaydiv);
    displaydiv.prepend(input);
    displaydiv.appendChild(btndiv);
    btndiv.appendChild(copy);
    btndiv.appendChild(deletebtn);

    // setting values in btns
    copy.innerHTML = 'Copy';
    if (item === 'link') {
        copy.onclick = function () {
            copyvalue(param.Link);
        }
    } else {
        copy.onclick = function () {
            copyvalue(param.Text);
        }
    }
    deletebtn.innerHTML = 'Delete';
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
    displaydiv.classList.add('displaydiv');
    btndiv.classList.add('btndiv');
    if (item === 'link') {
        let go = document.createElement('button');
        go.innerHTML = 'Visit';
        go.onclick = function () {
            goto(param.Link)
        }
        btndiv.prepend(go);

    }
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
        console.log(data)
        if (data.status === 200) {
            document.getElementById('statusgreen').innerHTML = data.message;
            document.getElementById('text').value = '';
            document.getElementById('link').value = '';
        } else {
            document.getElementById('statusgreen').innerHTML = '';
            document.getElementById('statusred').innerHTML = data.message;
        }
    }).catch(error => {
        console.error(error);
    })
}


// delete api

function deleteitems(item, id) {
    let url;
    if (item === 'link') {
        url = 'https://socialpot.pythonanywhere.com/linkhandler';
    } if (item === 'text') {
        url = 'https://socialpot.pythonanywhere.com/texthandler';
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
        console.log(data);
        if (data.status === 200) {
            undisplay()
            getapi(url, item)
            document.getElementById('statusgreen').innerHTML = data.message;
        } else {
            document.getElementById('statusgreen').innerHTML = '';
            document.getElementById('statusred').innerHTML = data.message;
        }
    })
}