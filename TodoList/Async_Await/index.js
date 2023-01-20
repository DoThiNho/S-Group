function $(selector) {
    return document.querySelector(selector)
}

let todoAPI = 'https://63c6ea4e4ebaa802855076bb.mockapi.io/api/todolist/todolist'

async function fetchData() {
    const { data } = await axios.get(todoAPI)
    return data
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
    input.addEventListener('change', async function() {
        try {
            let data = {}
            if(input.checked) {
                data = {
                    "name" : item.name,
                    "status" : 'Completed'
                }
            } else {
                data = {
                    "name" : item.name,
                    "status" : 'Active'
                }
            }
            const res = await axios.put(`${todoAPI}/${item.id}`, data);
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
                "name" : inputText.value,
                "status" : item.status
            }
            if(e.keyCode  === 13) {
                e.preventDefault()
                const res = await axios.put(`${todoAPI}/${item.id}`, data);
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
    button.addEventListener('click', async function() {
        try {
            const ul_todoItems = $('.todo-items')

            const res = await axios.delete(`${todoAPI}/${item.id}`);
    
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

async function main() {
    try {
        const items = await fetchData()
        showItems(items)
    } catch (error) {
        alert("Loading failed")
    } finally {
    }

}

$('#input-name').addEventListener('keydown', async function(e) {
    try {
        const inputName = $('#input-name').value;
        const ul_todoItems = $('.todo-items')

        const data = {
            "name" : inputName,
            "status" : 'Active'
        }
    
        if(e.keyCode  === 13) {
            e.preventDefault()
            const res = await axios.post(todoAPI, data)
            ul_todoItems.appendChild(li_todoItem(data))
            $('#input-name').value = ''
        }
    } catch (error) {
        alert(error);
    }
})

const filtestatus = document.querySelectorAll('.filters li')
filtestatus.forEach((item, index) => {
    item.addEventListener('click', async function() {
        const items = await fetchData()
        const itemsFilter = filteredItems(items)
        let itemSelecteds = document.querySelectorAll('.filters li.selected')
        itemSelecteds.forEach(itemSelected => itemSelected.classList.remove('selected'))
        item.classList.add('selected')
        showItems(itemsFilter[index])
    })
})

main()