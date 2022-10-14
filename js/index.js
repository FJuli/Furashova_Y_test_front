const input = document.querySelector('#inputId')
const blocks = document.querySelector('.items');
const btn = document.querySelector('button');
const modal = document.querySelector('.modal');
const nameTitle = document.querySelector('#nameID');
const phone = document.querySelector('#phoneID');
const email = document.querySelector('#emailID');
const date = document.querySelector('#dateID');
const position = document.querySelector('#positionID');
const department = document.querySelector('#departmentID');
let data;
let userName;
let titleName = 'Ferdinand Carney';



//--------Модальное окно-------------


function listenerBlocks(item) {
    item.addEventListener('click', (e) => {

        const eventClick = item;
        userName = eventClick.childNodes[0].innerHTML;

        openModal();
        getDataForModal(data)
    })

}

//Загрузка данных с сервера в модальное окно
function getDataForModal( ) {
    const User = data;
    
    titleName = userName;

    const index = User.findIndex(el => el.name === titleName);

    nameTitle.innerHTML = `${User[index].name}`;
    phone.innerHTML = `${User[index].phone}`;
    email.innerHTML = `${User[index].email}`;
    date.innerHTML = `${User[index].hire_date}`;
    position.innerHTML = `${User[index].position_name}`;
    department.innerHTML = `${User[index].department}`;
}

//Закрыть модалку по кнопке
btn.addEventListener('click', () => {
    closeModal();
})
 // Закрыть модалку вне поля
async function closeModal() {
    modal.style.display = 'none'
}
//Проверка
modal.addEventListener('click', (e) => {
    if (e.target == modal) {
        closeModal();
    }
})
//Открыть модалку
function openModal() {
    modal.style.display = 'flex'
}


//--------------Поиск---------------------


// получение данных из инпута 
input.addEventListener('input', updateValue)

async function updateValue(e) {
    input.textContent = e.target.value;
    let value = input.value
    updateData(value)
}

//Отрисовка блоков
function userData(data) {
    blocks.innerHTML = '';

    data.forEach(el => {
        const item = document.createElement('div')
        item.classList.add('item')
        const name = document.createElement('div')
        name.classList.add('name')
        const phone = document.createElement('phone')
        phone.classList.add('phone')
        const email = document.createElement('div')
        email.classList.add('email')

        name.innerHTML = `${el.name}`
        phone.innerHTML = `${el.phone}`
        email.innerHTML = `${el.email}`

        blocks.append(item)
        item.append(name, phone, email)

        listenerBlocks(item)
    })
}

// фильтрация
async function updateData(value) {
    let res = await fetch(`http://127.0.0.1:3000/?term=${value}`)
    data = await res.json()
    userData(data)
}

// загрузка данных с сервера 
async function fetchData() {
    let res = await fetch('http://127.0.0.1:3000');
    data = await res.json()
    userData(data)
}

fetchData();

