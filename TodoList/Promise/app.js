function $(selector) {
    return document.querySelector(selector)
}

let todoAPI = 'https://63c6ea4e4ebaa802855076bb.mockapi.io/api/todolist/todolist'

function fetchData(callback) {
    axios.get(todoAPI)
        .then(function(response){
            return response.data;
        })
        .then(callback);
}


function li_todoItem(item) {
    const li = document.createElement('li')
    li.className = 'todo-item'
    li.id = item.id
    const div = document.createElement('div')
    div.className = 'view'
    const input = document.createElement('input')
    input.type = 'checkbox'
    if(item.status === 'Completed') input.checked = true
    input.addEventListener('change', function() {
        try {
            let data = {}
            if(input.checked) {
                data = {
                    "id": item.id,
                    "name" : item.name,
                    "status" : 'Completed'
                }
            } else {
                data = {
                    "id": item.id,
                    "name" : item.name,
                    "status" : 'Active'
                }
            }
            handleUpdateTodoItem(data)
        } catch (error) {
            alert(error)
        }
    })
    const inputText = document.createElement('input')
    inputText.type = 'text'
    inputText.value = item.name
    inputText.style.display = 'none'
    inputText.addEventListener('blur', () => {
        inputText.style.display = 'none'
        div.style.display = 'flex'
    })
    inputText.addEventListener('keydown', async function (e) {
        try {
            const data = {
                "id": item.id,
                "name" : inputText.value,
                "status" : item.status
            }
            if(e.keyCode  === 13) {
                e.preventDefault()
                handleUpdateTodoItem(data)
                inputText.style.display = 'none'
                label.innerText = inputText.value
                div.style.display = 'flex'
            }
        } catch (error) {
            alert(error)
        }
    })
    const label = document.createElement('label')
    label.innerText = item.name
    label.addEventListener('dblclick', () => {
        inputText.style.display = 'block'
        inputText.focus()
        div.style.display = 'none'
    })
    const button = document.createElement('button')
    button.className = 'del'
    button.addEventListener('click', function() {
        try {
            const ul_todoItems = $('.todo-items')

            handleDeleteTodoItem(item.id)
    
            const liRemove = document.getElementById(`${item.id}`)
    
            ul_todoItems.removeChild(liRemove)
        } catch (error) {
            alert(error);
        }
    
    })
    div.appendChild(input)
    div.appendChild(label)
    div.appendChild(button)
    li.appendChild(div)
    li.appendChild(inputText)
    return li
}

function filteredItems(items) {
    const todoItems = items.filter(item => item.status === 'Active')
    const doneItems = items.filter(item => item.status === 'Completed')

    return [items, todoItems, doneItems]
}

function showItems(todoItems) {
    const ul_todoItems = $('.todo-items')
    let child = ul_todoItems.lastElementChild;
    while (child) {
        ul_todoItems.removeChild(child);
        child = ul_todoItems.lastElementChild;
    }
    
    todoItems.map(item => {
        ul_todoItems.appendChild(li_todoItem(item))
    })
}

function main() {
    try {
        fetchData(showItems)
    } catch (error) {
        alert("Loading failed")
    } finally {
    }

}

function handleCreateTodoItem(data, callback) {
    let res = axios({
        method: 'post',
        url: todoAPI,
        data: data
    })
    .then(function(response) {
        response.data;
    })
    .then(callback);
}

$('#input-name').addEventListener('keydown', function(e) {
    try {
        const inputName = $('#input-name').value;
        const data = {
            "name" : inputName,
            "status" : 'Active'
        }
        if(e.keyCode  === 13) {
            e.preventDefault()
            handleCreateTodoItem(data, function() {
                fetchData(showItems)
                $('#input-name').value = ''
            })
        }
    } catch (error) {
        alert(error);
    }
})

const filtestatus = document.querySelectorAll('.filters li')
filtestatus.forEach((item, index) => {
    item.addEventListener('click', function() {
        let itemSelecteds = document.querySelectorAll('.filters li.selected')
        itemSelecteds.forEach(itemSelected => itemSelected.classList.remove('selected'))
        item.classList.add('selected')
        fetchData(function(todoItems) {
            let itemStatus = filteredItems(todoItems)
            showItems(itemStatus[index])
        })
    })
})

function handleDeleteTodoItem(id) {
    try {
        let options = axios({
            method: 'DELETE',
            url: `${todoAPI}/${id}`,
            data: {
                id: id
            }
          })
        .then(function(response) {
            response.data;
        })
        .then(function() {
            const liRemove = document.getElementById(`${id}`)
            liRemove.remove()
        });
    } catch (error) {
        console.log(error)
    }
}


function handleUpdateTodoItem(data) {
    try {
        let options = axios({
            method: 'PUT',
            url: `${todoAPI}/${data.id}`,
            data: data
          })
        .then(function(response) {
            response.data;
        });
    } catch (error) {
        console.log(error)
    }
}

main()