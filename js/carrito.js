let prodsEnCarrito = localStorage.getItem("prod-seleccionado");
prodsEnCarrito = JSON.parse(prodsEnCarrito);
console.log(prodsEnCarrito);


const vacio = document.querySelector("#vacio");
const productosCarrito = document.querySelector("#productosAgregadosCarrito");
const carritoBotones = document.querySelector("#carritoBotones");
const agradecimiento = document.querySelector("#agradecimiento");   
let botonesEliminar = document.querySelectorAll(".botonesEliminar");
const botonVaciar = document.querySelector("#vaciar");
const total = document.querySelector("#total");
const botonComprar = document.querySelector("#botonComprar");



productosCarrito.innerHTML = "";

function cargarProdCarrito () {
    if (prodsEnCarrito) {


        vacio.innerHTML = "";
        productosCarrito.innerHTML = "";
    
        prodsEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("prodCarrito");
            div.innerHTML = `
            <img src= "${producto.imagen}" alt ="${producto.nombre}" style= "width: 15%">
            <p>Producto: ${producto.nombre}</p>
            <p>Precio:${producto.precio}</p>
            <p>Cantidad:${producto.cantidad}</p>
            <p>Subtotal:${producto.precio * producto.cantidad}</p>
            <button class="botonesEliminar" id="${producto.id}">Eliminar del carrito</button>
            `
            productosCarrito.append(div);
        });
    } else {
    
    }

    actualizarBotonesEliminar();
    totalFinal();
}

cargarProdCarrito ();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".botonesEliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);/**cambiar nombre de funcion */
    });
}

function eliminarDelCarrito(e) {
    let idEliminar = e.currentTarget.id;
    let prodEliminadoIndex = prodsEnCarrito.findIndex(producto => producto.id == idEliminar);

    prodsEnCarrito.splice(prodEliminadoIndex, 1);
    cargarProdCarrito ();

    localStorage.setItem("prod-seleccionado", JSON.stringify(prodsEnCarrito));

    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background:  "linear-gradient(to right, rgb(135, 75, 204), rgb(209, 175, 228)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
} 


function vaciarCarrito() {
    prodsEnCarrito.length = 0;
    localStorage.setItem("prod-seleccionado", JSON.stringify(prodsEnCarrito));
    cargarProdCarrito ();
}

botonVaciar.addEventListener("click", vaciarCarrito);

function totalFinal() {
    const sumaTotal = prodsEnCarrito.reduce((acumulador, producto) => acumulador + (producto.cantidad * producto.precio), 0);
    total.innerHTML = `$${sumaTotal}`;
}

function comprar() {
    prodsEnCarrito.length = 0;
    localStorage.setItem("prod-seleccionado", JSON.stringify(prodsEnCarrito));
    cargarProdCarrito ();
}

botonComprar.addEventListener("click", comprar);