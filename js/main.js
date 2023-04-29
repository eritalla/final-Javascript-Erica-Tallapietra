let productos = [];
fetch ("./js/productos.json")
.then (response => response.json ())
.then (data => {
    productos = data;
    inyectarProductos (productos);
})

const catalogoContainer = document.querySelector ( "#catalogoContainer");
const botonesTipo = document.querySelectorAll(".tipoCalzado");
const tituloTipos = document.querySelector("#tipos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const cantEnCarrito = document.querySelector(".cantidad");




function inyectarProductos (productosSeleccionados) {

    catalogoContainer.innerHTML = "";

    productosSeleccionados.forEach (producto => {
        const cardProducto = document.createElement ("div");
        cardProducto.classList.add("producto", "item");
        cardProducto. innerHTML = `
                                    <img src= "${producto.imagen}" alt ="${producto.nombre}" style= "width: 30%">
                                    <div>
                                        <h5>${producto.nombre}</h5>
                                        <h5>${producto.precio}</h5>
                                        <button class= "producto-agregar" id="${producto.id}">Agregar</button>
                                    </div>
        `;
        catalogoContainer.append(cardProducto);
    })
    actualizarBotonesAgregar();
}

inyectarProductos(productos);

botonesTipo.forEach(boton => {
    boton.addEventListener("click", (e) => {

        if (e.currentTarget.id != "todo") {
            const productoTipo = productos.find(producto => producto.tipo === e.currentTarget.id);
            tituloTipos.innerText = productoTipo.tipo
            const seleccionTipo = productos.filter(producto => producto.tipo === e.currentTarget.id);
            inyectarProductos(seleccionTipo);
        } else {
            tituloTipos.innerText = "Calzado";
            inyectarProductos(productos);
        }
    });
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");/*aca cambiarle el nombre a la clase*/

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let carrito;
let prodsEnCarritoLS = localStorage.getItem("prod-seleccionado");

if (prodsEnCarritoLS) {
    carrito = JSON.parse(prodsEnCarritoLS);
    actualizarCantEnCarrito();
} else {
    carrito = [];
}


function agregarAlCarrito(e) {
    
    const id = e.currentTarget.id;
    const prodAgregado = productos.find(producto => producto.id === id);/**cambiarle el nombre a esta const */

    if (carrito.some(producto => producto.id === id)) {
        const index = carrito.findIndex(producto => producto.id === id);/**cambiarle el nombre a esta const */
        carrito[index].cantidad++;
    } else {
        prodAgregado.cantidad = 1;
        carrito.push(prodAgregado);
    }
    actualizarCantEnCarrito();

    localStorage.setItem("prod-seleccionado", JSON.stringify(carrito));

    Toastify({
        text: "Agregaste un producto",
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

function actualizarCantEnCarrito() {
    let actualizacionEnCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    cantEnCarrito.innerText = actualizacionEnCarrito;
}
