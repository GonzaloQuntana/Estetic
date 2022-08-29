/*let btn_compra = document.querySelectorAll(".botonCompra");

console.log(btn_compra);

for( let boton of btn_compra){

    boton.addEventListener("click" , agregar_a_carrito);

}



let carrito = [];



function agregar_a_carrito(e){

    console.log("EL EVENTO ESTA EN:" , e.target);

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;
    //console.log( padre );

    let nombre_producto = padre.querySelector("h4").textContent;
    //console.log( nombre_producto);

    let precio = padre.querySelector("span").textContent;
    //console.log( precio);

    let img = abuelo.querySelector("img").src;
    //console.log( img);

    let producto = {

        nombre: nombre_producto,
        img: img,
        precio: precio,
        cantidad: 1

    };

    Toastify({
        text:"Agregado al carrito",
        duration: 1000,
        style:{
            background:"pink",
            color:"black"
        } 
    }).showToast();

    carrito.push(producto);

    let arreglo_JSON = JSON.stringify(carrito);
    localStorage.setItem("carrito" , arreglo_JSON);
    
    console.log(carrito);

    mostrar_carrito( producto);
}


    function mostrar_carrito( producto){

        let fila = document.createElement("tr");

        fila.innerHTML = `<td><img src="{$producto.img}"></td>
                          <td>${producto.nombre}</td>
                          <td>${producto.cantidad}</td>
                          <td>${producto.precio}</td>
                          <td><button class="btn-danger borrar_elemento">Borrar</button></td>`;

    let tabla = document.getElementById("tbody");

    tabla.append(fila);
      
    let botones_borrar = document.querySelectorAll(".borrar_elemento");
    
    for( let boton of botones_borrar){

        boton.addEventListener("click" , borrar_producto);
    
    }
}

function borrar_producto(e){

    let abuelo = e.target.parentNode.parentNode;
    abuelo.remove();


}
*/
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Iluminador Too Faced Unicorn Tears',
        precio: 598,
        imagen: 'imagenes/carrou1.jpg'
    },
    {
        id: 2,
        nombre: 'Paleta Sombras Morphe James Charles',
        precio: 1200,
        imagen: 'imagenes/carrou2.jpg'
    },
    {
        id: 3,
        nombre: 'Trio Labiales Kylie Anniversary',
        precio: 940,
        imagen: 'imagenes/carrou3.jpg'
    },
    {
        id: 4,
        nombre: 'Delineador Fibra 24hs Pink21',
        precio: 549,
        imagen: 'imagenes/carrou9.jpg'
    },
    {
        id: 5,
        nombre: 'Delineador Liquido 24 Hs Pink 21',
        precio: 500,
        imagen: 'imagenes/carrou6.jpg'
    },
    {
        id: 6,
        nombre: 'Set 12 Brochas Mac - Caja Metalica',
        precio: 1.894,
        imagen: 'imagenes/carrou8.jpg'
    }

];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa}${info.precio}`;
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', agregarProductoAlCarrito);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

function agregarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();
    
    Toastify({
        text:"Agregado al carrito",
        duration: 1000,
        gravity: "bottom",
        position: "right",
        style:{
            background:"pink",
            color:"black",
        } 
    }).showToast();
}

function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    DOMtotal.textContent = calcularTotal();
    
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}


function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}


function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);

renderizarProductos();
renderizarCarrito();