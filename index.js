const baseUrl = 'https://rickandmortyapi.com/api';
let characters = `${baseUrl}/character`;
const contenedor = document.querySelector('#contenedor');
const buscar = document.querySelector('#buscar');
const inputBuscar = document.querySelector('#inputBuscar');
const atras = document.querySelector('#atras');
const siguiente = document.querySelector('#siguiente');
const filters = document.querySelectorAll(".btn-check")
let items;

const dibujarCards = (results) => {
    let cardAcumuladas = '';
    results.forEach(character => {
        let card = `
        <div class="offset-2 col-8 offset-sm-0 col-sm-6 col-md-4 mt-5 m-auto">
        <div class="card p-2 text-light" style="height: 32rem; border: 5px solid rgb(24, 212, 24); background-color:  rgb(70, 15, 90)">
        <h5><div class="card-header">Nombre: ${character.name}</div></h5>
        <img src="${character.image}" class="card-img-top" alt="">
        <ul class="list-group list-group-flush">
            <li class="list-group-item text-light border-top border-warning border-opacity-25" style="background-color:  rgb(90, 35, 90)">Genero:
                ${character.gender}</li>
            <li class="list-group-item text-light border-top border-warning border-opacity-25" style="background-color:  rgb(90, 35, 90)">Especie:
                ${character.species}</li>
            <li class="list-group-item text-light border-top border-warning border-opacity-25" style="background-color:  rgb(90, 35, 90)">Estado:
                ${character.status}</li>
        </ul>
        </div>
        </div>
        `;
        
        cardAcumuladas += card;
    });
    contenedor.innerHTML = cardAcumuladas
}

const buscarAction = () => {
    characters = `${baseUrl}/character/?name=${inputBuscar.value}`
    cargarDatos();
}


const cargarDatos = () => {
    window.fetch(characters)
    .then((response) => response.json())
    .then((responseJson) => {
        dibujarCards(responseJson.results)
        items = responseJson;
        siguiente.disabled = false;
    })
    .catch(error => { 
        contenedor.innerHTML = "No se encontro nada en su FILTRO"
    })
}

cargarDatos();


const irSiguiente = () => {
    if(items.info.next){
        // siguiente.disabled = true;
        characters = items.info.next;
        cargarDatos();
    }
}

const irAtras = () => {
    if(items.info.prev){
        characters = items.info.prev
        cargarDatos();
    }
}

const addFilterCharacter = (value, origin) => {
    let queryString = "";
    switch(origin)
    {
        case "status":
            queryString = `status=${value}`
        break;
        case "species":
            queryString = `species=${value}`
        break;
        case "gender":
            queryString = `gender=${value}`
        break;
    }
    
    if(characters.includes('?'))
    {
        characters = characters.concat(`&${queryString}`)
    }else{
        characters =  characters.concat(`?${queryString}`)
    }
    
    cargarDatos();
}

filters.forEach(item => item.addEventListener('click', (event) => {
    addFilterCharacter(event.target.labels[0].textContent, event.target.name);
}))



buscar.addEventListener('click', buscarAction)
siguiente.addEventListener('click', irSiguiente);
atras.addEventListener('click', irAtras);