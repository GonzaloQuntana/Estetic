let btn_compra = document.querySelectorAll(".botonCompra");

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