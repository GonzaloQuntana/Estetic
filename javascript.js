function bienvenida(){

    console.log("Bienvenid@ a Estetic Make Up");

}

bienvenida();


fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response=> response.json())
    .then( data=>console.log(data))

let ciudad = "Buenos Aires";

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&lang=es&units=metric&appid=2c0201f4d8e047d13f7aaad1788188f8")    
    .then(response=> response.json())
    .then( data=>(
        
        console.log("La temperatura es:" , data.main.temp)
        ))

fetch("productos.json")
    .then(response=> response.json())
    .then( data=>console.log(data))


let resultado = async function(){

    let resultado_fetch = await fetch("https://jsonplaceholder.typicode.com/posts")
    console.log( resultado_fetch);

}

resultado();


//let productos = [
//    {nombre:"Labial" , precio:100},
//    {nombre:"Sombra" , precio:200},
//    {nombre:"Pestañas" , precio:50},
//    {nombre:"Uñas" , precio:150}
//]

//function productos_venta( producto ){

//    return {
//        nombre: producto.nombre,
//        precio: producto.precio
//    }
//}

//let resultado_map = productos.map ( productos_venta );
//console.log(resultado_map)

//function compra1(){

//    console.log("Pepe realizo una ocmpra");

//}

//compra1();

//let ventas = [
//    {nombre:"Labial" , precio:100},
//    {nombre:"Sombra" , precio:200},
//    {nombre:"Pestañas" , precio:50},
//    {nombre:"Uñas" , precio:150}
//]

//function calcular_total( acu , producto ){

//    acu = acu + producto.precio;

//    return acu
//}

//let venta_total = ventas.reduce( calcular_total , 0);
//console.log("El total es:" , venta_total);