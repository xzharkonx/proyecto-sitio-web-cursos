
// # Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const formulario = document.querySelector('#busqueda');
let articulosCarrito = [];

// # Event Listeners

cargarEventListeners();
function cargarEventListeners(){

    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);

    // ? Muestra los cursor: de Local Storage
    document.addEventListener('DOMContentLoaded', () => {

        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });
    // ? Ofusca el formulario
    formulario.addEventListener('submit', (e) => {
        
        e.preventDefault();
        busqueda = document.querySelector('#buscador').value;
        console.log(busqueda);

    });

    // ? Vaciar carrito de compras.
    vaciarCarritoBtn.addEventListener('click', () => {
        console.log('Eliminando');
        articulosCarrito = [];
        localStorage.removeItem('carrito');
        limpiarHTML();

    });

}

// Funciones

function agregarCurso(e){
    
    e.preventDefault();
    
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }

}

function leerDatosCurso(curso){

    // ? Lee el contenido del HTML al curso que le dimos click y toma la información.
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.oferta').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    // console.log(infoCurso);

    // ? Actualizar la cantidad de Elementos si el elemento ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    console.log(existe);

    // ? Si existe actualizamos la cantidad
    if (existe) {

        const cursos = articulosCarrito.map(curso => {

            if(curso.id === infoCurso.id) {
                curso.cantidad += 1;

                mensajeCursoAgregado(curso);
                return curso;
            } else {
                return curso;
            }
        });

        // ? Finalmente actualizamos el valor de la cantidad de la lista de los cursos
        articulosCarrito = [...cursos];

    } else {
        
        // ? Finalmente actualizamos el valor de la cantidad de la lista de los cursos
        articulosCarrito = [...articulosCarrito,infoCurso];
        mensajeCursoAgregado(infoCurso);

    }

    // ? Agregando los elementos al carrito.
    console.log(articulosCarrito);
    carritoHTML();

    
}

function eliminarCurso(e){

    if (e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        console.log(articulosCarrito);
        carritoHTML();
    }

}

// ? Muestra el carrito de compras en el HTML
function carritoHTML(){

    // ? Limpiamos la info anterior.
    limpiarHTML();

    articulosCarrito.forEach(curso => {

        const {imagen, titulo, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src=${imagen} id="img-${titulo}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td> 
            <th><a href="#" id="borrar-curso" class="borrar-curso" data-id="${id}"> X </a></th>
        `;
        // <td><input type="number" id="cantidad" name="cantidad" min="1" max="5" value="${cantidad}"></td>
        contenedorCarrito.appendChild(row);

    });

    sincronizarStorage();

}

// ? Eliminar los elementos anteriores para mostrar los nuevos.
function limpiarHTML(){
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function mensajeCursoAgregado(curso){

    const {imagen, titulo, precio, cantidad, id} = curso;

    const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <img src=${imagen} id="img-${titulo}" width="100">
                <p> Agregando el curso: ${titulo}.<br/>Precio: ${precio}<br/>Cantidad: ${cantidad}.</p>
            </div>
        `;
        div.classList.add("mensaje");
        // <td><input type="number" id="cantidad" name="cantidad" min="1" max="5" value="${cantidad}"></td>
        document.body.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 3000);

}